import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import type { AppDispatch, RootState } from '.';

interface IWord {
  word: string;
  wordTranslate: string;
  image: string;
}

interface IWordsState {
  currentPage: IWord[];
  customWord: string;
}

const initialState: IWordsState = {
  currentPage: [],
  customWord: '',
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    clearAll(state) {
      state.currentPage = [];
      state.customWord = '';
    },

    addCustomWord(state, action: PayloadAction<string>) {
      state.customWord = action.payload;
    },

    addCurrentPageWords(state, action: PayloadAction<IWord[]>) {
      state.currentPage = action.payload;
    },
  },
});

export const { clearAll, addCustomWord, addCurrentPageWords } = wordsSlice.actions;

export const fetchCurrentPageWords =
  (group: number, page: number) => async (dispatch: AppDispatch) => {
    const words = await getWordsAPI(group, page);

    dispatch(addCurrentPageWords(words));
  };

export const selectCurrentPageWords = (state: RootState) => state.words.currentPage;
export const selectCustomWord = (state: RootState) => state.words.customWord;

export default wordsSlice.reducer;
