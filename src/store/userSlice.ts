import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
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
  errorMessage: string[];
}

const initialState: IUserState = {
  current: {},
  userData: undefined,
  errorMessage: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData(state, action: PayloadAction<ISignInResponse | undefined>) {
      state.userData = action.payload;
    },
    addErrorMessage(state, action: PayloadAction<string[]>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { addUserData, addErrorMessage } = userSlice.actions;

export const fetchCreateUser = (userData: IUser) => async (dispatch: AppDispatch) => {
  try {
    const response: Response | undefined = await createUserAPI(userData);

    if (response.ok) {
      const result = await signInAPI({
        email: userData.email,
        password: userData.password,
      });
      const data: ISignInResponse = await result.json();
      recordUserData(data);
      dispatch(addUserData(data));
    } else {
      switch (response.status) {
        case ResponseStatus.FAILED:
          dispatch(addErrorMessage([ErrorMessageRU.FAILED]));
          break;
        case ResponseStatus.WRONG_ENTITY: {
          const res = await response.json();
          const errorsResponse: TErrors[] = res.error.errors;
          const err = errorsResponse.map((item) => item.message);
          dispatch(addErrorMessage(err));
          break;
        }
        default: {
          const data: string = await response.text();
          dispatch(addErrorMessage([data]));
        }
      }
    }
  } catch (err) {
    throw new Error();
  }
};

export const fetchSignInUser = (userData: IUserSignIn) => async (dispatch: AppDispatch) => {
  try {
    const response: Response | undefined = await signInAPI(userData);

    if (response.ok) {
      const data: ISignInResponse = await response.json();
      recordUserData(data);
      dispatch(addUserData(data));
    } else {
      switch (response.status) {
        case ResponseStatus.FORBIDDEN:
          dispatch(addErrorMessage([ErrorMessageRU.LOGIN_FAILED]));
          break;
        default: {
          const data: string = await response.text();
          dispatch(addErrorMessage([data]));
        }
      }
    }
  } catch (err) {
    throw new Error();
  }
};

export const getErrors = (state: RootState) => state.user.errorMessage;

export default userSlice.reducer;
