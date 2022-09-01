import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getWordsAPI from 'src/requests/words/getWordsAPI';
import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
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

// Play Games from textbook for logged user
// новые слова - это слова, которые впервые использовались в мини-играх вне зависимости от того, открывались мини-игры на странице учебника или по ссылке в меню

// как понять, что слово новое:
const wordIsNew = (word: IWord) => {
  if (!word.userWord) return true;
  return (
    word.userWord?.optional.sprint.right === 0 &&
    word.userWord?.optional.sprint.wrong === 0 &&
    word.userWord?.optional.audio.right === 0 &&
    word.userWord?.optional.audio.wrong === 0
  );
};

// как добрать новых слов с какой-либо страницы:
export const fetchNewWordsFromPage =
  async (userId: string | null, token: string | null, page: string, group: string) => async () => {
    try {
      if (!userId || !token) return;
      const response: Response | undefined = await getAllAggrWordsAPI(
        userId,
        token,
        `{"$and":[{"group": ${group}, "page": ${page}}]}`
      );

      if (response.ok) {
        const words = await response.json();
        const newWords = words.filter((word: IWord) => wordIsNew(word));
        // eslint-disable-next-line no-console
        console.log(newWords);
      }
    } catch (err) {
      throw new Error();
    }
  };
