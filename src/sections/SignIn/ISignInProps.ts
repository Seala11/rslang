import React, { SetStateAction } from 'react';

export default interface ISignInProps {
  showSignIn: boolean;
  setShowSignIn: React.Dispatch<SetStateAction<boolean>>;
}
