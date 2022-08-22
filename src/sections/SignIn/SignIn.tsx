import React from 'react';
import styles from 'src/sections/SignIn/SignIn.module.scss';
// import SignInForm from 'src/sections/SignIn/SignInForm';
import { SIGNIN_INPUTS } from 'src/data/registration';
import ISignInProps from './ISignInProps';
import LoginForm from '../LoginForm';

const SignIn: React.FC<ISignInProps> = ({ setShowSignIn }) => {
  const handler = () => {
    console.log('switch to register');
    setShowSignIn((showState) => !showState);
  };
  return (
    <>
      <h1 className={styles.title}>Регистрация</h1>
      <LoginForm inputsData={SIGNIN_INPUTS} text='Зарегистрироваться' />
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
