export interface IUser {
  email: string;
  password: string;
}

export enum UrlPath {
  base = 'https://react-learnwords-example.herokuapp.com',
  words = 'words',
  users = 'users',
}
