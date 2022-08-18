// User
export interface IUser {
  name: string;
  email: string;
  password: string;
}

// Wors
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
