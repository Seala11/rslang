/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IUser, ISignInResponse, IUserSignIn, TErrors } from 'src/requests/interfaceAPI';
import { clearUserData, getUserStoredData, recordUserData } from 'src/helpers/storage';
import { ResponseStatus, ErrorMessageRU, ErrorMessage } from 'src/helpers/constRequestsAPI';
import createUserAPI from 'src/requests/users/createUserAPI';
import signInAPI from 'src/requests/signIn/signInAPI';
import getUserAPI from 'src/requests/users/getUserAPI';
import type { AppDispatch, RootState } from '.';

interface IUserState {
  userData: ISignInResponse | undefined;
  loginError: boolean;
  loading: boolean;
}

const initialState: IUserState = {
  userData: undefined,
  loginError: false,
  loading: false,
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
    setUserLoading(state) {
      state.loading = true;
    },
    removeUserLoading(state) {
      state.loading = false;
    },
  },
});

export const { addUserData, removeUserData, addError, setUserLoading, removeUserLoading } =
  userSlice.actions;

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
      dispatch(addError(true));
      switch (response.status) {
        case ResponseStatus.FAILED:
          toast.error(ErrorMessageRU.FAILED);
          break;
        case ResponseStatus.WRONG_ENTITY: {
          const res = await response.json();
          const errorsResponse: TErrors[] = res.error.errors;
          const err = errorsResponse.map((item) => item.message);
          toast.error(err);
          break;
        }
        default: {
          const data: string = await response.text();
          toast.error(data);
        }
      }
    }
  } catch (err) {
    dispatch(addError(true));
    toast.error(ErrorMessageRU.UNKNOWN);
    throw err;
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
      dispatch(addError(true));
      switch (response.status) {
        case ResponseStatus.FORBIDDEN:
          toast.error(ErrorMessageRU.LOGIN_FAILED);
          break;
        default: {
          const data: string = await response.text();
          toast.error(data);
        }
      }
    }
  } catch (err) {
    dispatch(addError(true));
    toast.error(ErrorMessageRU.UNKNOWN);
    throw err;
  }
};

export const fetchGetUser =
  (id: string | null, token: string | null) => async (dispatch: AppDispatch) => {
    if (!id || !token) return;
    try {
      dispatch(setUserLoading());
      const response: Response | undefined = await getUserAPI(id, token);
      if (response.ok) {
        const data = getUserStoredData();
        dispatch(addUserData(data));
      } else {
        clearUserData();
        switch (response.status) {
          case ResponseStatus.MISSING_TOKEN:
            console.error(ErrorMessage.MISSING_TOKEN);
            break;
          case ResponseStatus.NOT_FOUND:
            console.error(ErrorMessage.USER_NOT_FOUND);
            break;
          default:
            throw new Error(`${response.statusText}`);
        }
      }
    } catch (err) {
      clearUserData();
      throw err;
    } finally {
      dispatch(removeUserLoading());
    }
  };

export const logoutUnathorizedUser = () => async (dispatch: AppDispatch) => {
  toast.error(ErrorMessageRU.UNAUTHORIZED);
  dispatch(removeUserData());
  clearUserData();
};

export const getErrors = (state: RootState) => state.user.loginError;
export const getUserData = (state: RootState) => state.user.userData;
export const getUserIsLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
