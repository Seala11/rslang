import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { getErrors } from 'src/store/userSlice';
import styles from 'src/containers/login/PopUp/PopUp.module.scss';
import { IPopUpProps } from './IPopUpProps';

const PopUp: React.FC<IPopUpProps> = ({ popUp }) => {
  const errorMessages = useAppSelector(getErrors);
  const { showPopUp, setShowPopUp } = popUp;
  const [animate, setAnimate] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(() => false);
      }, 10000);
    }
  }, [animate]);

  useEffect(() => {
    if (errorMessages.length > 0) {
      setAnimate(() => true);
      setShowPopUp(() => false);
    }
  }, [errorMessages, showPopUp, setShowPopUp, dispatch]);

  return (
    <div className={animate ? styles.wrapper : styles.hide}>
      <div className={styles.popup}>
        <h6 className={styles.popup_title}>Ошибка при регистрации</h6>
        {errorMessages.map((err) => (
          <div key={err}>{err}</div>
        ))}
      </div>
    </div>
  );
};

export default PopUp;
