import React from 'react';

export interface IButtonProps {
  children: React.ReactElement[] | React.ReactElement | string;
  className?: string;
  handler?: () => void;
  disabled?: boolean;
}
