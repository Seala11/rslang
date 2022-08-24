// User
export interface IUser {
  name: string;
  email: string;
  password: string;
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
  optional: object;
}

// Statistics
export interface IStatistics {
  learnedWords: number;
  optional: object;
}

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
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
