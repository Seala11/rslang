import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import type { AppDispatch, RootState } from '.';
import { IWord, IWordsState } from './types';

const initialState: IWordsState = {
  currentPage: [],
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    addCurrentPageWords(state, action: PayloadAction<IWord[]>) {
      state.currentPage = action.payload;
    },
  },
});

export const { addCurrentPageWords } = audioSlice.actions;

export const fetchCurrentPageWords =
  (group: string, page: string) => async (dispatch: AppDispatch) => {
    const words = await getWordsAPI(group, page);

    dispatch(addCurrentPageWords(words));
  };

export const selectCurrentPageWords = (state: RootState) => state.audio.currentPage;

export default audioSlice.reducer;