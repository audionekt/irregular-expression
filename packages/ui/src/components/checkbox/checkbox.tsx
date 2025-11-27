'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../styles';
import * as styles from './checkbox.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helper, className, disabled, ...props }, ref) => {
    const checkboxId = props.id || `checkbox-${React.useId()}`;

    return (
      <div>
        <label
          htmlFor={checkboxId}
          className={cn(styles.wrapper, disabled && styles.wrapperDisabled, className)}
        >
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={styles.checkboxInput}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${checkboxId}-error` : helper ? `${checkboxId}-helper` : undefined}
            {...props}
          />
          <div className={styles.checkboxBox}>
            <Check className={styles.checkboxIcon} strokeWidth={3} />
          </div>
          {label && <span className={styles.label}>{label}</span>}
        </label>

        {error && (
          <p id={`${checkboxId}-error`} style={{ color: 'var(--qxf57821)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {error}
          </p>
        )}

        {helper && !error && (
          <p id={`${checkboxId}-helper`} style={{ color: 'var(--qxf5781m)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {helper}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

