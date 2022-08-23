import React, { useEffect } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { getErrors } from 'src/store/userSlice';
import styles from 'src/containers/login/PopUp/PopUp.module.scss';
import { IPopUpProps } from './IPopUpProps';

const PopUp: React.FC<IPopUpProps> = ({ popUp }) => {
  const errorMessages = useAppSelector(getErrors);
  const { showPopUp, setShowPopUp } = popUp;

  useEffect(() => {
    if (errorMessages.length > 0) setShowPopUp(() => true);
  }, [errorMessages, setShowPopUp]);

  return (
    <div className={styles.wrapper}>
      {showPopUp ? (
        <div className={styles.popup}>
          <h6 className={styles.popup_title}>Ошибка при регистрации</h6>
          {errorMessages.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PopUp;
