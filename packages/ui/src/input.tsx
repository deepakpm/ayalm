import React, { InputHTMLAttributes } from 'react';
import styles from './input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', icon, ...props }, ref) => {
    return (
      <div className={`${styles.wrapper} ${className}`}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <input 
          ref={ref} 
          className={`${styles.input} ${icon ? styles.hasIcon : ''}`} 
          {...props} 
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
