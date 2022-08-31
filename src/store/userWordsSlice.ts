/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import createUserWordAPI from 'src/requests/userWords/createUserWordAPI';
import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
import updateUserWordAPI from 'src/requests/userWords/updateUserWordAPI';
import getUserWordAPI from 'src/requests/userWords/getUserWordAPI';
import { IOptions, IUserWord, IUserWordResponse } from 'src/requests/interfaceAPI';
import {
  ErrorMessage,
  GameOptions,
  UserWordOptions,
  ResponseStatus,
} from 'src/helpers/constRequestsAPI';
import createError from 'src/requests/createError';
import type { AppDispatch, RootState } from '.';
import { IUserWordsState, IWord } from './types';
import { addCurrentPageWords, removeLoading, setLoading } from './wordsSlice';

const DEFAULT_USER_WORD_OPTIONS = {
  difficulty: '0',
  optional: {
    difficult: false,
    learned: false,
    sprint: { right: 0, wrong: 0 },
    audio: { right: 0, wrong: 0 },
  },
};

const initialState: IUserWordsState = {
  diffWords: [],
  diffSectionEmpty: null,
};

const userWordsSlice = createSlice({
  name: 'userWords',
  initialState,
  reducers: {
    addDiffWord(state, action: PayloadAction<IWord[]>) {
      state.diffWords = action.payload;
      state.diffSectionEmpty = false;
    },
    setDiffSectionEmpty(state) {
      state.diffSectionEmpty = true;
    },
    removeDiffWord(state, action: PayloadAction<IWord>) {
      const newState = state.diffWords.filter((item) => item.id !== action.payload.id);
      state.diffWords = newState;
    },
  },
});

export const { addDiffWord, removeDiffWord, setDiffSectionEmpty } = userWordsSlice.actions;

export const fetchGetUserWords =
  (userId: string | null, token: string | null, group: string, page: string) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !token) return;
    try {
      dispatch(setLoading());
      const response: Response | undefined = await getAllAggrWordsAPI(
        userId,
        token,
        `{"$and":[{"group": ${group}, "page": ${page}}]}`
      );
      if (response.ok) {
        const data = await response?.json();
        dispatch(addCurrentPageWords(data[0].paginatedResults));
      }
      if (response.status === ResponseStatus.MISSING_TOKEN) {
        throw createError(new Error(ErrorMessage.MISSING_TOKEN), `${ResponseStatus.MISSING_TOKEN}`);
      }
    } catch (err) {
      const error = err as Error;
      if (error.name === `${ResponseStatus.MISSING_TOKEN}`) {
        // TODO: logout user
        console.error(error);
      }
      console.error(error);
    } finally {
      dispatch(removeLoading());
    }
  };

export const fetchGetAllDiffWords =
  (userId: string | null, token: string | null) => async (dispatch: AppDispatch) => {
    if (!userId || !token) return;
    try {
      dispatch(setLoading());
      const response: Response | undefined = await getAllAggrWordsAPI(
        userId,
        token,
        `{"$and":[{"userWord.optional.difficult":true}]}`,
        '3600'
      );
      if (response.ok) {
        const data = await response?.json();
        const arr = data[0].paginatedResults;
        if (arr.length === 0) {
          dispatch(setDiffSectionEmpty());
        } else {
          dispatch(addDiffWord(data[0].paginatedResults));
        }
      }
      if (response.status === ResponseStatus.MISSING_TOKEN) {
        throw createError(new Error(ErrorMessage.MISSING_TOKEN), `${ResponseStatus.MISSING_TOKEN}`);
      }
    } catch (err) {
      const error = err as Error;
      if (error.name === `${ResponseStatus.MISSING_TOKEN}`) {
        // TODO: logout user
        console.error(error);
      }
      console.error(error);
    } finally {
      dispatch(removeLoading());
    }
  };

export const fetchUpdateUserWord =
  (
    userId: string | null,
    wordId: string | undefined,
    token: string | null,
    fetchDataBody: IUserWord,
    page?: string | undefined
  ) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !wordId || !token) return;

    try {
      const response: Response | undefined = await updateUserWordAPI(
        userId,
        wordId,
        fetchDataBody,
        token
      );

      if (response.ok) {
        // If we are on a textbook page update words to rerender
        if (page) {
          dispatch(fetchGetUserWords(userId, token, fetchDataBody.difficulty, page));
          dispatch(fetchGetAllDiffWords(userId, token));
        }
      } else {
        const data: string = await response.text();
        console.error(data, response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

const updateUserWordOptions = (
  option: UserWordOptions,
  userWordOptions: IOptions,
  gameOption?: GameOptions
) => {
  const updatedOptions = { ...userWordOptions };

  switch (option) {
    case UserWordOptions.DIFFICULT: {
      if (updatedOptions.difficult) {
        updatedOptions.difficult = false;
      } else {
        updatedOptions.learned = false;
        updatedOptions.difficult = true;
      }
      break;
    }
    case UserWordOptions.LEARNED:
      updatedOptions.learned = true;
      updatedOptions.difficult = false;
      break;
    case UserWordOptions.AUDIO: {
      if (gameOption === GameOptions.CORRECT) {
        updatedOptions.audio.right += 1;
        updatedOptions.learned = true;
        updatedOptions.difficult = false;
      }
      if (gameOption === GameOptions.WRONG) {
        updatedOptions.audio.wrong += 1;
        updatedOptions.learned = false;
      }
      break;
    }
    case UserWordOptions.SPRINT:
      if (gameOption === GameOptions.CORRECT) {
        updatedOptions.sprint.right += 1;
        updatedOptions.learned = true;
        updatedOptions.difficult = false;
      }
      if (gameOption === GameOptions.WRONG) {
        updatedOptions.sprint.wrong += 1;
        updatedOptions.learned = false;
      }
      break;
    // no default
  }
  return updatedOptions;
};

export const fetchCreateUserWord =
  (
    userId: string | null,
    wordId: string | undefined,
    token: string | null,
    difficulty: string,
    wordOption: UserWordOptions,
    gameOption?: GameOptions,
    page?: string | undefined
  ) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !wordId || !token) return;

    try {
      const response: Response | undefined = await getUserWordAPI(userId, wordId, token);

      if (response.ok) {
        // word already exists, update received from back data:
        const word: IUserWordResponse = await response.json();
        let { optional } = word;
        optional = updateUserWordOptions(wordOption, optional, gameOption || undefined);
        const fetchDataBody = {
          difficulty,
          optional,
        };
        dispatch(fetchUpdateUserWord(userId, wordId, token, fetchDataBody, page || undefined));
      } else {
        if (response.status === ResponseStatus.NOT_FOUND) {
          // new word: we create default object than update it and send to back
          const userWordOptions = { ...DEFAULT_USER_WORD_OPTIONS };
          userWordOptions.optional = updateUserWordOptions(
            wordOption,
            userWordOptions.optional,
            gameOption || undefined
          );
          userWordOptions.difficulty = difficulty;
          await createUserWordAPI(userId, wordId, userWordOptions, token);

          // if we are on a textbook we need to update current page to rerender
          if (page) {
            await dispatch(fetchGetUserWords(userId, token, difficulty, page));
            await dispatch(fetchGetAllDiffWords(userId, token));
          }
        }
        if (response.status === ResponseStatus.MISSING_TOKEN) {
          throw createError(
            new Error(ErrorMessage.MISSING_TOKEN),
            `${ResponseStatus.MISSING_TOKEN}`
          );
        }
      }
    } catch (err) {
      const error = err as Error;
      if (error.name === `${ResponseStatus.MISSING_TOKEN}`) {
        // TODO: logout user
        console.error(error);
      }
      console.error(error);
    }
  };

export const getDifficultWords = (state: RootState) => state.userWords.diffWords;
export const difficultSectionIsEmpty = (state: RootState) => state.userWords.diffSectionEmpty;

export default userWordsSlice.reducer;
