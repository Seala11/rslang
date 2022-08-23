import React, { SetStateAction } from 'react';

export interface IPopUpProps {
  popUp: {
    showPopUp: boolean;
    setShowPopUp: React.Dispatch<SetStateAction<boolean>>;
  };
}
