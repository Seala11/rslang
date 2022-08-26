/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import createUserWordAPI from 'src/requests/userWords/createUserWordAPI';
import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
import type { AppDispatch, RootState } from '.';
import { IUserDiffWord } from './types';
import { addCurrentPageWords, removeLoading, setLoading } from './wordsSlice';

interface IUserWordsState {
  diffWords: IUserDiffWord[];
  learnedWords: IUserDiffWord[];
}

const initialState: IUserWordsState = {
  diffWords: [],
  learnedWords: [],
};

const userWordsSlice = createSlice({
  name: 'userWords',
  initialState,
  reducers: {
    addDiffWord(state, action: PayloadAction<IUserDiffWord>) {
      state.diffWords = [...state.diffWords, action.payload];
    },
    removeDiffWord(state, action: PayloadAction<IUserDiffWord>) {
      const newState = state.diffWords.filter((item) => item.id !== action.payload.id);
      state.diffWords = newState;
    },
  },
});

export const { addDiffWord, removeDiffWord } = userWordsSlice.actions;

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
        // dispatch(addDiffWord({ difficulty, id: wordId }));
        // console.log('should get all words', data[0]);
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
    console.log('here');
    if (!userId || !wordId || !token || !page) return;
    console.log(!userId || !wordId || !token);
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
      // console.log(response);

      if (response.ok) {
        dispatch(addDiffWord({ difficulty, id: wordId }));
        // console.log({ difficulty, id: wordId });
        dispatch(fetchGetAllUserWords(userId, token, difficulty, page));
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

export default userWordsSlice.reducer;
