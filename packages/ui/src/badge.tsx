import React, { HTMLAttributes } from 'react';
import styles from './badge.module.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'outline' | 'secondary';
  icon?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', icon, className = '', ...props }, ref) => {
    const classNames = [
      styles.badge,
      styles[variant],
      className,
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
