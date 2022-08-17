import React from 'react';
import styles from 'src/components/button/Button.module.scss';
import { IButtonProps } from 'src/components/button/IButtonProps';

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
