import React from 'react';
import { cn } from '../../styles';
import * as styles from './avatar.css';

export interface AvatarProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | undefined;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'square' | 'rounded';
  fallback?: string;
}

export function Avatar({ 
  src,
  alt,
  size = 'md',
  shape = 'circle',
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
          styles.avatarBase,
          styles.avatarFallback,
          styles.sizes[size],
          styles.shapes[shape],
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
        styles.avatarBase,
        styles.avatarImage,
        styles.sizes[size],
        styles.shapes[shape],
        className
      )}
      {...props}
    />
  );
}
