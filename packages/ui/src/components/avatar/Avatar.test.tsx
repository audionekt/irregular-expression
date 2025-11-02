import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  describe('with image source', () => {
    it('renders image when src is provided', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
      const img = screen.getByAltText('User Avatar');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('applies correct classes to image', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
      const img = screen.getByAltText('User Avatar');
      expect(img).toHaveClass('inline-block', 'rounded-full', 'object-cover');
    });

    it('renders as img element', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
      const img = screen.getByAltText('User Avatar');
      expect(img.tagName).toBe('IMG');
    });
  });

  describe('fallback behavior', () => {
    it('shows fallback when src is not provided', () => {
      render(<Avatar alt="John Doe" />);
      const fallback = screen.getByText('JO');
      expect(fallback).toBeInTheDocument();
    });

    it('shows fallback when image fails to load', () => {
      render(<Avatar src="https://invalid-url.com/image.jpg" alt="User Avatar" />);
      const img = screen.getByAltText('User Avatar');
      
      // Simulate image load error
      fireEvent.error(img);
      
      // Should show fallback after error
      const fallback = screen.getByText('US');
      expect(fallback).toBeInTheDocument();
    });

    it('uses first 2 characters of alt text for initials', () => {
      render(<Avatar alt="Mike Johnson" />);
      expect(screen.getByText('MI')).toBeInTheDocument();
    });

    it('converts initials to uppercase', () => {
      render(<Avatar alt="sarah williams" />);
      expect(screen.getByText('SA')).toBeInTheDocument();
    });

    it('renders fallback as div element', () => {
      render(<Avatar alt="John Doe" />);
      const fallback = screen.getByText('JO');
      expect(fallback.tagName).toBe('DIV');
    });

    it('applies correct fallback classes', () => {
      render(<Avatar alt="User" />);
      const fallback = screen.getByText('US');
      expect(fallback).toHaveClass(
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-gray-200',
        'text-gray-600',
        'font-medium'
      );
    });
  });

  describe('custom fallback', () => {
    it('uses custom fallback text when provided', () => {
      render(<Avatar alt="John Doe" fallback="JD" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('prefers custom fallback over alt-based initials', () => {
      render(<Avatar alt="Mike Johnson" fallback="MJ" />);
      expect(screen.getByText('MJ')).toBeInTheDocument();
      expect(screen.queryByText('MI')).not.toBeInTheDocument();
    });

    it('uses custom fallback when image fails to load', () => {
      render(
        <Avatar
          src="https://invalid-url.com/image.jpg"
          alt="User"
          fallback="XX"
        />
      );
      const img = screen.getByAltText('User');
      fireEvent.error(img);
      
      expect(screen.getByText('XX')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('renders medium size by default', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
      const img = screen.getByAltText('User');
      expect(img).toHaveClass('w-10', 'h-10');
    });

    it('renders small size correctly', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" size="sm" />);
      const img = screen.getByAltText('User');
      expect(img).toHaveClass('w-6', 'h-6');
    });

    it('renders medium size explicitly', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" size="md" />);
      const img = screen.getByAltText('User');
      expect(img).toHaveClass('w-10', 'h-10');
    });

    it('renders large size correctly', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" size="lg" />);
      const img = screen.getByAltText('User');
      expect(img).toHaveClass('w-16', 'h-16');
    });

    it('applies size classes to fallback', () => {
      render(<Avatar alt="User" size="sm" />);
      const fallback = screen.getByText('US');
      expect(fallback).toHaveClass('w-6', 'h-6', 'text-xs');
    });

    it('applies correct text size for each avatar size', () => {
      const { rerender } = render(<Avatar alt="User" size="sm" />);
      expect(screen.getByText('US')).toHaveClass('text-xs');

      rerender(<Avatar alt="User" size="md" />);
      expect(screen.getByText('US')).toHaveClass('text-sm');

      rerender(<Avatar alt="User" size="lg" />);
      expect(screen.getByText('US')).toHaveClass('text-base');
    });
  });

  describe('custom className', () => {
    it('applies custom className to image', () => {
      render(
        <Avatar
          src="https://example.com/avatar.jpg"
          alt="User"
          className="custom-class"
        />
      );
      const img = screen.getByAltText('User');
      expect(img).toHaveClass('inline-block', 'custom-class');
    });

    it('applies custom className to fallback', () => {
      render(<Avatar alt="User" className="custom-class" />);
      const fallback = screen.getByText('US');
      expect(fallback).toHaveClass('inline-flex', 'custom-class');
    });

    it('merges multiple custom classes', () => {
      render(<Avatar alt="User" className="border-2 border-blue-500" />);
      const fallback = screen.getByText('US');
      expect(fallback).toHaveClass('inline-flex', 'border-2', 'border-blue-500');
    });
  });

  describe('HTML attributes', () => {
    it('forwards HTML attributes to image element', () => {
      render(
        <Avatar
          src="https://example.com/avatar.jpg"
          alt="User"
          data-testid="custom-avatar"
          title="User Avatar"
        />
      );
      const img = screen.getByTestId('custom-avatar');
      expect(img).toHaveAttribute('title', 'User Avatar');
    });

    it('sets aria-label on fallback', () => {
      render(<Avatar alt="John Doe" />);
      const fallback = screen.getByText('JO');
      expect(fallback).toHaveAttribute('aria-label', 'John Doe');
    });

    it('handles loading attribute on image', () => {
      render(
        <Avatar
          src="https://example.com/avatar.jpg"
          alt="User"
          loading="lazy"
        />
      );
      const img = screen.getByAltText('User');
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('dark mode classes', () => {
    it('includes dark mode classes for fallback', () => {
      render(<Avatar alt="User" />);
      const fallback = screen.getByText('US');
      expect(fallback).toHaveClass('dark:bg-gray-700', 'dark:text-gray-300');
    });
  });

  describe('accessibility', () => {
    it('requires alt text', () => {
      // TypeScript should enforce this, but testing the rendered output
      render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
      const img = screen.getByAltText('User Avatar');
      expect(img).toHaveAttribute('alt', 'User Avatar');
    });

    it('provides aria-label for fallback', () => {
      render(<Avatar alt="Jane Smith" />);
      const fallback = screen.getByLabelText('Jane Smith');
      expect(fallback).toBeInTheDocument();
    });

    it('maintains alt text semantics when image fails', () => {
      render(<Avatar src="https://invalid-url.com/image.jpg" alt="User Name" />);
      const img = screen.getByAltText('User Name');
      fireEvent.error(img);
      
      const fallback = screen.getByLabelText('User Name');
      expect(fallback).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles empty alt text', () => {
      const { container } = render(<Avatar alt="" />);
      // Should still render fallback div even with empty text
      const fallback = container.querySelector('.inline-flex.items-center');
      expect(fallback).toBeInTheDocument();
    });

    it('handles single character alt text', () => {
      render(<Avatar alt="A" />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('handles very long alt text', () => {
      render(<Avatar alt="This is a very long name that should be truncated" />);
      // Should only show first 2 characters
      expect(screen.getByText('TH')).toBeInTheDocument();
    });

    it('handles special characters in alt text', () => {
      render(<Avatar alt="@John#123" />);
      expect(screen.getByText('@J')).toBeInTheDocument();
    });

    it('handles undefined src gracefully', () => {
      render(<Avatar src={undefined} alt="User" />);
      expect(screen.getByText('US')).toBeInTheDocument();
    });
  });

  describe('image error handling', () => {
    it('switches to fallback only after error event', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
      
      // Initially should show image
      expect(screen.getByAltText('User')).toBeInTheDocument();
      expect(screen.queryByText('US')).not.toBeInTheDocument();
      
      // Trigger error
      const img = screen.getByAltText('User');
      fireEvent.error(img);
      
      // Now should show fallback
      expect(screen.getByText('US')).toBeInTheDocument();
    });

    it('maintains error state after error occurs', () => {
      const { rerender } = render(
        <Avatar src="https://invalid-url.com/image.jpg" alt="User" />
      );
      
      const img = screen.getByAltText('User');
      fireEvent.error(img);
      
      // Should show fallback
      expect(screen.getByText('US')).toBeInTheDocument();
      
      // Rerender with same props
      rerender(<Avatar src="https://invalid-url.com/image.jpg" alt="User" />);
      
      // Should still show fallback
      expect(screen.getByText('US')).toBeInTheDocument();
    });
  });

  describe('combination of props', () => {
    it('handles size + className + src together', () => {
      render(
        <Avatar
          src="https://example.com/avatar.jpg"
          alt="User"
          size="lg"
          className="border-2 border-blue-500"
        />
      );
      const img = screen.getByAltText('User');
      expect(img).toHaveClass('w-16', 'h-16', 'border-2', 'border-blue-500');
    });

    it('handles size + className + fallback together', () => {
      render(
        <Avatar
          alt="User"
          fallback="AB"
          size="sm"
          className="bg-purple-200"
        />
      );
      const fallback = screen.getByText('AB');
      expect(fallback).toHaveClass('w-6', 'h-6', 'text-xs', 'bg-purple-200');
    });
  });
});

