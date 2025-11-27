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
      <Typography variant="h2" style={{ marginBottom: '8px' }}>
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
      <Typography variant="h2" style={{ marginBottom: '8px' }}>
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
      <Typography variant="h2" style={{ marginBottom: '8px' }}>
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
      <Typography variant="h2" style={{ marginBottom: '8px' }}>
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
    <Card style={{ maxWidth: '800px' }} variant="elevated">
      {/* Header: Avatar, Title and Featured Badge in one row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
        <Avatar
          src={mockPost.author.avatarUrl}
          alt={`${mockPost.author.firstName} ${mockPost.author.lastName}`}
          size="md"
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Typography 
            variant="h2" 
            style={{ cursor: 'pointer' }}
          >
            {mockPost.title}
          </Typography>
        </div>
        {mockPost.featured && (
          <Chip color="gold" size="sm">
            Featured
          </Chip>
        )}
      </div>

      {/* Excerpt */}
      {mockPost.excerpt && (
        <Typography variant="p" style={{ marginBottom: '16px', color: '#716c66' }}>
          {mockPost.excerpt}
        </Typography>
      )}

      {/* Author Name */}
      <Typography variant="p" style={{ fontWeight: 600, marginBottom: '8px' }}>
        {mockPost.author.firstName} {mockPost.author.lastName}
      </Typography>

      {/* Views and Reading Time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.875rem', color: '#716c66' }}>
        <span>{mockPost.viewCount.toLocaleString()} views</span>
        {mockPost.readingTimeMinutes && (
          <>
            <span>•</span>
            <span>{mockPost.readingTimeMinutes} min read</span>
          </>
        )}
      </div>

      {/* Tags */}
      {mockPost.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {mockPost.tags.map((tag) => (
            <Chip key={tag.id} size="sm" color="charcoal">
              {tag.name}
            </Chip>
          ))}
        </div>
      )}
    </Card>
  ),
};

// Example: Override MSW handlers per story
export const BlogPostCardWithCustomData: Story = {
  render: () => {
    const customPost = {
      ...mockPost,
      title: 'Custom Story Title',
      excerpt: 'This story demonstrates how you can customize the card content with different data.',
      featured: false,
      tags: [
        { id: 99, name: 'Custom Tag', slug: 'custom', color: '#EC4899' },
      ],
    };

    return (
      <Card style={{ maxWidth: '800px' }} variant="elevated">
        {/* Header: Avatar, Title and Featured Badge in one row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
          <Avatar
            src={customPost.author.avatarUrl}
            alt={`${customPost.author.firstName} ${customPost.author.lastName}`}
            size="md"
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="h2" 
              style={{ cursor: 'pointer' }}
            >
              {customPost.title}
            </Typography>
          </div>
          {customPost.featured && (
            <Chip color="gold" size="sm">
              Featured
            </Chip>
          )}
        </div>

        {/* Excerpt */}
        {customPost.excerpt && (
          <Typography variant="p" style={{ marginBottom: '16px', color: '#716c66' }}>
            {customPost.excerpt}
          </Typography>
        )}

        {/* Author Name */}
        <Typography variant="p" style={{ fontWeight: 600, marginBottom: '8px' }}>
          {customPost.author.firstName} {customPost.author.lastName}
        </Typography>

        {/* Views and Reading Time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.875rem', color: '#716c66' }}>
          <span>{customPost.viewCount.toLocaleString()} views</span>
          {customPost.readingTimeMinutes && (
            <>
              <span>•</span>
              <span>{customPost.readingTimeMinutes} min read</span>
            </>
          )}
        </div>

        {/* Tags */}
        {customPost.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {customPost.tags.map((tag) => (
              <Chip key={tag.id} size="sm" color="ruby">
                {tag.name}
              </Chip>
            ))}
          </div>
        )}
      </Card>
    );
  },
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
    <Card style={{ maxWidth: '800px' }}>
      <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
        <div style={{ height: '24px', backgroundColor: '#e7e5e4', borderRadius: '4px', marginBottom: '12px', width: '75%' }}></div>
        <div style={{ height: '16px', backgroundColor: '#e7e5e4', borderRadius: '4px', marginBottom: '8px', width: '100%' }}></div>
        <div style={{ height: '16px', backgroundColor: '#e7e5e4', borderRadius: '4px', marginBottom: '16px', width: '83%' }}></div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ height: '24px', width: '24px', backgroundColor: '#e7e5e4', borderRadius: '50%' }}></div>
          <div style={{ height: '16px', backgroundColor: '#e7e5e4', borderRadius: '4px', width: '96px' }}></div>
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
    <Card style={{ maxWidth: '800px' }}>
      <div style={{ padding: '16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
        <Typography variant="p" style={{ color: '#dc2626' }}>
          ⚠️ Failed to load blog post. Please try again later.
        </Typography>
      </div>
    </Card>
  ),
};

// Gallery view with multiple cards
export const BlogPostGallery: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => {
    const posts = [
      {
        ...mockPost,
        id: 1,
        title: 'Getting Started with Mock Service Worker',
        featured: true,
        tags: [
          { id: 1, name: 'Architecture', slug: 'architecture', color: '#3B82F6' },
          { id: 2, name: 'Web Development', slug: 'web-dev', color: '#10B981' },
        ],
      },
      {
        ...mockPost,
        id: 2,
        title: 'Building Modern React Applications',
        featured: false,
        viewCount: 2340,
        readingTimeMinutes: 12,
        author: {
          ...mockPost.author,
          firstName: 'Sarah',
          lastName: 'Chen',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        tags: [
          { id: 4, name: 'React', slug: 'react', color: '#61DAFB' },
          { id: 5, name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
        ],
      },
      {
        ...mockPost,
        id: 3,
        title: 'Design Systems at Scale',
        featured: false,
        viewCount: 890,
        readingTimeMinutes: 9,
        author: {
          ...mockPost.author,
          firstName: 'Alex',
          lastName: 'Rivera',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        },
        tags: [
          { id: 6, name: 'Design', slug: 'design', color: '#EC4899' },
          { id: 7, name: 'UI/UX', slug: 'uiux', color: '#8B5CF6' },
        ],
      },
    ];

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <Typography variant="h1" style={{ marginBottom: '8px' }}>
            Latest Blog Posts
          </Typography>
          <Typography variant="p" style={{ color: '#716c66' }}>
            Explore our collection of articles on web development, design, and architecture.
          </Typography>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {posts.map((post) => (
            <Card key={post.id} variant="elevated">
              {/* Header: Avatar, Title and Featured Badge in one row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                <Avatar
                  src={post.author.avatarUrl}
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                  size="md"
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="h3" 
                    style={{ cursor: 'pointer' }}
                  >
                    {post.title}
                  </Typography>
                </div>
                {post.featured && (
                  <Chip color="gold" size="sm">
                    Featured
                  </Chip>
                )}
              </div>

              {/* Excerpt */}
              <Typography 
                variant="p" 
                style={{ 
                  marginBottom: '16px', 
                  color: '#716c66',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {post.excerpt}
              </Typography>

              {/* Author Name */}
              <Typography variant="p" style={{ fontWeight: 600, marginBottom: '8px' }}>
                {post.author.firstName} {post.author.lastName}
              </Typography>

              {/* Views and Reading Time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.875rem', color: '#716c66' }}>
                <span>{post.viewCount.toLocaleString()} views</span>
                <span>•</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {post.tags.slice(0, 2).map((tag) => (
                  <Chip key={tag.id} size="sm" color="charcoal">
                    {tag.name}
                  </Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

