import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import type { AppDispatch, RootState } from '.';
import { IWord, IAudioState } from './types';

const initialState: IAudioState = {
  wordsArr: [],
  loading: false,
  disable: false,
  answers: [],
  question: 0,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    addWordsArr(state, action: PayloadAction<IWord[]>) {
      state.wordsArr = action.payload;
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
  },
});

export const { addWordsArr, addLoading, addDis, updateAnswers, updateQuestion } =
  audioSlice.actions;

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

export const selectwordsArr = (state: RootState) => state.audio.wordsArr;
export const fetchisLoading = (state: RootState) => state.audio.loading;
export const isDis = (state: RootState) => state.audio.disable;
export const getAnswers = (state: RootState) => state.audio.answers;
export const getQuestion = (state: RootState) => state.audio.question;

export default audioSlice.reducer;
