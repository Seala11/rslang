/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  GameStatistics,
  IDayStatistic,
  IGameStatistics,
  IStatistics,
  IStatisticsResponse,
} from 'src/requests/interfaceAPI';
import { ErrorMessage, StatisticsOption, ResponseStatus } from 'src/helpers/constRequestsAPI';
import upsertStatisticsAPI from 'src/requests/statistics/upsertStatisticsAPI';
import createError from 'src/requests/createError';
import getStatisticsAPI from 'src/requests/statistics/getStatisticsAPI';
import type { AppDispatch, RootState } from '.';
import { IUserStatistics } from './types';
import { logoutUnathorizedUser } from './userSlice';

// const DEFAULT_STATISTICS: IStatistics = {
//   learnedWords: 0,
//   optional: {},
// };

// const DEFAULT_DAY_STATISTICS: IGameStatistics = {
//   audio: { right: 0, wrong: 0, new: 0, strike: 0, learned: 0 },
//   sprint: { right: 0, wrong: 0, new: 0, strike: 0, learned: 0 },
//   textbook: 0,
// };

const initialState: IUserStatistics = {
  userStatistics: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    addUserStatistics(state, action: PayloadAction<IStatistics>) {
      state.userStatistics = action.payload;
    },
    removeUserStatistic(state) {
      state.userStatistics = null;
    },
  },
});

export const { addUserStatistics, removeUserStatistic } = statisticsSlice.actions;

export const fetchUpdateUserStatistics =
  (userId: string, token: string, statisticsData: IStatistics) => async (dispatch: AppDispatch) => {
    try {
      const response: Response | undefined = await upsertStatisticsAPI(
        userId,
        token,
        statisticsData
      );
      if (response.ok) {
        const userStatistics = await response.json();
        dispatch(addUserStatistics(userStatistics));
      } else if (response.status === ResponseStatus.MISSING_TOKEN) {
        throw createError(new Error(ErrorMessage.MISSING_TOKEN), `${ResponseStatus.MISSING_TOKEN}`);
      }
    } catch (err) {
      const error = err as Error;
      if (error.name === `${ResponseStatus.MISSING_TOKEN}`) {
        dispatch(logoutUnathorizedUser());
      }
      throw error;
    }
  };

export const updateStatisticsData =
  (
    userId: string,
    token: string,
    option: StatisticsOption,
    userStatistics: IStatistics,
    date: string,
    currGameStatistics?: GameStatistics
  ) =>
  async (dispatch: AppDispatch) => {
    const statistics = { ...userStatistics };
    switch (option) {
      case StatisticsOption.TEXTBOOK: {
        statistics.learnedWords += 1;
        statistics.optional[date].textbook += 1;
        break;
      }
      case StatisticsOption.SPRINT: {
        if (!currGameStatistics) return;
        statistics.learnedWords += currGameStatistics.learned;
        statistics.optional[date].sprint.wrong += currGameStatistics.wrong;
        statistics.optional[date].sprint.right += currGameStatistics.right;
        statistics.optional[date].sprint.new += currGameStatistics.new;
        statistics.optional[date].sprint.learned += currGameStatistics.learned;
        statistics.optional[date].sprint.strike = Math.max(
          currGameStatistics.strike,
          statistics.optional[date].sprint.strike
        );
        break;
      }
      case StatisticsOption.AUDIO: {
        if (!currGameStatistics) return;
        statistics.learnedWords += currGameStatistics.learned;
        statistics.optional[date].audio.wrong += currGameStatistics.wrong;
        statistics.optional[date].audio.right += currGameStatistics.right;
        statistics.optional[date].audio.new += currGameStatistics.new;
        statistics.optional[date].audio.learned += currGameStatistics.learned;
        statistics.optional[date].audio.strike = Math.max(
          currGameStatistics.strike,
          statistics.optional[date].audio.strike
        );
        break;
      }
      // no default
    }
    console.log(statistics);
    dispatch(fetchUpdateUserStatistics(userId, token, statistics));
  };

export const fetchGetUserStatistics =
  (
    userId: string | null,
    token: string | null,
    option: StatisticsOption,
    currGameStatistics?: GameStatistics
  ) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !token) return;
    const currentDay = new Date();
    const date: keyof IDayStatistic = new Intl.DateTimeFormat('en-GB').format(currentDay);

    try {
      const response: Response | undefined = await getStatisticsAPI(userId, token);

      if (response.ok) {
        const userStatisticsJson: IStatisticsResponse = await response.json();
        const { id, ...userStatistics } = userStatisticsJson;

        if (!userStatistics.optional[date]) {
          const DEFAULT_DAY_STATISTICS: IGameStatistics = {
            audio: { right: 0, wrong: 0, new: 0, strike: 0, learned: 0 },
            sprint: { right: 0, wrong: 0, new: 0, strike: 0, learned: 0 },
            textbook: 0,
          };
          const currDay: IDayStatistic = { [date]: DEFAULT_DAY_STATISTICS };
          userStatistics.optional = { ...userStatistics.optional, ...currDay };
        }

        if (currGameStatistics) {
          dispatch(
            updateStatisticsData(userId, token, option, userStatistics, date, currGameStatistics)
          );
        } else {
          dispatch(updateStatisticsData(userId, token, option, userStatistics, date));
        }
      } else {
        switch (response.status) {
          case ResponseStatus.NOT_FOUND: {
            const DEFAULT_STATISTICS: IStatistics = {
              learnedWords: 0,
              optional: {},
            };
            const DEFAULT_DAY_STATISTICS: IGameStatistics = {
              audio: { right: 0, wrong: 0, new: 0, strike: 0, learned: 0 },
              sprint: { right: 0, wrong: 0, new: 0, strike: 0, learned: 0 },
              textbook: 0,
            };
            const newStatistics = { ...DEFAULT_STATISTICS };
            const currDay: IDayStatistic = { [date]: DEFAULT_DAY_STATISTICS };
            newStatistics.optional = currDay;

            if (currGameStatistics) {
              dispatch(
                updateStatisticsData(userId, token, option, newStatistics, date, currGameStatistics)
              );
            } else {
              dispatch(updateStatisticsData(userId, token, option, newStatistics, date));
            }

            break;
          }
          case ResponseStatus.MISSING_TOKEN: {
            throw createError(
              new Error(ErrorMessage.MISSING_TOKEN),
              `${ResponseStatus.MISSING_TOKEN}`
            );
          }
          // no default
        }
      }
    } catch (err) {
      const error = err as Error;
      if (error.name === `${ResponseStatus.MISSING_TOKEN}`) {
        dispatch(logoutUnathorizedUser());
      }
      throw error;
    }
  };

export const fetchGetTodayStatistics =
  (userId: string | null, token: string | null) => async (dispatch: AppDispatch) => {
    if (!userId || !token) return;
    const currentDay = new Date();
    const date: keyof IDayStatistic = new Intl.DateTimeFormat('en-GB').format(currentDay);

    try {
      const response: Response | undefined = await getStatisticsAPI(userId, token);

      if (response.ok) {
        const userStatisticsJson: IStatisticsResponse = await response.json();
        const { id, ...userStatistics } = userStatisticsJson;

        if (!userStatistics.optional[date]) {
          const DEFAULT_DAY_STATISTICS: IGameStatistics = {
            audio: { right: 0, wrong: 0, new: 0, strike: 0, learned: 0 },
            sprint: { right: 0, wrong: 0, new: 0, strike: 0, learned: 0 },
            textbook: 0,
          };
          const currDay: IDayStatistic = { [date]: DEFAULT_DAY_STATISTICS };
          userStatistics.optional = { ...userStatistics.optional, ...currDay };
        }

        dispatch(fetchUpdateUserStatistics(userId, token, userStatistics));
      } else {
        switch (response.status) {
          case ResponseStatus.NOT_FOUND: {
            const DEFAULT_STATISTICS: IStatistics = {
              learnedWords: 0,
              optional: {},
            };
            const DEFAULT_DAY_STATISTICS: IGameStatistics = {
              audio: { right: 0, wrong: 0, new: 0, strike: 0, learned: 0 },
              sprint: { right: 0, wrong: 0, new: 0, strike: 0, learned: 0 },
              textbook: 0,
            };
            const newStatistics = { ...DEFAULT_STATISTICS };
            const currDay: IDayStatistic = { [date]: DEFAULT_DAY_STATISTICS };
            newStatistics.optional = currDay;
            dispatch(fetchUpdateUserStatistics(userId, token, newStatistics));
            break;
          }
          case ResponseStatus.MISSING_TOKEN: {
            throw createError(
              new Error(ErrorMessage.MISSING_TOKEN),
              `${ResponseStatus.MISSING_TOKEN}`
            );
          }
          // no default
        }
      }
    } catch (err) {
      const error = err as Error;
      if (error.name === `${ResponseStatus.MISSING_TOKEN}`) {
        dispatch(logoutUnathorizedUser());
      }
      throw error;
    }
  };

export const getStatistics = (state: RootState) => state.statistics.userStatistics;

export default statisticsSlice.reducer;
