import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import type { AppDispatch, RootState } from '.';
import { IWord, IWordsState } from './types';

const initialState: IWordsState = {
  currentPage: [],
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addCurrentPageWords(state, action: PayloadAction<IWord[]>) {
      state.currentPage = action.payload;
    },
  },
});

export const { addCurrentPageWords } = wordsSlice.actions;

export const fetchCurrentPageWords =
  (group: string, page: string) => async (dispatch: AppDispatch) => {
    const words = await getWordsAPI(group, page);

    dispatch(addCurrentPageWords(words));
  };

export const selectCurrentPageWords = (state: RootState) => state.words.currentPage;

export default wordsSlice.reducer;
