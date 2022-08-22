import React, { useState } from 'react';
import styles from 'src/pages/registration/Registration.module.scss';
import Login from 'src/sections/Login';
import SignIn from 'src/sections/SignIn/SignIn';

const Registration: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <main className={styles.main}>
      <div className={styles.formCard}>
        <div className={`${styles.slider} ${showSignIn ? styles.signin : styles.login}`}>
          <div className={styles.wrapper}>
            <SignIn setShowSignIn={setShowSignIn} />
          </div>
          <div className={styles.wrapper}>
            <Login setShowSignIn={setShowSignIn} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Registration;
