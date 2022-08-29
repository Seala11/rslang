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

export interface ISprintWord extends IWord {
  wrongTranslate: string;
  choice: number;
}

export interface ISprintState {
  words: ISprintWord[];
}
