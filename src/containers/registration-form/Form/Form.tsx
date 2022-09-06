import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { fetchCreateUser, fetchSignInUser, getErrors } from 'src/store/userSlice';
import styles from 'src/containers/registration-form/Form/Form.module.scss';
import FormInput from 'src/containers/registration-form/FormInput';
import { FetchStatus, FormTypes, InputTypes } from 'src/helpers/constRegistration';
import { addCurrentPageWords, removeWordDetails } from 'src/store/wordsSlice';
import ILoginFormProps from './IFormProps';

const Form: React.FC<ILoginFormProps> = ({
  inputsData,
  text,
  inputValues,
  error,
  password,
  id,
}) => {
  const { values, setValues } = inputValues;
  const { showError, setShowError } = error;
  const { passwordShown, setPasswordShown } = password;

  const [fetchInProgress, setFetchInProgress] = useState({ status: FetchStatus.INIT });

  const navigate = useNavigate();
  const loginError = useAppSelector(getErrors);
  const dispatch = useAppDispatch();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const validEmail = (email: string) => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/.test(email);

  useEffect(() => {
    if (!loginError && fetchInProgress.status === FetchStatus.DONE) {
      dispatch(addCurrentPageWords([]));
      dispatch(removeWordDetails());
      navigate('/');
    }
  }, [fetchInProgress, loginError, navigate, dispatch]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case InputTypes.NAME1:
      case InputTypes.NAME2: {
        setValues({ ...values, name: event.target.value });
        if (showError.name) setShowError({ ...showError, name: false });
        break;
      }
      case InputTypes.PASSPASSWORD1:
      case InputTypes.PASSPASSWORD2: {
        setValues({ ...values, password: event.target.value });
        if (showError.password) setShowError({ ...showError, password: false });
        break;
      }
      case InputTypes.EMAIL1:
      case InputTypes.EMAIL2: {
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
          setFetchInProgress((prevState) => ({ ...prevState, status: FetchStatus.START }));
          await dispatch(fetchCreateUser(values)).then(() => {
            setFetchInProgress((prevState) => ({ ...prevState, status: FetchStatus.DONE }));
          });
          break;
        case FormTypes.LOGIN:
          setFetchInProgress((prevState) => ({ ...prevState, status: FetchStatus.START }));
          await dispatch(fetchSignInUser({ email: values.email, password: values.password })).then(
            () => {
              setFetchInProgress((prevState) => ({ ...prevState, status: FetchStatus.DONE }));
            }
          );
          break;
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
      <button
        className={styles.button}
        type='submit'
        disabled={fetchInProgress.status === FetchStatus.START}
      >
        {text}
      </button>
    </form>
  );
};

export default Form;
