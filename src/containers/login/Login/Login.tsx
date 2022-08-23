import React from 'react';
import styles from 'src/containers/login/Login/Login.module.scss';
import LoginForm from 'src/containers/login/Form';
import { LOGIN_INPUTS, FormTypes } from 'src/data/registration';
import ILoginProps from 'src/containers/login/Login/ILoginProps';

const Login: React.FC<ILoginProps> = ({ setShowSignIn, inputValues, error, password, popUp }) => {
  const { values, setValues } = inputValues;
  const { showError, setShowError } = error;
  const { passwordShown, setPasswordShown } = password;
  const { showPopUp, setShowPopUp } = popUp;

  const handler = () => {
    setShowSignIn((showState) => !showState);
    setShowError({ name: false, email: false, password: false });
    setPasswordShown(() => false);
  };
  return (
    <>
      <h1 className={styles.title}>Войти</h1>
      <LoginForm
        inputValues={{ values, setValues }}
        error={{ showError, setShowError }}
        password={{ passwordShown, setPasswordShown }}
        inputsData={LOGIN_INPUTS}
        text='Войти'
        id={FormTypes.LOGIN}
        popUp = {{showPopUp, setShowPopUp}}
      />
      <p className={styles.subtitle}>
        Еще нет аккаунта?
        <button type='button' className={styles.link} onClick={handler}>
          Создать учетную запись
        </button>
      </p>
    </>
  );
};

export default Login;
