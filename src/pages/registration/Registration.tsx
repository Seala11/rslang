import React, { useState } from 'react';
import styles from 'src/pages/registration/Registration.module.scss';
import Login from 'src/containers/registration-form/Login';
import SignIn from 'src/containers/registration-form/SignIn';
import LayoutMain from 'src/containers/LayoutMain/LayoutMain';

const Registration: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  const [values, setValues] = useState({ name: '', password: '', email: '' });
  const [showError, setShowError] = useState({ name: false, password: false, email: false });
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <LayoutMain>
      <main className={styles.main}>
        <div className={styles.formCard}>
          <div className={`${styles.slider} ${showSignIn ? styles.signin : styles.login}`}>
            <div className={styles.wrapper}>
              <SignIn
                setShowSignIn={setShowSignIn}
                inputValues={{ values, setValues }}
                error={{ showError, setShowError }}
                password={{ passwordShown, setPasswordShown }}
              />
            </div>
            <div className={styles.wrapper}>
              <Login
                setShowSignIn={setShowSignIn}
                inputValues={{ values, setValues }}
                error={{ showError, setShowError }}
                password={{ passwordShown, setPasswordShown }}
              />
            </div>
          </div>
        </div>
      </main>
    </LayoutMain>
  );
};

export default Registration;
