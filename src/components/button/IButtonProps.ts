import React from 'react';

export interface IButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  handler?: () => void;
  disabled?: boolean;
}
