import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock the @repo/ui Button component to avoid Next.js font issues in tests
jest.mock('@repo/ui', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe('Blog Home Page', () => {
  it('renders the blog page button', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /blog page/i })).toBeInTheDocument();
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

