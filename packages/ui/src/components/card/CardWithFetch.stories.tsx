import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { useEffect, useState } from 'react';
import { Card } from './Card';
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
      <Card className="max-w-2xl">
        <Typography variant="p">⏳ Loading... (Check console!)</Typography>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl">
        <Typography variant="p" className="text-red-600">
          ❌ Error: {error.message}
        </Typography>
      </Card>
    );
  }

  const post = data?.content?.[0];

  if (!post) {
    return (
      <Card className="max-w-2xl">
        <Typography variant="p">No posts found</Typography>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl">
      <div className="flex items-start justify-between mb-3">
        <Typography 
          variant="h2" 
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          {post.title}
        </Typography>
        {post.featured && (
          <Chip variant="featured" size="md" className="ml-2">
            Featured
          </Chip>
        )}
      </div>

      {post.excerpt && (
        <Typography variant="p" className="mb-4">
          {post.excerpt}
        </Typography>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar
            src={post.author?.avatarUrl}
            alt={`${post.author?.firstName} ${post.author?.lastName}`}
            size="sm"
          />
          <Typography variant="caption">
            {post.author?.firstName} {post.author?.lastName}
          </Typography>
        </div>

        <Typography variant="caption">•</Typography>
        <Typography variant="caption">{post.viewCount?.toLocaleString()} views</Typography>

        {post.readingTimeMinutes && (
          <>
            <Typography variant="caption">•</Typography>
            <Typography variant="caption">{post.readingTimeMinutes} min read</Typography>
          </>
        )}
      </div>

      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
        <Typography variant="caption" className="text-green-700 dark:text-green-400">
          ✅ This data was fetched from /api/blog-posts and mocked by MSW!
        </Typography>
      </div>
    </Card>
  );
}

// Story 1: Success - Uses default MSW handlers
export const FetchSuccess: Story = {
  render: () => (
    <div>
      <Typography variant="p" className="mb-4 text-center">
        Open DevTools Console to see MSW intercepting the API call! 👇
      </Typography>
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
    <div>
      <Typography variant="p" className="mb-4 text-center">
        MSW is returning a 500 error for this story! 👇
      </Typography>
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
    <div>
      <Typography variant="p" className="mb-4 text-center">
        MSW is returning an empty array! 👇
      </Typography>
      <BlogPostFetcher />
    </div>
  ),
};

