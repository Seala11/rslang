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

export interface ISprintState {
  words: IWord[];
}

// export interface IUserWord {
//   difficulty: string;
//   id: string;
// }

export interface IUserDiffWord {
  difficulty: string;
  id: string;
}