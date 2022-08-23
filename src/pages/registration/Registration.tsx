import React, { useState } from 'react';
import styles from 'src/pages/registration/Registration.module.scss';
import Login from 'src/containers/login/Login';
import SignIn from 'src/containers/login/SignIn';
import PopUp from 'src/containers/login/PopUp/PopUp';

const Registration: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  const [values, setValues] = useState({ name: '', password: '', email: '' });
  const [showError, setShowError] = useState({ name: false, password: false, email: false });
  const [passwordShown, setPasswordShown] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <main className={styles.main}>
      <PopUp popUp={{ showPopUp, setShowPopUp }} />
      <div className={styles.formCard}>
        <div className={`${styles.slider} ${showSignIn ? styles.signin : styles.login}`}>
          <div className={styles.wrapper}>
            <SignIn
              setShowSignIn={setShowSignIn}
              inputValues={{ values, setValues }}
              error={{ showError, setShowError }}
              password={{ passwordShown, setPasswordShown }}
              popUp={{ showPopUp, setShowPopUp }}
            />
          </div>
          <div className={styles.wrapper}>
            <Login
              setShowSignIn={setShowSignIn}
              inputValues={{ values, setValues }}
              error={{ showError, setShowError }}
              password={{ passwordShown, setPasswordShown }}
              popUp={{ showPopUp, setShowPopUp }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Registration;
