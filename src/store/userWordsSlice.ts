/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import createUserWordAPI from 'src/requests/userWords/createUserWordAPI';
import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
import updateUserWordAPI from 'src/requests/userWords/updateUserWordAPI';
import type { AppDispatch, RootState } from '.';
import { IUserDiffWord, IWord } from './types';
import { addCurrentPageWords, removeLoading, setLoading } from './wordsSlice';

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
      // state.diffWords = [...state.diffWords, action.payload];
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
        console.log(response);
        const data = await response?.json();
        const arr = data[0].paginatedResults;
        if (arr.length === 0) {
          console.log('should not retrigger');
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

export const fetchCreateDiffWord =
  (
    userId: string | null,
    wordId: string | undefined,
    difficulty: string,
    page: string | undefined,
    token: string | null
  ) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !wordId || !token || !page) return;
    const fetchDataBody = {
      difficulty,
      optional: {
        wordId,
        difficult: true,
      },
    };

    try {
      const response: Response | undefined = await createUserWordAPI(
        userId,
        wordId,
        fetchDataBody,
        token
      );

      if (response.ok) {
        // const word = await response.json();
        // console.log(word);
        // dispatch(addDiffWord({ difficulty, id: wordId }));
        // console.log({ difficulty, id: wordId });
        dispatch(fetchGetAllUserWords(userId, token, difficulty, page));
        dispatch(fetchGetAllDiffWords(userId, token));
      } else {
        const data: string = await response.text();
        console.error(data, response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

export const fetchRemoveDiffWord =
  (
    userId: string | null,
    wordId: string | undefined,
    difficulty: string,
    page: string | undefined,
    token: string | null
  ) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !wordId || !token || !page) return;
    const fetchDataBody = {
      difficulty,
      optional: {
        wordId,
        difficult: false,
      },
    };

    try {
      const response: Response | undefined = await updateUserWordAPI(
        userId,
        wordId,
        fetchDataBody,
        token
      );

      if (response.ok) {
        dispatch(fetchGetAllUserWords(userId, token, difficulty, page));
        dispatch(fetchGetAllDiffWords(userId, token));
        console.log(response);
      } else {
        const data: string = await response.text();
        console.error(data, response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

export const getDifficultWords = (state: RootState) => state.userWords.diffWords;
export const getLearnedWords = (state: RootState) => state.userWords.learnedWords;
export const difficultSectionIsEmpty = (state: RootState) => state.userWords.diffSectionEmpty;

export default userWordsSlice.reducer;
