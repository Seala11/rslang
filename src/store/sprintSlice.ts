import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import type { AppDispatch, RootState } from '.';
import { IWord, ISprintState } from './types';

const initialState: ISprintState = {
  words: [],
};

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    addWords(state, action: PayloadAction<IWord[]>) {
      state.words = action.payload;
    },
  },
});

export const { addWords } = sprintSlice.actions;

export const fetchWords = (group: string, page: string) => async (dispatch: AppDispatch) => {
  const words = await getWordsAPI(group, page);

  dispatch(addWords(words));
};

export const selectWords = (state: RootState) => state.sprint.words;

export default sprintSlice.reducer;
