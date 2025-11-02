import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../page';

// Mock the aurigami components
jest.mock('aurigami', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Chip: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Avatar: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

// Mock the API hooks
jest.mock('@repo/api', () => ({
  useBlogPosts: jest.fn(),
  PostStatus: {
    PUBLISHED: 'PUBLISHED',
  },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('Blog Home Page', () => {
  const { useBlogPosts } = require('@repo/api');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    useBlogPosts.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    renderWithQueryClient(<Home />);
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    useBlogPosts.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Failed to fetch' },
    });

    renderWithQueryClient(<Home />);
    expect(screen.getByText(/error loading posts/i)).toBeInTheDocument();
  });

  it('renders blog posts when data is loaded', () => {
    useBlogPosts.mockReturnValue({
      data: {
        content: [
          {
            id: 1,
            title: 'Test Post',
            excerpt: 'Test excerpt',
            featured: false,
            viewCount: 100,
            readingTimeMinutes: 5,
            author: {
              firstName: 'John',
              lastName: 'Doe',
              avatarUrl: 'https://example.com/avatar.jpg',
            },
            tags: [],
          },
        ],
        totalElements: 1,
        totalPages: 1,
        number: 0,
      },
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<Home />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt')).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });
});

