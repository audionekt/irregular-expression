import React from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  describe('variants', () => {
    it('renders h1 variant correctly', () => {
      render(<Typography variant="h1">Heading 1</Typography>);
      const element = screen.getByText('Heading 1');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('H1');
      expect(element).toHaveClass('text-4xl', 'font-bold');
    });

    it('renders h2 variant correctly', () => {
      render(<Typography variant="h2">Heading 2</Typography>);
      const element = screen.getByText('Heading 2');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('H2');
      expect(element).toHaveClass('text-2xl', 'font-semibold');
    });

    it('renders h3 variant correctly', () => {
      render(<Typography variant="h3">Heading 3</Typography>);
      const element = screen.getByText('Heading 3');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('H3');
      expect(element).toHaveClass('text-xl', 'font-semibold');
    });

    it('renders h4 variant correctly', () => {
      render(<Typography variant="h4">Heading 4</Typography>);
      const element = screen.getByText('Heading 4');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('H4');
      expect(element).toHaveClass('text-lg', 'font-medium');
    });

    it('renders p variant correctly', () => {
      render(<Typography variant="p">Paragraph text</Typography>);
      const element = screen.getByText('Paragraph text');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('P');
      expect(element).toHaveClass('text-base');
    });

    it('renders caption variant correctly', () => {
      render(<Typography variant="caption">Caption text</Typography>);
      const element = screen.getByText('Caption text');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('SPAN');
      expect(element).toHaveClass('text-sm');
    });

    it('renders p variant by default', () => {
      render(<Typography>Default text</Typography>);
      const element = screen.getByText('Default text');
      expect(element.tagName).toBe('P');
    });
  });

  describe('custom element (as prop)', () => {
    it('renders as custom element when as prop is provided', () => {
      render(<Typography variant="p" as="div">Custom element</Typography>);
      const element = screen.getByText('Custom element');
      expect(element.tagName).toBe('DIV');
      expect(element).toHaveClass('text-base');
    });

    it('overrides default element for variant', () => {
      render(<Typography variant="h1" as="span">Span heading</Typography>);
      const element = screen.getByText('Span heading');
      expect(element.tagName).toBe('SPAN');
      expect(element).toHaveClass('text-4xl');
    });
  });

  describe('custom className', () => {
    it('applies custom className alongside default classes', () => {
      render(<Typography variant="h2" className="custom-class">Custom styled</Typography>);
      const element = screen.getByText('Custom styled');
      expect(element).toHaveClass('text-2xl', 'font-semibold', 'custom-class');
    });

    it('merges multiple custom classes', () => {
      render(
        <Typography variant="p" className="text-red-500 underline">
          Multiple classes
        </Typography>
      );
      const element = screen.getByText('Multiple classes');
      expect(element).toHaveClass('text-base', 'text-red-500', 'underline');
    });
  });

  describe('HTML attributes', () => {
    it('forwards HTML attributes to the element', () => {
      render(
        <Typography variant="p" data-testid="custom-id" aria-label="Test label">
          With attributes
        </Typography>
      );
      const element = screen.getByTestId('custom-id');
      expect(element).toHaveAttribute('aria-label', 'Test label');
    });

    it('handles onClick events', () => {
      const handleClick = jest.fn();
      render(<Typography variant="h2" onClick={handleClick}>Clickable</Typography>);
      const element = screen.getByText('Clickable');
      element.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('children', () => {
    it('renders text children', () => {
      render(<Typography variant="p">Simple text</Typography>);
      expect(screen.getByText('Simple text')).toBeInTheDocument();
    });

    it('renders React element children', () => {
      render(
        <Typography variant="p">
          Text with <strong>bold</strong> content
        </Typography>
      );
      expect(screen.getByText(/Text with/)).toBeInTheDocument();
      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('bold').tagName).toBe('STRONG');
    });

    it('renders multiple children', () => {
      render(
        <Typography variant="p">
          First <span>Second</span> Third
        </Typography>
      );
      expect(screen.getByText(/First/)).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText(/Third/)).toBeInTheDocument();
    });
  });

  describe('dark mode classes', () => {
    it('includes dark mode classes for headings', () => {
      render(<Typography variant="h1">Dark heading</Typography>);
      const element = screen.getByText('Dark heading');
      expect(element).toHaveClass('dark:text-white');
    });

    it('includes dark mode classes for paragraphs', () => {
      render(<Typography variant="p">Dark paragraph</Typography>);
      const element = screen.getByText('Dark paragraph');
      expect(element).toHaveClass('dark:text-gray-400');
    });

    it('includes dark mode classes for captions', () => {
      render(<Typography variant="caption">Dark caption</Typography>);
      const element = screen.getByText('Dark caption');
      expect(element).toHaveClass('dark:text-gray-500');
    });
  });
});

