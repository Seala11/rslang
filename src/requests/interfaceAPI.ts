// User
export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IGetUser {
  name: string;
  email: string;
  id: string;
}

export interface ICreateUserResponse {
  data?: IUser;
  error?: IErrors;
}

export interface IErrors {
  status?: string;
  errors: TErrors[];
}

export type TErrors = {
  path: string[];
  message: string;
};

// Words
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

export interface IUserWord {
  difficulty: string;
  optional: IOptions;
}

export interface IOptions {
  learned: boolean;
  difficult: boolean;
  sprint: { right: number; wrong: number };
  audio: { right: number; wrong: number };
}

export interface IUserWordResponse {
  id: string;
  difficulty: string;
  optional: IOptions;
  wordId: string;
}

// Statistics
export interface IStatistics {
  learnedWords: number;
  optional: IDayStatistic;
}

export interface IStatisticsResponse {
  id: string;
  learnedWords: number;
  optional: IDayStatistic;
}

export interface IDayStatistic {
  [key: string]: IGameStatistics;
}

export interface IGameStatistics {
  audio: GameStatistics;
  sprint: GameStatistics;
  textbook: number;
}

export type GameStatistics = {
  right: number;
  wrong: number;
  new: number;
  strike: number;
  learned: number;
};

// Settings
export interface ISettings {
  wordsPerDay: number;
  optional: object;
}

// Sign In
export interface IUserSignIn {
  email: string;
  password: string;
}

export interface ISignInResponse {
  message: string | null;
  token: string | null;
  refreshToken: string | null;
  userId: string | null;
  name: string | null;
}

export interface IUpdateUserToken {
  token: string;
  refreshToken: string;
}
