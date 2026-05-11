import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.button,
      styles[variant],
      fullWidth ? styles.fullWidth : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classNames} {...props}>
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        {children}
        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
