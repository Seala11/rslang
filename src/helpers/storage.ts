import { ISignInResponse } from 'src/requests/interfaceAPI';

export enum UserStorage {
  AUTH = 'Authenticated',
  MESSAGE = 'message',
  USER_ID = 'userId',
  TOKEN = 'token',
}

export const recordUserData = (data: ISignInResponse) => {
  localStorage.setItem('message', `${data.message}`);
  localStorage.setItem('name', `${data.name}`);
  localStorage.setItem('refreshToken', `${data.refreshToken}`);
  localStorage.setItem('token', `${data.token}`);
  localStorage.setItem('userId', `${data.userId}`);
};

export const clearUserData = () => {
  localStorage.clear();
};

export const getUserStoredData = () => ({
    message: localStorage.getItem('message'),
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    userId: localStorage.getItem('userId'),
    name: localStorage.getItem('name'),
  });

export const userIsLogged = () => localStorage.getItem(UserStorage.MESSAGE) === UserStorage.AUTH;
export const getUserId = () => localStorage.getItem(UserStorage.USER_ID);
export const getUserToken = () => localStorage.getItem(UserStorage.TOKEN);
