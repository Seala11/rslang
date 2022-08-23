import React, { SetStateAction } from 'react';
import { IUser } from 'src/requests/interfaceAPI';

export type TValues = {
  values: IUser;
  setValues: React.Dispatch<SetStateAction<IUser>>;
};

type TErrors = {
  name: boolean;
  password: boolean;
  email: boolean;
};

type TError = {
  showError: TErrors;
  setShowError: React.Dispatch<SetStateAction<TErrors>>;
};

type TPassword = {
  passwordShown: boolean;
  setPasswordShown: React.Dispatch<SetStateAction<boolean>>;
};

type TPopUp = {
  showPopUp: boolean;
  setShowPopUp: React.Dispatch<SetStateAction<boolean>>;
}

export interface IInputsValues {
  inputValues: TValues;
  password: TPassword;
  error: TError;
  popUp: TPopUp;
}

export interface ISignInProps extends IInputsValues {
  setShowSignIn: React.Dispatch<SetStateAction<boolean>>;
}
