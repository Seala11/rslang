// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from 'src/store/hooks';
// import { fetchCreateUser, getErrors, fetchSignInUser } from 'src/store/userSlice';
import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { fetchCreateUser, fetchSignInUser } from 'src/store/userSlice';
import styles from 'src/containers/login/Form/Form.module.scss';
import FormInput from 'src/containers/login/FormInput';
import { FormTypes, IInputTypes } from 'src/data/registration';
import ILoginFormProps from './IFormProps';
import validEmail from '../helpers/emailValidation';

const Form: React.FC<ILoginFormProps> = ({
  inputsData,
  text,
  inputValues,
  error,
  password,
  id,
  popUp,
}) => {
  const { values, setValues } = inputValues;
  const { showError, setShowError } = error;
  const { passwordShown, setPasswordShown } = password;
  const { setShowPopUp } = popUp;

  const dispatch = useAppDispatch();
  // const errorMessages = useAppSelector(getErrors);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // useEffect(() => {
  //   if (errorMessages.length > 0) setShowPopUp(() => true);
  // }, [errorMessages, setShowPopUp]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPopUp(() => false);

    switch (event.target.id) {
      case IInputTypes.NAME1:
      case IInputTypes.NAME2: {
        setValues({ ...values, name: event.target.value });
        if (showError.name) setShowError({ ...showError, name: false });
        break;
      }
      case IInputTypes.PASSPASSWORD1:
      case IInputTypes.PASSPASSWORD2: {
        setValues({ ...values, password: event.target.value });
        if (showError.password) setShowError({ ...showError, password: false });
        break;
      }
      case IInputTypes.EMAIL1:
      case IInputTypes.EMAIL2: {
        setValues({ ...values, email: event.target.value });
        if (showError.email) setShowError({ ...showError, email: false });
      }
      // no default
    }
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors = false;

    if (values.password.trim().length < 8) {
      errors = true;
      setShowError((prevState) => ({ ...prevState, password: true }));
    }
    if (values.name.trim().length < 2) {
      if (id === FormTypes.SIGNIN) errors = true;
      setShowError((prevState) => ({ ...prevState, name: true }));
    }
    if (!validEmail(values.email.trim())) {
      errors = true;
      setShowError((prevState) => ({ ...prevState, email: true }));
    }

    if (!errors) {
      switch (id) {
        case FormTypes.SIGNIN:
          await dispatch(fetchCreateUser(values));
          break;
        case FormTypes.LOGIN:
          await dispatch(fetchSignInUser({ email: values.email, password: values.password }));
        // no default
      }
    }
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
      {/* {showPopUp ? (
        <div className={styles.popup}>
          {errorMessages.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
      ) : (
        ''
      )} */}
      <button className={styles.button} type='submit'>
        {text}
      </button>
    </form>
  );
};

export default Form;
