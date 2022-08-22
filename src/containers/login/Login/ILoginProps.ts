import React, { SetStateAction } from 'react';
import { IInputsValues } from 'src/containers/login/SignIn/ISignInProps';

export default interface ILoginProps extends IInputsValues {
  setShowSignIn: React.Dispatch<SetStateAction<boolean>>;
}

