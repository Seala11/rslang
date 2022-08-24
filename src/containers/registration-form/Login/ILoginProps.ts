import React, { SetStateAction } from 'react';
import { IInputsValues } from 'src/containers/registration-form/SignIn/ISignInProps';

export default interface ILoginProps extends IInputsValues {
  setShowSignIn: React.Dispatch<SetStateAction<boolean>>;
}
