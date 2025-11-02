import React from 'react';
import { cn } from '@repo/styles';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | undefined;
  error?: string | undefined;
  helper?: string | undefined;
  fullWidth?: boolean | undefined;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | undefined;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helper,
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

    const resizeClass = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }[resize];

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textAreaId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textAreaId}
          rows={rows}
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border-2 bg-white px-3 py-2 text-sm',
            'transition-all duration-200',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
            'dark:bg-gray-900 dark:border-gray-700 dark:text-white',
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300 hover:border-gray-400',
            resizeClass,
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
          <p
            id={`${textAreaId}-error`}
            className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
          >
            <svg
              className="h-4 w-4 flex-shrink-0"
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
          <p id={`${textAreaId}-helper`} className="text-sm text-gray-500 dark:text-gray-400">
            {helper}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

