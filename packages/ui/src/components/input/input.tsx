import React from 'react';
import { cn } from '../../styles';
import * as styles from './input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined;
  error?: string | undefined;
  helper?: string | undefined;
  state?: 'default' | 'error' | 'success';
  leftIcon?: React.ReactNode | undefined;
  rightIcon?: React.ReactNode | undefined;
  fullWidth?: boolean | undefined;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      state,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${React.useId()}`;
    const inputState = error ? 'error' : state || 'default';

    return (
      <div className={cn(styles.wrapper, fullWidth && styles.fullWidth)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {leftIcon && (
            <div className={cn(styles.icon, styles.leftIcon)}>{leftIcon}</div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              styles.input,
              styles.inputStates[inputState],
              leftIcon ? styles.withLeftIcon : '',
              rightIcon ? styles.withRightIcon : '',
              className
            )}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className={cn(styles.icon, styles.rightIcon)}>{rightIcon}</div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className={cn(styles.message, styles.errorMessage)}>
            <svg
              className={styles.errorIcon}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {helper && !error && (
          <p id={`${inputId}-helper`} className={cn(styles.message, styles.helperMessage)}>
            {helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
