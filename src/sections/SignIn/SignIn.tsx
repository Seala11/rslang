import React from 'react';
import styles from 'src/sections/SignIn/SignIn.module.scss';
import SignInForm from 'src/sections/SignIn/SignInForm';

const SignIn = () => {
  console.log('here');
  return (
    <>
      <h1 className={styles.title}>Регистрация</h1>
      <p className={styles.subtitle}>Используй все возможности приложения!</p>
      <SignInForm />
      <p className={styles.subtitle}>
        Уже есть аккаунт?
        <a className={styles.link} href='./'>
          Войти в учётную запись
        </a>
      </p>
    </>
  );
};

export default SignIn;
