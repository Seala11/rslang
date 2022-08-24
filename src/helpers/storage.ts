import { ISignInResponse } from 'src/requests/interfaceAPI';

export enum UserStorage {
  AUTH = 'Authenticated',
}

export const recordUserData = (data: ISignInResponse) => {
  localStorage.setItem('message', data.message);
  localStorage.setItem('name', data.name);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('token', data.token);
  localStorage.setItem('userId', data.userId);
};

export const clearUserData = () => {
  localStorage.clear();
};

export const userIsLogged = (message: string | undefined) => message === UserStorage.AUTH;
