/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
import { createPageLoop } from 'src/helpers/utils';
import type { AppDispatch, RootState } from '.';
import { IWord, IAudioState } from './types';

const initialState: IAudioState = {
  wordsArr: [],
  loading: false,
  disable: false,
  answers: [],
  question: 0,
  group: 0,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    addWordsArr(state, action: PayloadAction<IWord[]>) {
      state.wordsArr = action.payload;
    },
    updateWordsArr(state, action: PayloadAction<IWord[]>) {
      state.wordsArr.push(...action.payload);
    },
    addLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    addDis(state, action: PayloadAction<boolean>) {
      state.disable = action.payload;
    },
    updateAnswers(state, action: PayloadAction<string[]>) {
      state.answers = action.payload;
    },
    updateQuestion(state, action: PayloadAction<number>) {
      state.question = action.payload;
    },
    updateGroup(state, action: PayloadAction<number>) {
      state.group = action.payload;
    },
    clearWords(state) {
      state.wordsArr = [];
    },
  },
});

export const {
  addWordsArr,
  addLoading,
  addDis,
  updateAnswers,
  updateQuestion,
  updateGroup,
  clearWords,
  updateWordsArr,
} = audioSlice.actions;

export const fetchWordsArr = (group: string, page: string) => async (dispatch: AppDispatch) => {
  dispatch(addLoading(true));
  try {
    const words = await getWordsAPI(group, page);
    const set: Set<IWord> = new Set();
    while (set.size < 20) {
      set.add(words[Math.floor(Math.random() * 20)]);
    }
    const res = Array.from(set);
    dispatch(addWordsArr(res));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(addLoading(false));
  }
};

export const fetchUserWordsArr =
  (userId: string | null, token: string | null, group: string, page: string) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !token) return;

    const response = await getAllAggrWordsAPI(
      userId,
      token,
      `{"$and":[{"group": ${group}, "page": ${page}}]}`
    );

    if (response.ok) {
      const data = await response.json();
      const words: IWord[] = data[0].paginatedResults;

      const set: Set<IWord> = new Set();
      while (set.size < 20) {
        set.add(words[Math.floor(Math.random() * 20)]);
      }
      const res = Array.from(set);
      dispatch(addWordsArr(res));
    } else {
      // TODO: проверка ошибок ?
    }
  };

export const fetchFilteredWordsArr =
  (userId: string | null, token: string | null, group: string, page: string) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !token) return;

    dispatch(clearWords());

    const pageNumber = +page;
    const pageSequence = createPageLoop(pageNumber);
    let wordsPerPage = 20;
    let counter = 0;

    const getWords = async (pageNum: number, wordsPerPageNum: number) => {
      const filter = {
        $and: [
          { group: +group, page: pageNum },
          { $or: [{ 'userWord.optional.learned': false }, { userWord: null }] },
        ],
      };
      const stringifyFilter = JSON.stringify(filter);

      const response = await getAllAggrWordsAPI(
        userId,
        token,
        stringifyFilter,
        `${wordsPerPageNum}`
      );

      if (response.ok) {
        const data = await response.json();
        const words: IWord[] = data[0].paginatedResults;

        const set: Set<IWord> = new Set(words);
        while (set.size < words.length) {
          set.add(words[Math.floor(Math.random() * words.length)]);
        }
        const res = Array.from(set);
        dispatch(updateWordsArr(res));

        counter += 1;
        wordsPerPage -= words.length;

        if (counter >= pageSequence.length || wordsPerPage <= 0) return;

        await getWords(pageSequence[counter], wordsPerPage);
      } else {
        // TODO: проверка ошибок ?
      }
    };

    await getWords(pageSequence[counter], wordsPerPage);
  };

export const selectwordsArr = (state: RootState) => state.audio.wordsArr;
export const fetchisLoading = (state: RootState) => state.audio.loading;
export const isDis = (state: RootState) => state.audio.disable;
export const getAnswers = (state: RootState) => state.audio.answers;
export const getQuestion = (state: RootState) => state.audio.question;

export default audioSlice.reducer;
