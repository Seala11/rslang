import React from 'react';
import styles from 'src/sections/Login/Login.module.scss';
import LoginForm from 'src/sections/LoginForm';
import { LOGIN_INPUTS } from 'src/data/registration';
import ILoginProps from './ILoginProps';

const Login: React.FC<ILoginProps> = ({ setShowSignIn }) => {
  const handler = () => {
    setShowSignIn((showState) => !showState);
  };
  return (
    <>
      <h1 className={styles.title}>Войти</h1>
      <LoginForm inputsData={LOGIN_INPUTS} text='Войти' />
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
