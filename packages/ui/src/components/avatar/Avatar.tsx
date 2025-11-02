import React from 'react';
import { cn } from '@repo/styles';

export interface AvatarProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | undefined;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-base',
};

export function Avatar({ 
  src,
  alt,
  size = 'md',
  fallback,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);
  
  const showFallback = !src || imageError;
  const initials = fallback || alt.substring(0, 2).toUpperCase();

  if (showFallback) {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium',
          sizeClasses[size],
          className
        )}
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
      className={cn(
        'inline-block rounded-full object-cover',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}

