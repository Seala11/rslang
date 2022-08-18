import React from 'react';
import styles from 'src/pages/login/Login.module.scss';
import getAllAggrWordsAPI from 'src/requests/aggregatedWords/getAllAggrWordsAPI';
import createUserAPI from 'src/requests/users/createUserAPI';

const Login: React.FC = () => {
  // createUserAPI({ name: 'hanpa', email: 'tryaga', password: '123' });
  // createUserAPI({ name: 'hanpttttta', email: 'tryaga@ggggg', password: '123886868768' });
  createUserAPI({ name: 'hanpa', email: 'tryaga@gmail.com', password: '123uigjhhjjn' });
  getAllAggrWordsAPI('666ll');

  return (
    <div>
      <h1 className={`${styles.title}`}>Регистрация</h1>
      <p>Используй все возможности приложения!</p>
    </div>
  );
};

export default Login;
