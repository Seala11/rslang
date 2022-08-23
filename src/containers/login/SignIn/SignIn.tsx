import React from 'react';
import styles from 'src/containers/login/SignIn/SignIn.module.scss';
import { SIGNIN_INPUTS, FormTypes } from 'src/data/registration';
import { ISignInProps } from 'src/containers/login/SignIn/ISignInProps';
import LoginForm from 'src/containers/login/Form';

const SignIn: React.FC<ISignInProps> = ({ setShowSignIn, inputValues, error, password }) => {
  const { values, setValues } = inputValues;
  const { showError, setShowError } = error;
  const { passwordShown, setPasswordShown } = password;

  const handler = () => {
    setShowSignIn((showState) => !showState);
    setShowError({ name: false, email: false, password: false });
    setPasswordShown(() => false);
  };
  return (
    <>
      <h1 className={styles.title}>Регистрация</h1>
      <LoginForm
        inputValues={{ values, setValues }}
        error={{ showError, setShowError }}
        password={{ passwordShown, setPasswordShown }}
        inputsData={SIGNIN_INPUTS}
        text='Зарегистрироваться'
        id={FormTypes.SIGNIN}
      />
      <p className={styles.subtitle}>
        Уже есть аккаунт?
        <button type='button' className={styles.link} onClick={handler}>
          Войти в учётную запись
        </button>
      </p>
    </>
  );
};

export default SignIn;
