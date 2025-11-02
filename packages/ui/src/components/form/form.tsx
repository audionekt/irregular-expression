import React from 'react';
import { cn } from '../../styles';
import * as styles from './form.css';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, onSubmit, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(e);
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(styles.form, className)}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';

// Form Section component for grouping form fields
export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className={cn(styles.formSection, className)}>
      {(title || description) && (
        <div className={styles.formSectionHeader}>
          {title && <h3 className={styles.formSectionTitle}>{title}</h3>}
          {description && <p className={styles.formSectionDescription}>{description}</p>}
        </div>
      )}
      <div className={styles.formSectionContent}>{children}</div>
    </div>
  );
};

// Form Grid component for creating responsive layouts
export interface FormGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const FormGrid: React.FC<FormGridProps> = ({
  children,
  columns = 2,
  className,
}) => {
  return (
    <div className={cn(styles.formGrid, styles.gridColumns[columns], className)}>
      {children}
    </div>
  );
};

// Form Actions component for submit/cancel buttons
export interface FormActionsProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  children,
  align = 'right',
  className,
}) => {
  return (
    <div className={cn(styles.formActions, styles.formActionsAlign[align], className)}>
      {children}
    </div>
  );
};
