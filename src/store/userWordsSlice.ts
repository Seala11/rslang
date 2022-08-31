/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import createUserWordAPI from 'src/requests/userWords/createUserWordAPI';
import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
import updateUserWordAPI from 'src/requests/userWords/updateUserWordAPI';
import getUserWordAPI from 'src/requests/userWords/getUserWordAPI';
import { IOptions, IUserWordResponse } from 'src/requests/interfaceAPI';
import { ErrorMessage, IUserWordOptions, ResponseStatus } from 'src/helpers/constRequestsAPI';
import type { AppDispatch, RootState } from '.';
import { IUserDiffWord, IWord } from './types';
import { addCurrentPageWords, removeLoading, setLoading } from './wordsSlice';

const defaultUserWordOptions = {
  difficulty: '0',
  optional: {
    difficult: false,
    learned: false,
    sprint: { right: 0, wrong: 0 },
    audio: { right: 0, wrong: 0 },
  },
};

interface IUserWordsState {
  diffSectionEmpty: boolean | null;
  diffWords: IWord[];
  learnedWords: IUserDiffWord[];
}

const initialState: IUserWordsState = {
  diffWords: [],
  learnedWords: [],
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
    addOneDiffWord(state, action: PayloadAction<IWord>) {
      state.diffWords = [...state.diffWords, action.payload];
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

export const { addDiffWord, removeDiffWord, addOneDiffWord, setDiffSectionEmpty } =
  userWordsSlice.actions;

export const fetchGetAllUserWords =
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
      } else {
        const data: string = await response.text();
        console.error(data, response.status);
      }
    } catch (err) {
      console.error(err);
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
      } else {
        const data: string = await response.text();
        console.error(data, response.status);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(removeLoading());
    }
  };

export const fetchUpdateUserWord =
  (
    userId: string | null,
    wordId: string | undefined,
    token: string | null,
    optional: IOptions,
    option: IUserWordOptions,
    difficulty?: string,
    page?: string | undefined
  ) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !wordId || !token || !page || !difficulty || !optional) return;
    const fetchDataBody = {
      difficulty,
      optional,
    };

    try {
      const response: Response | undefined = await updateUserWordAPI(
        userId,
        wordId,
        fetchDataBody,
        token
      );

      if (response.ok) {
        if (option === IUserWordOptions.DIFFICULT || option === IUserWordOptions.LEARNED) {
          dispatch(fetchGetAllUserWords(userId, token, difficulty, page));
          dispatch(fetchGetAllDiffWords(userId, token));
        }

        console.log(response);
      } else {
        const data: string = await response.text();
        console.error(data, response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

export const fetchCreateUserWord =
  (
    userId: string | null,
    wordId: string | undefined,
    token: string | null,
    difficulty: string,
    option: IUserWordOptions,
    gameOption?: boolean,
    page?: string | undefined
  ) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !wordId || !token) return;

    try {
      const response: Response | undefined = await getUserWordAPI(userId, wordId, token);

      if (response.ok) {
        const word: IUserWordResponse = await response.json();
        console.log(word);
        const { optional } = word;

        switch (option) {
          case IUserWordOptions.DIFFICULT: {
            if (optional.difficult) {
              optional.difficult = false;
            } else {
              optional.learned = false;
              optional.difficult = true;
            }
            dispatch(
              fetchUpdateUserWord(userId, wordId, token, optional, option, difficulty, page)
            );
            break;
          }
          case IUserWordOptions.LEARNED:
            optional.learned = true;
            optional.difficult = false;
            dispatch(
              fetchUpdateUserWord(userId, wordId, token, optional, option, difficulty, page)
            );
            break;
          case IUserWordOptions.AUDIO:
            break;
          case IUserWordOptions.SPRINT:
            break;
          // no default
        }
      } else {
        switch (response.status) {
          case ResponseStatus.MISSING_TOKEN:
            // TODO: logout user then or refresh token
            console.error(ErrorMessage.MISSING_TOKEN);
            break;
          case ResponseStatus.NOT_FOUND: {
            const userWordOptions = { ...defaultUserWordOptions };
            userWordOptions.difficulty = difficulty;
            switch (option) {
              case IUserWordOptions.DIFFICULT: {
                userWordOptions.optional.difficult = true;
                break;
              }
              case IUserWordOptions.LEARNED:
                userWordOptions.optional.learned = true;
                break;
              case IUserWordOptions.AUDIO:
                // TODO: depends on gameOption
                userWordOptions.optional.audio.right = 1;
                userWordOptions.optional.audio.wrong = 0;
                break;
              case IUserWordOptions.SPRINT:
                userWordOptions.optional.sprint.right = 1;
                userWordOptions.optional.sprint.wrong = 0;
                break;
              // no default
            }

            const res = await createUserWordAPI(userId, wordId, userWordOptions, token);
            if (!page) return;
            await dispatch(fetchGetAllUserWords(userId, token, difficulty, page));
            await dispatch(fetchGetAllDiffWords(userId, token));
            console.log(res);
            console.log('word create');
            break;
          }
          default:
            throw new Error(`${response.statusText}`);
        }
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

export const getDifficultWords = (state: RootState) => state.userWords.diffWords;
export const getLearnedWords = (state: RootState) => state.userWords.learnedWords;
export const difficultSectionIsEmpty = (state: RootState) => state.userWords.diffSectionEmpty;

export default userWordsSlice.reducer;
