import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import type { AppDispatch, RootState } from '.';
import { IWord, IWordsState } from './types';

const initialState: IWordsState = {
  currentPage: [],
  wordDetails: null,
  loading: false,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addCurrentPageWords(state, action: PayloadAction<IWord[]>) {
      state.currentPage = action.payload;
    },
    addWordDetails(state, action: PayloadAction<IWord | null>) {
      state.wordDetails = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    removeLoading(state) {
      state.loading = false;
    },
  },
});

export const { addCurrentPageWords, addWordDetails, setLoading, removeLoading } =
  wordsSlice.actions;

export const fetchCurrentPageWords =
  (group: string, page: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());
      const words = await getWordsAPI(group, page);
      dispatch(addCurrentPageWords(words));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      dispatch(removeLoading());
    }
  };

export const selectCurrentPageWords = (state: RootState) => state.words.currentPage;
export const selectWordDetails = (state: RootState) => state.words.wordDetails;
export const getLoading = (state: RootState) => state.words.loading;

export default wordsSlice.reducer;
