import React from 'react';
import styles from 'src/components/Button/Button.module.scss';
import { IButtonProps } from './IButtonProps';

const Button: React.FC<IButtonProps> = ({ children, className = '', handler, disabled }) => (
  <button
    disabled={disabled}
    className={`${styles.button} ${className} ${disabled ? styles.button_disabled : ''}`}
    type='button'
    onClick={handler}
  >
    {children}
  </button>
);

export default Button;
