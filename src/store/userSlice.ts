/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  IUser,
  ISignInResponse,
  IUserSignIn,
  TErrors,
  IUpdateUserToken,
} from 'src/requests/interfaceAPI';
import { getUserStoredData, recordUserData } from 'src/helpers/storage';
import { ResponseStatus, ErrorMessageRU, ErrorMessage } from 'src/helpers/constRequestsAPI';
import getUserTokenAPI from 'src/requests/users/getUserTokenAPI';
import createUserAPI from 'src/requests/users/createUserAPI';
import signInAPI from 'src/requests/signIn/signInAPI';
import getUserAPI from 'src/requests/users/getUserAPI';
import createError from 'src/requests/createError';
import type { AppDispatch, RootState } from '.';

interface IUserState {
  userData: ISignInResponse | undefined;
  loginError: boolean;
}

const initialState: IUserState = {
  userData: undefined,
  loginError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData(state, action: PayloadAction<ISignInResponse | undefined>) {
      state.userData = action.payload;
    },
    removeUserData(state) {
      state.userData = undefined;
    },
    addError(state, action: PayloadAction<boolean>) {
      state.loginError = action.payload;
    },
  },
});

export const { addUserData, removeUserData, addError } = userSlice.actions;

export const fetchCreateUser = (userData: IUser) => async (dispatch: AppDispatch) => {
  try {
    const response: Response | undefined = await createUserAPI(userData);
    dispatch(addError(false));
    if (response.ok) {
      const result = await signInAPI({
        email: userData.email,
        password: userData.password,
      });
      const data: ISignInResponse = await result.json();
      recordUserData(data);
      dispatch(addUserData(data));
      toast.success(`Пользователь ${data.name} успешно зарегестрирован`);
    } else {
      switch (response.status) {
        case ResponseStatus.FAILED:
          dispatch(addError(true));
          toast.error(ErrorMessageRU.FAILED);
          break;
        case ResponseStatus.WRONG_ENTITY: {
          const res = await response.json();
          const errorsResponse: TErrors[] = res.error.errors;
          const err = errorsResponse.map((item) => item.message);
          dispatch(addError(true));
          toast.error(err);
          break;
        }
        default: {
          const data: string = await response.text();
          dispatch(addError(true));
          toast.error(data);
        }
      }
    }
  } catch (err) {
    dispatch(addError(true));
    toast.error(ErrorMessageRU.UNKNOWN);
    console.error(err);
  }
};

export const fetchSignInUser = (userData: IUserSignIn) => async (dispatch: AppDispatch) => {
  try {
    const response: Response | undefined = await signInAPI(userData);
    dispatch(addError(false));
    if (response.ok) {
      const data: ISignInResponse = await response.json();
      recordUserData(data);
      dispatch(addUserData(data));
      toast.success(`Welcome back, ${data.name}!`);
    } else {
      switch (response.status) {
        case ResponseStatus.FORBIDDEN:
          dispatch(addError(true));
          toast.error(ErrorMessageRU.LOGIN_FAILED);
          break;
        default: {
          const data: string = await response.text();
          toast.error(data);
          dispatch(addError(true));
        }
      }
    }
  } catch (err) {
    dispatch(addError(true));
    toast.error(ErrorMessageRU.UNKNOWN);
    console.error(err);
  }
};

// TODO: check if we need it
export const fetchUpdateToken = (id: string | null, refreshToken: string | null) => async () => {
  if (!id || !refreshToken) return;
  try {
    const response: Response | undefined = await getUserTokenAPI(id, refreshToken);
    if (response.ok) {
      const data: IUpdateUserToken = await response.json();
      console.log(data);
    } else {
      switch (response.status) {
        case ResponseStatus.MISSING_TOKEN:
          console.error(ErrorMessage.MISSING_TOKEN);
          break;
        default: {
          console.error(response.statusText);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchGetUser =
  (id: string | null, token: string | null) => async (dispatch: AppDispatch) => {
    if (!id || !token) return;
    try {
      const response: Response | undefined = await getUserAPI(id, token);
      if (response.ok) {
        const data = getUserStoredData();
        dispatch(addUserData(data));
      } else {
        switch (response.status) {
          case ResponseStatus.MISSING_TOKEN:
            throw createError(new Error(ErrorMessage.MISSING_TOKEN), `${response.status}`);
          case ResponseStatus.NOT_FOUND:
            throw createError(new Error(ErrorMessage.USER_NOT_FOUND), `${response.status}`);
          default: {
            throw new Error(`${response.statusText}`);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

export const getErrors = (state: RootState) => state.user.loginError;
export const getUserData = (state: RootState) => state.user.userData;

export default userSlice.reducer;
