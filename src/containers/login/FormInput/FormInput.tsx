import React from 'react';
import styles from 'src/containers/login/FormInput/FormInput.module.scss';
import { IFormInputProps } from 'src/containers/login/FormInput/IFormInputProps';
import { IInputTypes } from 'src/data/registration';

const FormInput: React.FC<IFormInputProps> = ({
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
}) => {
  const passwordType = name === IInputTypes.PASSPASSWORD1 || name === IInputTypes.PASSPASSWORD2;
  const nameType = name === IInputTypes.NAME1 || name === IInputTypes.NAME2;
  const emailType = name === IInputTypes.EMAIL1 || name === IInputTypes.EMAIL2;
  if (passwordType) {
    return (
      <>
        <label htmlFor={name} className={styles.label}>
          {label}
          <input
            name={name}
            id={name}
            type={passwordShown ? 'text' : 'password'}
            value={values.password}
            className={`${styles.input} ${showError.password ? styles.input_error : ''}`}
            placeholder={placeholder}
            onChange={inputHandler}
          />
          <button
            type='button'
            aria-label='Show password'
            onClick={togglePassword}
            className={`${styles.password} ${
              passwordShown ? styles.password_hide : styles.password_show
            }`}
          />
        </label>
        <small
          className={`${styles.error} ${
            showError.password ? styles.error_show : styles.error_hide
          }`}
        >
          {errorMessage}
        </small>
      </>
    );
  }

  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
        <input
          name={name}
          id={name}
          type={type}
          value={emailType ? values.email : values.name}
          className={`${styles.input} ${emailType && showError.email ? styles.input_error : ''} ${
            nameType && showError.name ? styles.input_error : ''
          }`}
          placeholder={placeholder}
          onChange={inputHandler}
        />
      </label>
      {emailType ? (
        <small
          className={`${styles.error} ${showError.email ? styles.error_show : styles.error_hide}`}
        >
          {errorMessage}
        </small>
      ) : (
        <small
          className={`${styles.error} ${showError.name ? styles.error_show : styles.error_hide}`}
        >
          {errorMessage}
        </small>
      )}
    </>
  );
};

export default FormInput;
