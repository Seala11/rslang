import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import notify from 'src/components/PopUp/PopUp';
import { toast } from 'react-toastify';
import { IUser, ISignInResponse, IUserSignIn, TErrors } from 'src/requests/interfaceAPI';
import { ResponseStatus, ErrorMessageRU } from 'src/requests/constantsAPI';
import createUserAPI from 'src/requests/users/createUserAPI';
import signInAPI from 'src/requests/signIn/signInAPI';
import type { AppDispatch, RootState } from '.';

const recordUserData = (data: ISignInResponse) => {
  localStorage.setItem('message', data.message);
  localStorage.setItem('name', data.name);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('token', data.token);
  localStorage.setItem('userId', data.userId);
};

interface IUserState {
  current: object;
  userData: ISignInResponse | undefined;
  loginError: boolean;
}

const initialState: IUserState = {
  current: {},
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
    addError(state, action: PayloadAction<boolean>) {
      state.loginError = action.payload;
    },
  },
});

export const { addUserData, addError } = userSlice.actions;

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
    toast.error(ErrorMessageRU.UNKNOWN);
    throw new Error();
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
    toast.error(ErrorMessageRU.UNKNOWN);
    throw new Error();
  }
};

export const getErrors = (state: RootState) => state.user.loginError;

export default userSlice.reducer;
