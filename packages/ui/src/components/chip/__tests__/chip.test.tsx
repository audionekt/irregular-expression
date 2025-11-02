import React from 'react';
import { render, screen } from '@testing-library/react';
import { Chip } from '../chip';

describe('Chip', () => {
  it('renders as span element', () => {
    render(<Chip>Span element</Chip>);
    const chip = screen.getByText('Span element');
    expect(chip.tagName).toBe('SPAN');
  });

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
