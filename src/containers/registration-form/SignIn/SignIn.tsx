import React from 'react';
import styles from 'src/containers/registration-form/SignIn/SignIn.module.scss';
import { SIGNIN_INPUTS } from 'src/data/registration';
import { ISignInProps } from 'src/containers/registration-form/SignIn/ISignInProps';
import LoginForm from 'src/containers/registration-form/Form';
import { FormTypes } from 'src/helpers/constRegistration';

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
        <span className={styles.haveAcc}>Уже есть аккаунт?</span>
        <button type='button' className={styles.link} onClick={handler}>
          Войти в учётную запись
        </button>
      </p>
    </>
  );
};

export default SignIn;
