import React from 'react';
import styles from 'src/containers/login/Form/Form.module.scss';
import FormInput from 'src/containers/login/FormInput';
import ILoginFormProps from './IFormProps';

const Form: React.FC<ILoginFormProps> = ({
  inputsData,
  text,
  inputValues,
  error,
  password,
}) => {
  const { values, setValues } = inputValues;
  const { showError, setShowError } = error;
  const { passwordShown, setPasswordShown } = password;

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'signin-name':
      case 'login-name':
        setValues({ ...values, name: event.target.value });
        if (showError.name) setShowError({ ...showError, name: false });
        break;
      case 'signin-password':
      case 'login-password': {
        setValues({ ...values, password: event.target.value });
        if (showError.password) setShowError({ ...showError, password: false });
        break;
      }
      case 'signin-email':
      case 'login-email': {
        setValues({ ...values, email: event.target.value });
        if (showError.email) setShowError({ ...showError, email: false });
      }
      // no default
    }
  };

  const validEmail = (email: string) => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]$/.test(email);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.password.trim().length < 8)
      setShowError((prevState) => ({ ...prevState, password: true }));
    if (values.name.trim().length < 2) setShowError((prevState) => ({ ...prevState, name: true }));
    if (!validEmail(values.email.trim()))
      setShowError((prevState) => ({ ...prevState, email: true }));

    console.log(showError);
  };
  return (
    <form action='submit' className={`${styles.form} `} onSubmit={handleSubmit} noValidate>
      {inputsData.map((input) => {
        const { name, type, label, placeholder, errorMessage } = input;
        return (
          <FormInput
            key={name}
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
              values,
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

export default Form;
