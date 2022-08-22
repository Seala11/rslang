import React from 'react';
import styles from 'src/components/FormInput/FormInput.module.scss';
import { IFormInputProps } from 'src/components/FormInput/IFormInputProps';

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
}) => {
  if (name === 'password') {
    return (
      <>
        <label htmlFor={name} className={styles.label}>
          {label}
          <input
            name={name}
            id={name}
            type={passwordShown ? 'text' : 'password'}
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
          className={`${styles.input} ${
            name === 'email' && showError.email ? styles.input_error : ''
          } ${name === 'name' && showError.name ? styles.input_error : ''}`}
          placeholder={placeholder}
          onChange={inputHandler}
        />
      </label>
      {name === 'email' ? (
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
