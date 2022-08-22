import React, { SetStateAction } from 'react';
import { IInputsValues } from 'src/sections/SignIn/ISignInProps';

export default interface ILoginProps extends IInputsValues {
  setShowSignIn: React.Dispatch<SetStateAction<boolean>>;
}

