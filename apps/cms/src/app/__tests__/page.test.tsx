import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock the aurigami Button component to avoid Next.js font issues in tests
jest.mock('aurigami', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe('CMS Home Page', () => {
  it('renders the cms dashboard button', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /cms dashboard/i })).toBeInTheDocument();
  });

  it('renders the main container', () => {
    const { container } = render(<Home />);
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('has proper layout classes', () => {
    const { container } = render(<Home />);
    const mainDiv = container.querySelector('.flex.min-h-screen');
    expect(mainDiv).toBeInTheDocument();
  });
});

