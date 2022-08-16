import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './';

interface IWordsState {
  currentPage: object[];
  customWord: string;
}

const initialState: IWordsState = {
  currentPage: [],
  customWord: '',
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    clearAll: (state) => {
      state.currentPage = [];
      state.customWord = '';
    },

    addCustomWord: (state, action: PayloadAction<string>) => {
      state.customWord = action.payload;
    },
  },
});

export const { clearAll, addCustomWord } = wordsSlice.actions;

export const selectCurrentPageWords = (state: RootState) => state.words.currentPage;
export const selectCustomWord = (state: RootState) => state.words.customWord;

export default wordsSlice.reducer;
