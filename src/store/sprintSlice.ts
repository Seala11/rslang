import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import { adaptToLocalSprintWords, shuffle } from 'src/helpers/utils';
import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
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

export const fetchWords = (group: string, page: string) => async (dispatch: AppDispatch) => {
  const words = await getWordsAPI(group, page);
  const sprintWords = adaptToLocalSprintWords(words);

  dispatch(addWords(shuffle(sprintWords)));
};

export const fetchUserWords =
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

      const sprintWords = adaptToLocalSprintWords(words);

      dispatch(addWords(shuffle(sprintWords)));
    } else {
      // TODO: проверка ошибок ?
    }
  };

export const selectWords = (state: RootState) => state.sprint.words;

export default sprintSlice.reducer;
