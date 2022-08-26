import { IUserWord } from 'src/requests/interfaceAPI';

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

export interface ISprintState {
  words: IWord[];
}

export interface IAudioState {
  currentPage: IWord[];
}

// export interface IUserWord {
//   difficulty: string;
//   id: string;
// }

export interface IUserDiffWord {
  difficulty: string;
  id: string;
}
