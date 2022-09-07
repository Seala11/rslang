import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import {
  adaptToLocalSprintWords,
  createPageLoop,
  createPagesFilter,
  getRandomNumbers,
  shuffle,
} from 'src/helpers/utils';
import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
import type { AppDispatch, RootState } from '.';
import { IWord, ISprintState, ISprintWord } from './types';

const ALL_WORDS_BY_GROUP = 600;

const initialState: ISprintState = {
  words: [],
  group: 0,
};

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    addWords(state, action: PayloadAction<ISprintWord[]>) {
      state.words = action.payload;
    },
    updateWords(state, action: PayloadAction<ISprintWord[]>) {
      state.words.push(...action.payload);
    },
    updateGroup(state, action: PayloadAction<number>) {
      state.group = action.payload;
    },
    removeWords(state) {
      state.words = [];
    },
  },
});

export const { addWords, removeWords, updateGroup, updateWords } = sprintSlice.actions;

export const fetchGroupWords = (group: string) => async (dispatch: AppDispatch) => {
  const dataPromises = getRandomNumbers(15, 0, 29).map((value) => getWordsAPI(group, `${value}`));

  const data = await Promise.allSettled(dataPromises);
  const words = data
    .map((item) => (item.status === 'fulfilled' ? item.value : null))
    .filter((value) => value)
    .flat();

  const sprintWords = adaptToLocalSprintWords(words);

  dispatch(addWords(shuffle(sprintWords)));
};

export const fetchGroupUserWords =
  (userId: string | null, token: string | null, group: string) => async (dispatch: AppDispatch) => {
    if (!userId || !token) return;

    const filterPages = createPagesFilter(+group, 15, 0, 29);

    const filter = { $or: filterPages };

    const stringifyFilter = JSON.stringify(filter);

    const response = await getAllAggrWordsAPI(
      userId,
      token,
      stringifyFilter,
      `${ALL_WORDS_BY_GROUP}`
    );

    if (response.ok) {
      const data = await response.json();
      const words: IWord[] = data[0].paginatedResults;

      const sprintWords = adaptToLocalSprintWords(words);

      dispatch(addWords(shuffle(sprintWords)));
    }
  };

export const fetchFilteredWords =
  (userId: string | null, token: string | null, group: string, page: string) =>
  async (dispatch: AppDispatch) => {
    if (!userId || !token) return;

    dispatch(removeWords());

    const pageNumber = +page;
    const pageSequence = createPageLoop(pageNumber);
    let wordsPerPage = 20;
    let counter = 0;

    const getWords = async (pageNum: number, wordsPerPageNum: number) => {
      const filter = {
        $and: [
          { group: +group, page: pageNum },
          { $or: [{ 'userWord.optional.learned': false }, { userWord: null }] },
        ],
      };
      const stringifyFilter = JSON.stringify(filter);

      const response = await getAllAggrWordsAPI(
        userId,
        token,
        stringifyFilter,
        `${wordsPerPageNum}`
      );

      if (response.ok) {
        const data = await response.json();
        const words: IWord[] = data[0].paginatedResults;

        const sprintWords = adaptToLocalSprintWords(words);

        dispatch(updateWords(shuffle(sprintWords)));

        counter += 1;
        wordsPerPage -= sprintWords.length;

        if (counter >= pageSequence.length || wordsPerPage <= 0) return;

        await getWords(pageSequence[counter], wordsPerPage);
      }
    };

    await getWords(pageSequence[counter], wordsPerPage);
  };

export const selectWords = (state: RootState) => state.sprint.words;

export default sprintSlice.reducer;
