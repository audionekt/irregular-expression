import React from 'react';
import { cn } from '../../styles';
import * as styles from './textarea.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | undefined;
  error?: string | undefined;
  helper?: string | undefined;
  state?: 'default' | 'error' | 'success';
  fullWidth?: boolean | undefined;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | undefined;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helper,
      state,
      fullWidth,
      resize = 'vertical',
      className,
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textAreaId = id || `textarea-${React.useId()}`;
    const textAreaState = error ? 'error' : state || 'default';

    return (
      <div className={cn(styles.wrapper, fullWidth && styles.fullWidth)}>
        {label && (
          <label htmlFor={textAreaId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textAreaId}
          rows={rows}
          className={cn(
            styles.textarea,
            styles.inputStates[textAreaState],
            styles.resize[resize],
            className
          )}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${textAreaId}-error` : helper ? `${textAreaId}-helper` : undefined
          }
          {...props}
        />

        {error && (
          <p id={`${textAreaId}-error`} className={cn(styles.message, styles.errorMessage)}>
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
          <p id={`${textAreaId}-helper`} className={cn(styles.message, styles.helperMessage)}>
            {helper}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
