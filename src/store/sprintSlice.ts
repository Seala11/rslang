import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import { shuffle } from 'src/helpers/utils';
import type { AppDispatch, RootState } from '.';
import { IWord, ISprintState, ISprintWord } from './types';

const initialState: ISprintState = {
  words: [],
};

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    addWords(state, action: PayloadAction<ISprintWord[]>) {
      state.words = action.payload;
    },
    removeWords(state) {
      state.words = [];
    },
  },
});

export const { addWords, removeWords } = sprintSlice.actions;

const convertToSprintWords = (words: IWord[]) =>
  words.map((word, i) => ({
    ...word,
    wrongTranslate: words[(i + 1) % words.length].wordTranslate,
    choice: Math.round(Math.random()),
  }));

export const fetchWords = (group: string, page: string) => async (dispatch: AppDispatch) => {
  const words = await getWordsAPI(group, page);
  const sprintWords = convertToSprintWords(words);

  dispatch(addWords(shuffle(sprintWords)));
};

export const selectWords = (state: RootState) => state.sprint.words;

export default sprintSlice.reducer;
