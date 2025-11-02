import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  describe('variants', () => {
    it('renders default variant correctly', () => {
      const { container } = render(<Card>Default card</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('bg-white', 'border', 'border-gray-200');
    });

    it('renders elevated variant correctly', () => {
      const { container } = render(<Card variant="elevated">Elevated card</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('bg-white', 'shadow-lg');
      expect(card).not.toHaveClass('border');
    });

    it('renders outlined variant correctly', () => {
      const { container } = render(<Card variant="outlined">Outlined card</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('border-2', 'border-gray-200');
    });
  });

  describe('hover behavior', () => {
    it('applies hover classes by default', () => {
      const { container } = render(<Card>Hoverable card</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('hover:border-gray-300');
    });

    it('does not apply hover classes when hover is false', () => {
      const { container } = render(<Card hover={false}>Non-hoverable card</Card>);
      const card = container.firstChild;
      expect(card).not.toHaveClass('hover:border-gray-300');
    });

    it('applies hover classes when hover is explicitly true', () => {
      const { container } = render(<Card hover={true}>Explicitly hoverable</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('hover:border-gray-300');
    });
  });

  describe('custom element (as prop)', () => {
    it('renders as article by default', () => {
      const { container } = render(<Card>Article card</Card>);
      const card = container.firstChild;
      expect(card?.nodeName).toBe('ARTICLE');
    });

    it('renders as custom element when as prop is provided', () => {
      const { container } = render(<Card as="div">Div card</Card>);
      const card = container.firstChild;
      expect(card?.nodeName).toBe('DIV');
    });

    it('renders as section', () => {
      const { container } = render(<Card as="section">Section card</Card>);
      const card = container.firstChild;
      expect(card?.nodeName).toBe('SECTION');
    });
  });

  describe('custom className', () => {
    it('applies custom className alongside default classes', () => {
      const { container } = render(<Card className="custom-class">Custom styled</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('p-6', 'rounded-lg', 'custom-class');
    });

    it('merges multiple custom classes', () => {
      const { container } = render(<Card className="max-w-2xl mx-auto">Multiple classes</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('p-6', 'max-w-2xl', 'mx-auto');
    });
  });

  describe('HTML attributes', () => {
    it('forwards HTML attributes to the element', () => {
      render(
        <Card data-testid="custom-card" aria-label="Test card">
          With attributes
        </Card>
      );
      const card = screen.getByTestId('custom-card');
      expect(card).toHaveAttribute('aria-label', 'Test card');
    });

    it('handles onClick events', () => {
      const handleClick = jest.fn();
      const { container } = render(<Card onClick={handleClick}>Clickable card</Card>);
      const card = container.firstChild as HTMLElement;
      card?.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles id attribute', () => {
      render(<Card id="unique-card">Card with ID</Card>);
      const card = document.getElementById('unique-card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('children', () => {
    it('renders text children', () => {
      render(<Card>Simple text content</Card>);
      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('renders React element children', () => {
      render(
        <Card>
          <h2>Title</h2>
          <p>Content</p>
        </Card>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders complex nested children', () => {
      render(
        <Card>
          <div>
            <h3>Heading</h3>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </Card>
      );
      expect(screen.getByText('Heading')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  describe('dark mode classes', () => {
    it('includes dark mode classes for default variant', () => {
      const { container } = render(<Card>Dark default</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('dark:bg-gray-900', 'dark:border-gray-800');
    });

    it('includes dark mode classes for elevated variant', () => {
      const { container } = render(<Card variant="elevated">Dark elevated</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('dark:bg-gray-900');
    });

    it('includes dark mode hover classes', () => {
      const { container } = render(<Card>Dark hover</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('dark:hover:border-gray-700');
    });
  });

  describe('base styles', () => {
    it('always includes padding', () => {
      const { container } = render(<Card>Padded</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('p-6');
    });

    it('always includes rounded corners', () => {
      const { container } = render(<Card>Rounded</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-lg');
    });

    it('always includes transition', () => {
      const { container } = render(<Card>Transition</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('transition-colors');
    });
  });

  describe('combination of props', () => {
    it('handles variant + hover + className + as together', () => {
      const { container } = render(
        <Card variant="outlined" hover={false} className="custom" as="section">
          Combined props
        </Card>
      );
      const card = container.firstChild;
      expect(card?.nodeName).toBe('SECTION');
      expect(card).toHaveClass('border-2', 'custom');
      expect(card).not.toHaveClass('hover:border-gray-300');
    });
  });
});

