import React from 'react';
import styles from 'src/pages/login/Login.module.scss';
// import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
// import getStatisticAPI from 'src/requests/statistics/getStatisticsAPI';
// import createUserAPI from 'src/requests/users/createUserAPI';
// import getSettingsAPI from 'src/requests/userSettings/getSettingsAPI';

const Login: React.FC = () => {
  // createUserAPI({ name: 'hanpa', email: 'tryaga', password: '123' });
  // createUserAPI({ name: 'hanpttttta', email: 'tryaga@ggggg', password: '123886868768' });
  // createUserAPI({ name: 'hanpa', email: 'tryaga@gmail.com', password: '123uigjhhjjn' });
  // getAllAggrWordsAPI('666ll');
  // getStatisticAPI('62fd8d4d739f660016187d52');
  // getSettingsAPI('62fd8d4d739f660016187d52');
  // eslint-disable-next-line no-console
  console.log('stop');

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Регистрация</h1>
      <p className={styles.subtitle}>Используй все возможности приложения!</p>

      <form action='submit' className={styles.form}>
        <label htmlFor='name' className={styles.label}>
          Имя
          <input id='name' type='text' className={styles.input} placeholder='Вася' />
        </label>
        <label htmlFor='email' className={styles.label}>
          Почта
          <input id='email' type='email' className={styles.input} placeholder='example@gmail.com' />
        </label>
        <label htmlFor='password' className={styles.label}>
          Пароль
          <input id='password' type='password' className={styles.input} placeholder='Не менее 8 символов' />
        </label>

        <button className={styles.button} type='submit'>
          Зарегистрироваться
        </button>
      </form>
      <p className={styles.subtitle}>
        Уже есть аккаунт?
        <a className={styles.link} href='./'>
          Войти в учетную запись
        </a>
      </p>
    </div>
  );
};

export default Login;
