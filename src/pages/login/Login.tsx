import React from 'react';
import styles from 'src/pages/login/Login.module.scss';
// import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
// import getStatisticAPI from 'src/requests/statistics/getStatisticsAPI';
// import createUserAPI from 'src/requests/users/createUserAPI';
import getSettingsAPI from 'src/requests/userSettings/getSettingsAPI';

const Login: React.FC = () => {
  // createUserAPI({ name: 'hanpa', email: 'tryaga', password: '123' });
  // createUserAPI({ name: 'hanpttttta', email: 'tryaga@ggggg', password: '123886868768' });
  // createUserAPI({ name: 'hanpa', email: 'tryaga@gmail.com', password: '123uigjhhjjn' });
  // getAllAggrWordsAPI('666ll');
  // getStatisticAPI('62fd8d4d739f660016187d52');
  getSettingsAPI('62fd8d4d739f660016187d52');

  return (
    <div>
      <h1 className={`${styles.title}`}>Регистрация</h1>
      <p>Используй все возможности приложения!</p>
    </div>
  );
};

export default Login;
