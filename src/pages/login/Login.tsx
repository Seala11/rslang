import React, { useState } from 'react';
import styles from 'src/pages/login/Login.module.scss';
import ErrorMessages from './constantsLogin';

const Login = () => {
  const [values, setValues] = useState({ name: '', password: '', email: '' });
  const [passwordError, setPasswordError] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, name: event.target.value });
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: event.target.value });
    if (passwordError) setPasswordError(false);
  };

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, email: event.target.value });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values);

    if (values.password.trim().length < 8) setPasswordError(true);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Регистрация</h1>
      <p className={styles.subtitle}>Используй все возможности приложения!</p>

      <form action='submit' className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor='name' className={styles.label}>
          Имя
          <input
            name='name'
            id='name'
            type='text'
            className={styles.input}
            placeholder='Вася'
            onChange={nameHandler}
          />
        </label>
        <small className={styles.error}>Error</small>

        <label htmlFor='email' className={styles.label}>
          Почта
          <input
            name='email'
            id='email'
            type='email'
            className={styles.input}
            placeholder='example@gmail.com'
            onChange={emailHandler}
          />
        </label>
        <small className={styles.error}>Error</small>

        <label htmlFor='password' className={`${styles.label} ${styles.label_password}`}>
          Пароль
          <input
            name='password'
            id='password'
            type={passwordShown ? 'text' : 'password'}
            className={styles.input}
            placeholder='Не менее 8 символов'
            onChange={passwordHandler}
          />
          <button
            type='button'
            aria-label='Show password'
            onClick={togglePassword}
            className={`${styles.password} ${
              passwordShown ? styles.password_hide : styles.password_show
            }`}
          />
        </label>

        <small className={styles.error}>{passwordError ? ErrorMessages.PASSWORD : ''}</small>

        <button className={styles.button} type='submit'>
          Зарегистрироваться
        </button>
      </form>

      <p className={styles.subtitle}>
        Уже есть аккаунт?
        <a className={styles.link} href='./'>
          Войти в учётную запись
        </a>
      </p>
    </div>
  );
};

export default Login;
