import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsPage from '../page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

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
    DRAFT: 'DRAFT',
    ARCHIVED: 'ARCHIVED',
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

describe('CMS Posts Page', () => {
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

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    useBlogPosts.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Failed to fetch posts' },
    });

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByText(/error loading posts/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch posts/i)).toBeInTheDocument();
  });

  it('renders empty state when no posts', () => {
    useBlogPosts.mockReturnValue({
      data: { content: [], totalElements: 0, totalPages: 0, number: 0 },
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
  });

  it('renders posts when data is loaded', () => {
    useBlogPosts.mockReturnValue({
      data: {
        content: [
          {
            id: 1,
            title: 'Test Post',
            excerpt: 'Test excerpt',
            status: 'PUBLISHED',
            featured: true,
            viewCount: 100,
            readingTimeMinutes: 5,
            author: {
              firstName: 'John',
              lastName: 'Doe',
              avatarUrl: 'https://example.com/avatar.jpg',
            },
            tags: [{ id: 1, name: 'Tech' }],
          },
        ],
        totalElements: 1,
        totalPages: 1,
        number: 0,
      },
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt')).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/100 views/i)).toBeInTheDocument();
    expect(screen.getByText(/5 min read/i)).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
  });

  it('displays stats correctly', () => {
    useBlogPosts.mockReturnValue({
      data: {
        content: [
          {
            id: 1,
            title: 'Post 1',
            status: 'PUBLISHED',
            featured: true,
            viewCount: 100,
            author: { firstName: 'John', lastName: 'Doe' },
            tags: [],
          },
          {
            id: 2,
            title: 'Post 2',
            status: 'DRAFT',
            featured: false,
            viewCount: 50,
            author: { firstName: 'Jane', lastName: 'Smith' },
            tags: [],
          },
        ],
        totalElements: 2,
        totalPages: 1,
        number: 0,
      },
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByText('Total Posts')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
    expect(screen.getByText('Drafts')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });
});
