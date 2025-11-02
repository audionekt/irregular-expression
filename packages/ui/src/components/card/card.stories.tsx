import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { Card } from './card';
import { Typography } from '../typography';
import { Chip } from '../chip';
import { Avatar } from '../avatar';
import type { BlogPostResponse } from '@repo/api';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple card examples
export const Default: Story = {
  render: () => (
    <Card>
      <Typography variant="h2" className="mb-2">
        Card Title
      </Typography>
      <Typography variant="p">
        This is a default card with some content inside it.
      </Typography>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <Typography variant="h2" className="mb-2">
        Elevated Card
      </Typography>
      <Typography variant="p">
        This card has a shadow effect for emphasis.
      </Typography>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined">
      <Typography variant="h2" className="mb-2">
        Outlined Card
      </Typography>
      <Typography variant="p">
        This card has a thicker border.
      </Typography>
    </Card>
  ),
};

export const NoHover: Story = {
  render: () => (
    <Card hover={false}>
      <Typography variant="h2" className="mb-2">
        Static Card
      </Typography>
      <Typography variant="p">
        This card doesn't change on hover.
      </Typography>
    </Card>
  ),
};

// Blog post card example using MSW data
const mockPost: BlogPostResponse = {
  id: 1,
  title: 'Getting Started with Mock Service Worker',
  slug: 'getting-started-msw',
  excerpt: 'Learn how to use MSW to mock API responses in your Storybook stories.',
  content: '# Getting Started\n\nMSW is amazing!',
  status: 'PUBLISHED',
  featured: true,
  viewCount: 1520,
  readingTimeMinutes: 7,
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  author: {
    id: 1,
    username: 'mjohnson',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
  },
  tags: [
    { id: 1, name: 'Architecture', slug: 'architecture', color: '#3B82F6' },
    { id: 2, name: 'Web Development', slug: 'web-dev', color: '#10B981' },
    { id: 3, name: 'Performance', slug: 'performance', color: '#F59E0B' },
  ],
  media: [],
};

export const BlogPostCard: Story = {
  render: () => (
    <Card className="max-w-2xl">
      <div className="flex items-start justify-between mb-3">
        <Typography 
          variant="h2" 
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          {mockPost.title}
        </Typography>
        {mockPost.featured && (
          <Chip variant="featured" size="md" className="ml-2">
            Featured
          </Chip>
        )}
      </div>

      {mockPost.excerpt && (
        <Typography variant="p" className="mb-4">
          {mockPost.excerpt}
        </Typography>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar
            src={mockPost.author.avatarUrl}
            alt={`${mockPost.author.firstName} ${mockPost.author.lastName}`}
            size="sm"
          />
          <Typography variant="caption">
            {mockPost.author.firstName} {mockPost.author.lastName}
          </Typography>
        </div>

        <Typography variant="caption">•</Typography>
        <Typography variant="caption">{mockPost.viewCount.toLocaleString()} views</Typography>

        {mockPost.readingTimeMinutes && (
          <>
            <Typography variant="caption">•</Typography>
            <Typography variant="caption">{mockPost.readingTimeMinutes} min read</Typography>
          </>
        )}

        {mockPost.tags.length > 0 && (
          <>
            <Typography variant="caption">•</Typography>
            <div className="flex gap-2">
              {mockPost.tags.map((tag) => (
                <Chip key={tag.id}>
                  {tag.name}
                </Chip>
              ))}
            </div>
          </>
        )}
      </div>
    </Card>
  ),
};

// Example: Override MSW handlers per story
export const BlogPostCardWithCustomData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/blog-posts/1', async () => {
          return HttpResponse.json({
            ...mockPost,
            title: 'Custom Story Title',
            excerpt: 'This story uses custom MSW handlers to override the default API response.',
            featured: false,
            tags: [
              { id: 99, name: 'Custom Tag', slug: 'custom', color: '#EC4899' },
            ],
          });
        }),
      ],
    },
  },
  render: BlogPostCard.render,
};

// Example: Simulate loading state
export const BlogPostCardLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/blog-posts/*', async () => {
          await delay('infinite'); // This simulates a loading state
          return HttpResponse.json(mockPost);
        }),
      ],
    },
  },
  render: () => (
    <Card className="max-w-2xl">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-5/6"></div>
        <div className="flex gap-4">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </Card>
  ),
};

// Example: Simulate error state
export const BlogPostCardError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/blog-posts/*', async () => {
          return HttpResponse.json(
            { message: 'Failed to fetch blog post' },
            { status: 500 }
          );
        }),
      ],
    },
  },
  render: () => (
    <Card className="max-w-2xl">
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <Typography variant="p" className="text-red-600 dark:text-red-400">
          ⚠️ Failed to load blog post. Please try again later.
        </Typography>
      </div>
    </Card>
  ),
};

