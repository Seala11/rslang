import React from 'react';
import styles from 'src/pages/login/Login.module.scss';
import SignIn from 'src/sections/SignIn/SignIn';

const Login: React.FC = () => (
  <main className={styles.main}>
    <SignIn />
  </main>
);

export default Login;
