import React, { useEffect, useState } from 'react';
import styles from 'src/sections/LoginForm/LoginForm.module.scss';
import FormInput from 'src/components/FormInput';
import ISignInFormProps from './LoginFormProps';

const LoginForm: React.FC<ISignInFormProps> = ({ showSignIn, inputsData, text }) => {
  const [values, setValues] = useState({ name: '', password: '', email: '' });
  const [showError, setShowError] = useState({ name: false, password: false, email: false });
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    console.log(showError);
  }, [showError]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);

    switch (event.target.id) {
      case 'name':
        setValues({ ...values, name: event.target.value });
        if (showError.name) setShowError({ ...showError, name: false });
        break;
      case 'password': {
        setValues({ ...values, password: event.target.value });
        if (showError.password) setShowError({ ...showError, password: false });
        break;
      }
      case 'email': {
        setValues({ ...values, email: event.target.value });
        if (showError.email) setShowError({ ...showError, email: false });
      }
      // no default
    }
  };

  const validEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values);

    if (values.password.trim().length < 8)
      setShowError((prevState) => ({ ...prevState, password: true }));
    if (values.name.trim().length < 2) setShowError((prevState) => ({ ...prevState, name: true }));
    if (!validEmail(values.email.trim()))
      setShowError((prevState) => ({ ...prevState, email: true }));

    console.log(showError);
  };
  return (
    <form
      action='submit'
      className={`${styles.form} ${showSignIn ? styles.signin : styles.login}`}
      onSubmit={handleSubmit}
    >
      {inputsData.map((input) => {
        const { name, type, label, placeholder, errorMessage } = input;
        return (
          <FormInput
            key={input.name}
            {...{
              name,
              type,
              label,
              placeholder,
              errorMessage,
              passwordShown,
              togglePassword,
              inputHandler,
              showError,
            }}
          />
        );
      })}
      <button className={styles.button} type='submit'>
        {text}
      </button>
    </form>
  );
};

export default LoginForm;
