import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { useEffect, useState } from 'react';
import { Card } from './card';
import { Typography } from '../typography';
import { Chip } from '../chip';
import { Avatar } from '../avatar';

const meta = {
  title: 'Examples/Data Fetching with MSW',
  component: Card,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component that actually fetches data
function BlogPostFetcher() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('🚀 Fetching from /api/blog-posts...');
    
    fetch('/api/blog-posts?page=0&size=1')
      .then((res) => {
        console.log('📦 Response received:', res.status, res.statusText);
        return res.json();
      })
      .then((json) => {
        console.log('✅ Data parsed:', json);
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Card style={{ maxWidth: '800px' }} variant="elevated">
        <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ height: '16px', width: '80px', backgroundColor: '#e7e5e4', borderRadius: '9999px' }}></div>
          </div>
          <div style={{ height: '32px', backgroundColor: '#e7e5e4', borderRadius: '4px', width: '75%', marginBottom: '16px' }}></div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ height: '16px', backgroundColor: '#e7e5e4', borderRadius: '4px', width: '100%', marginBottom: '8px' }}></div>
            <div style={{ height: '16px', backgroundColor: '#e7e5e4', borderRadius: '4px', width: '83%' }}></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #e7e5e4', marginBottom: '16px' }}>
            <div style={{ height: '40px', width: '40px', backgroundColor: '#e7e5e4', borderRadius: '50%' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ height: '16px', backgroundColor: '#e7e5e4', borderRadius: '4px', width: '128px', marginBottom: '8px' }}></div>
              <div style={{ height: '12px', backgroundColor: '#e7e5e4', borderRadius: '4px', width: '96px' }}></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ height: '24px', width: '80px', backgroundColor: '#e7e5e4', borderRadius: '9999px' }}></div>
            <div style={{ height: '24px', width: '96px', backgroundColor: '#e7e5e4', borderRadius: '9999px' }}></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={{ maxWidth: '800px' }} variant="outlined">
        <div style={{ padding: '24px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
          <Typography variant="h3" style={{ color: '#b91c1c', marginBottom: '8px' }}>
            ⚠️ Failed to Load
          </Typography>
          <Typography variant="p" style={{ color: '#dc2626' }}>
            {error.message}
          </Typography>
        </div>
      </Card>
    );
  }

  const post = data?.content?.[0];

  if (!post) {
    return (
      <Card style={{ maxWidth: '800px' }} variant="outlined">
        <div style={{ padding: '32px', textAlign: 'center' }}>
          <Typography variant="h3" style={{ marginBottom: '8px', color: '#716c66' }}>
            📭 No Posts Found
          </Typography>
          <Typography variant="p" style={{ color: '#a39e98' }}>
            There are no blog posts available at the moment.
          </Typography>
        </div>
      </Card>
    );
  }

  return (
    <Card style={{ maxWidth: '800px' }} variant="elevated">
      {/* Header: Avatar, Title and Featured Badge in one row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
        <Avatar
          src={post.author?.avatarUrl}
          alt={`${post.author?.firstName} ${post.author?.lastName}`}
          size="md"
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Typography 
            variant="h2" 
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
      {post.excerpt && (
        <Typography variant="p" style={{ marginBottom: '16px', color: '#716c66' }}>
          {post.excerpt}
        </Typography>
      )}

      {/* Author Name */}
      <Typography variant="p" style={{ fontWeight: 600, marginBottom: '8px' }}>
        {post.author?.firstName} {post.author?.lastName}
      </Typography>

      {/* Views and Reading Time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.875rem', color: '#716c66' }}>
        <span>{post.viewCount?.toLocaleString()} views</span>
        {post.readingTimeMinutes && (
          <>
            <span>•</span>
            <span>{post.readingTimeMinutes} min read</span>
          </>
        )}
      </div>

      {/* MSW Success Badge */}
      <div style={{ padding: '16px', backgroundColor: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.125rem' }}>✅</span>
          <Typography variant="p" style={{ color: '#047857', fontWeight: 500 }}>
            Data fetched from /api/blog-posts and mocked by MSW!
          </Typography>
        </div>
      </div>
    </Card>
  );
}

// Story 1: Success - Uses default MSW handlers
export const FetchSuccess: Story = {
  render: () => (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
        <Typography variant="p" style={{ color: '#1e40af' }}>
          💡 <strong>Tip:</strong> Open DevTools Console to see MSW intercepting the API call in real-time!
        </Typography>
      </div>
      <BlogPostFetcher />
    </div>
  ),
};

// Story 2: Custom Data - Override MSW handler
export const FetchCustomData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/blog-posts', () => {
          console.log('🎭 MSW: Custom handler intercepted the request!');
          return HttpResponse.json({
            content: [{
              id: 999,
              title: '🎉 Custom MSW Data!',
              excerpt: 'This response was customized just for this story using MSW!',
              featured: true,
              viewCount: 99999,
              readingTimeMinutes: 42,
              author: {
                firstName: 'MSW',
                lastName: 'Handler',
                avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MSW',
              },
              tags: [],
            }],
            totalElements: 1,
            totalPages: 1,
            number: 0,
            size: 1,
          });
        }),
      ],
    },
  },
  render: FetchSuccess.render,
};

// Story 3: Slow Network - Delay response
export const FetchWithDelay: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/blog-posts', async () => {
          console.log('🐌 MSW: Simulating slow network (2 second delay)...');
          await delay(2000);
          console.log('✅ MSW: Delayed response sent!');
          return HttpResponse.json({
            content: [{
              id: 1,
              title: 'Slow Network Response',
              excerpt: 'This response was delayed by 2 seconds using MSW!',
              featured: false,
              viewCount: 100,
              readingTimeMinutes: 5,
              author: {
                firstName: 'Delayed',
                lastName: 'Response',
                avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Slow',
              },
              tags: [],
            }],
            totalElements: 1,
            totalPages: 1,
            number: 0,
            size: 1,
          });
        }),
      ],
    },
  },
  render: FetchSuccess.render,
};

// Story 4: Error State - Return 500
export const FetchError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/blog-posts', () => {
          console.log('💥 MSW: Simulating server error (500)...');
          return HttpResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
          );
        }),
      ],
    },
  },
  render: () => (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
        <Typography variant="p" style={{ color: '#991b1b' }}>
          ⚠️ <strong>Simulated Error:</strong> MSW is returning a 500 error for this story!
        </Typography>
      </div>
      <BlogPostFetcher />
    </div>
  ),
};

// Story 5: Empty Response
export const FetchEmpty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/blog-posts', () => {
          console.log('📭 MSW: Returning empty array...');
          return HttpResponse.json({
            content: [],
            totalElements: 0,
            totalPages: 0,
            number: 0,
            size: 10,
          });
        }),
      ],
    },
  },
  render: () => (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f5f5f4', borderRadius: '8px', border: '1px solid #e7e5e4' }}>
        <Typography variant="p" style={{ color: '#3f3b37' }}>
          📭 <strong>Empty State:</strong> MSW is returning an empty array to simulate no content!
        </Typography>
      </div>
      <BlogPostFetcher />
    </div>
  ),
};

