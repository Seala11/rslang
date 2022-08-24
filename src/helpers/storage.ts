import { ISignInResponse } from 'src/requests/interfaceAPI';

export enum UserStorage {
  AUTH = 'Authenticated',
  MESSAGE = 'message',
  USER_ID = 'userId',
  TOKEN = 'token',
  REF_TOKEN = 'refreshToken',
  NAME = 'name',
}

export const recordUserData = (data: ISignInResponse) => {
  localStorage.setItem(UserStorage.MESSAGE, `${data.message}`);
  localStorage.setItem(UserStorage.NAME, `${data.name}`);
  localStorage.setItem(UserStorage.REF_TOKEN, `${data.refreshToken}`);
  localStorage.setItem(UserStorage.TOKEN, `${data.token}`);
  localStorage.setItem(UserStorage.USER_ID, `${data.userId}`);
};

export const clearUserData = () => {
  localStorage.clear();
};

export const getUserStoredData = () => ({
    message: localStorage.getItem(UserStorage.MESSAGE),
    token: localStorage.getItem(UserStorage.TOKEN),
    refreshToken: localStorage.getItem(UserStorage.REF_TOKEN),
    userId: localStorage.getItem(UserStorage.USER_ID),
    name: localStorage.getItem(UserStorage.NAME),
  });

export const userIsLogged = () => localStorage.getItem(UserStorage.MESSAGE) === UserStorage.AUTH;
export const getUserId = () => localStorage.getItem(UserStorage.USER_ID);
export const getUserToken = () => localStorage.getItem(UserStorage.TOKEN);
