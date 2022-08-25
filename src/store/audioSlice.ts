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
  (group: string) => async (dispatch: AppDispatch) => {
      const results = [];
      for (let i = 0; i < 30; i += 1) {
        const arr = getWordsAPI(group, `${i}`)
        results.push(arr);
      }
    // const words = await getWordsAPI(group, page);
    // dispatch(addCurrentPageWords(words));
    const res = await Promise.all(results);
    const res2 = res.flat()
    dispatch(addCurrentPageWords(res2))
  };

export const selectCurrentPageWords = (state: RootState) => state.audio.currentPage;

export default audioSlice.reducer;
