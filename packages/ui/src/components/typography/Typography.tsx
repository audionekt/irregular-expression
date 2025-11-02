import React from 'react';
import { cn } from '@repo/styles';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'caption';
  className?: string;
  as?: React.ElementType;
}

const variantClasses = {
  h1: 'text-4xl font-bold dark:text-white',
  h2: 'text-2xl font-semibold dark:text-white',
  h3: 'text-xl font-semibold dark:text-white',
  h4: 'text-lg font-medium dark:text-white',
  p: 'text-base text-gray-600 dark:text-gray-400',
  caption: 'text-sm text-gray-500 dark:text-gray-500',
};

const defaultElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  caption: 'span',
};

export function Typography({ 
  variant = 'p', 
  className,
  children,
  as,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  const Component = as || defaultElements[variant];
  
  return React.createElement(
    Component,
    {
      className: cn(variantClasses[variant], className),
      ...props,
    },
    children
  );
}

