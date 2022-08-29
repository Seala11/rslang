export interface IWord {
  id: string;
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
}

export interface IWordsState {
  currentPage: IWord[];
}

export interface IAudioState {
  wordsArr: IWord[];
  loading: boolean;
  disable: boolean;
  answers: string[];
  question: number;
}

export interface ISprintState {
  words: IWord[];
}
