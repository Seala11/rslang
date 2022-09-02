import { IStatistics, IUserWord } from 'src/requests/interfaceAPI';

export interface IWord {
  id: string;
  _id?: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: IUserWord;
}

export interface IWordsState {
  currentPage: IWord[];
  wordDetails: IWord | null;
  loading: boolean;
}

export interface ISprintWord extends IWord {
  wrongTranslate: string;
  choice: number;
}

export interface IAudioState {
  wordsArr: IWord[];
  loading: boolean;
  disable: boolean;
  answers: string[];
  question: number;
}

export interface ISprintState {
  words: ISprintWord[];
}

export interface IUserStatistics {
  userStatistics: IStatistics | null;
}

export interface IUserWordsState {
  diffSectionEmpty: boolean | null;
  diffWords: IWord[];
  currPageLearned: boolean;
}
