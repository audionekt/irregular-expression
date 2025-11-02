import React from 'react';
import { render, screen } from '@testing-library/react';
import EditPostPage from '../[id]/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

// Mock aurigami components
jest.mock('aurigami', () => ({
  Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));

// Mock the use hook from React
jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    use: jest.fn((promise: any) => {
      // For our test, just return a mock id
      return { id: '123' };
    }),
  };
});

describe('Edit Post Page', () => {
  const mockParams = Promise.resolve({ id: '123' });

  it('renders the placeholder page', () => {
    render(<EditPostPage params={mockParams} />);
    
    expect(screen.getByText(/Edit Post #123/i)).toBeInTheDocument();
  });

  it('displays construction emoji', () => {
    render(<EditPostPage params={mockParams} />);
    
    expect(screen.getByText('🚧')).toBeInTheDocument();
  });

  it('shows coming soon message', () => {
    render(<EditPostPage params={mockParams} />);
    
    expect(screen.getByText(/Edit functionality coming soon/i)).toBeInTheDocument();
  });

  it('renders go back button', () => {
    render(<EditPostPage params={mockParams} />);
    
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });
});

