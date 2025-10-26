import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppLayout } from './AppLayout';

// Mock Next.js font imports since they require Next.js environment
jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans-mock',
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono-mock',
  }),
}));

// Suppress expected console errors from rendering <html> in test environment
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('In HTML, <html> cannot be a child of <div>')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('AppLayout', () => {
  it('renders children correctly', () => {
    render(
      <AppLayout>
        <div data-testid="child-content">Test Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <AppLayout>
        <div data-testid="child-1">First Child</div>
        <div data-testid="child-2">Second Child</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('renders complex nested children', () => {
    render(
      <AppLayout>
        <main>
          <header data-testid="header">Header</header>
          <section data-testid="content">Content</section>
          <footer data-testid="footer">Footer</footer>
        </main>
      </AppLayout>
    );
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('preserves child component props and structure', () => {
    const TestComponent = ({ title }: { title: string }) => (
      <div data-testid="test-component">{title}</div>
    );

    render(
      <AppLayout>
        <TestComponent title="Hello World" />
      </AppLayout>
    );
    
    expect(screen.getByTestId('test-component')).toHaveTextContent('Hello World');
  });
});

