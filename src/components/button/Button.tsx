import React from 'react';
import styles from 'src/components/button/style.module.scss';
import { IButtonProps } from 'src/components/button/IButtonProps';

const Button: React.FC<IButtonProps> = ({ text = '', className = '', handler, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${className} ${disabled ? styles.disabled : ''}`}
      type="button"
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default Button;
