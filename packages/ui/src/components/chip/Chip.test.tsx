import React from 'react';
import { render, screen } from '@testing-library/react';
import { Chip } from './Chip';

describe('Chip', () => {
  describe('variants', () => {
    it('renders default variant correctly', () => {
      render(<Chip>Default chip</Chip>);
      const chip = screen.getByText('Default chip');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('bg-gray-100', 'text-gray-700');
    });

    it('renders featured variant correctly', () => {
      render(<Chip variant="featured">Featured chip</Chip>);
      const chip = screen.getByText('Featured chip');
      expect(chip).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    it('renders outlined variant correctly', () => {
      render(<Chip variant="outlined">Outlined chip</Chip>);
      const chip = screen.getByText('Outlined chip');
      expect(chip).toHaveClass('border', 'border-gray-300', 'text-gray-700');
    });
  });

  describe('sizes', () => {
    it('renders small size by default', () => {
      render(<Chip>Small chip</Chip>);
      const chip = screen.getByText('Small chip');
      expect(chip).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('renders small size explicitly', () => {
      render(<Chip size="sm">Explicit small</Chip>);
      const chip = screen.getByText('Explicit small');
      expect(chip).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('renders medium size correctly', () => {
      render(<Chip size="md">Medium chip</Chip>);
      const chip = screen.getByText('Medium chip');
      expect(chip).toHaveClass('px-2', 'py-1', 'text-sm');
    });
  });

  describe('base styles', () => {
    it('always renders as span element', () => {
      render(<Chip>Span element</Chip>);
      const chip = screen.getByText('Span element');
      expect(chip.tagName).toBe('SPAN');
    });

    it('always includes inline-flex', () => {
      render(<Chip>Inline flex</Chip>);
      const chip = screen.getByText('Inline flex');
      expect(chip).toHaveClass('inline-flex', 'items-center');
    });

    it('always includes font-medium', () => {
      render(<Chip>Font medium</Chip>);
      const chip = screen.getByText('Font medium');
      expect(chip).toHaveClass('font-medium');
    });

    it('always includes rounded corners', () => {
      render(<Chip>Rounded</Chip>);
      const chip = screen.getByText('Rounded');
      expect(chip).toHaveClass('rounded');
    });
  });

  describe('custom className', () => {
    it('applies custom className alongside default classes', () => {
      render(<Chip className="custom-class">Custom styled</Chip>);
      const chip = screen.getByText('Custom styled');
      expect(chip).toHaveClass('inline-flex', 'custom-class');
    });

    it('merges multiple custom classes', () => {
      render(<Chip className="ml-2 uppercase">Multiple classes</Chip>);
      const chip = screen.getByText('Multiple classes');
      expect(chip).toHaveClass('inline-flex', 'ml-2', 'uppercase');
    });

    it('allows custom color classes', () => {
      render(
        <Chip className="bg-purple-100 text-purple-800">
          Custom colors
        </Chip>
      );
      const chip = screen.getByText('Custom colors');
      expect(chip).toHaveClass('bg-purple-100', 'text-purple-800');
    });
  });

  describe('HTML attributes', () => {
    it('forwards HTML attributes to the element', () => {
      render(
        <Chip data-testid="custom-chip" aria-label="Test chip">
          With attributes
        </Chip>
      );
      const chip = screen.getByTestId('custom-chip');
      expect(chip).toHaveAttribute('aria-label', 'Test chip');
    });

    it('handles onClick events', () => {
      const handleClick = jest.fn();
      render(<Chip onClick={handleClick}>Clickable chip</Chip>);
      const chip = screen.getByText('Clickable chip');
      chip.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles id attribute', () => {
      render(<Chip id="unique-chip">Chip with ID</Chip>);
      const chip = document.getElementById('unique-chip');
      expect(chip).toBeInTheDocument();
    });

    it('supports role attribute for accessibility', () => {
      render(<Chip role="button">Button chip</Chip>);
      const chip = screen.getByRole('button');
      expect(chip).toBeInTheDocument();
    });
  });

  describe('children', () => {
    it('renders text children', () => {
      render(<Chip>Tag text</Chip>);
      expect(screen.getByText('Tag text')).toBeInTheDocument();
    });

    it('renders with icon and text', () => {
      render(
        <Chip>
          <span>Icon</span> Text
        </Chip>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText(/Text/)).toBeInTheDocument();
    });

    it('renders emoji content', () => {
      render(<Chip>🎉 Party</Chip>);
      expect(screen.getByText('🎉 Party')).toBeInTheDocument();
    });
  });

  describe('dark mode classes', () => {
    it('includes dark mode classes for default variant', () => {
      render(<Chip>Dark default</Chip>);
      const chip = screen.getByText('Dark default');
      expect(chip).toHaveClass('dark:bg-gray-800', 'dark:text-gray-300');
    });

    it('includes dark mode classes for featured variant', () => {
      render(<Chip variant="featured">Dark featured</Chip>);
      const chip = screen.getByText('Dark featured');
      expect(chip).toHaveClass('dark:bg-yellow-900/30', 'dark:text-yellow-300');
    });

    it('includes dark mode classes for outlined variant', () => {
      render(<Chip variant="outlined">Dark outlined</Chip>);
      const chip = screen.getByText('Dark outlined');
      expect(chip).toHaveClass('dark:border-gray-700', 'dark:text-gray-300');
    });
  });

  describe('combination of props', () => {
    it('handles variant + size + className together', () => {
      render(
        <Chip variant="featured" size="md" className="custom">
          Combined props
        </Chip>
      );
      const chip = screen.getByText('Combined props');
      expect(chip).toHaveClass('bg-yellow-100', 'py-1', 'text-sm', 'custom');
    });

    it('handles all variants with small size', () => {
      const { rerender } = render(<Chip size="sm">Default</Chip>);
      expect(screen.getByText('Default')).toHaveClass('text-xs');

      rerender(<Chip variant="featured" size="sm">Featured</Chip>);
      expect(screen.getByText('Featured')).toHaveClass('text-xs');

      rerender(<Chip variant="outlined" size="sm">Outlined</Chip>);
      expect(screen.getByText('Outlined')).toHaveClass('text-xs');
    });
  });

  describe('use cases', () => {
    it('works as a tag label', () => {
      render(<Chip>React</Chip>);
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('works as a status indicator', () => {
      render(<Chip variant="featured">New</Chip>);
      const chip = screen.getByText('New');
      expect(chip).toHaveClass('bg-yellow-100');
    });

    it('works as a category badge', () => {
      render(<Chip variant="outlined">Category</Chip>);
      const chip = screen.getByText('Category');
      expect(chip).toHaveClass('border');
    });

    it('works in a list of tags', () => {
      render(
        <div>
          <Chip>Tag 1</Chip>
          <Chip>Tag 2</Chip>
          <Chip>Tag 3</Chip>
        </div>
      );
      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 3')).toBeInTheDocument();
    });
  });
});

