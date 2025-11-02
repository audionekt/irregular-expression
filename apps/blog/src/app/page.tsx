'use client';

import { Button, Typography, Card, Chip, Avatar } from "aurigami";
import { useBlogPosts, PostStatus } from "@repo/api";

export default function Home() {
  const { data, isLoading, error } = useBlogPosts({
    status: PostStatus.PUBLISHED,
    page: 0,
    size: 10,
  });

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <Typography variant="h1" className="mb-2">
            Blog Posts
          </Typography>
          <Typography variant="p">
            Exploring web development, design, and technology
          </Typography>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Typography variant="caption">
              Loading posts...
            </Typography>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <Typography variant="p" className="text-red-600 dark:text-red-400">
              Error loading posts: {error.message}
            </Typography>
          </div>
        )}

        {data && (
          <>
            <div className="flex flex-col gap-6 w-full">
              {data.content.map((post) => (
                <Card key={post.id}>
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
                        src={post.author.avatarUrl}
                        alt={`${post.author.firstName} ${post.author.lastName}`}
                        size="sm"
                      />
                      <Typography variant="caption">
                        {post.author.firstName} {post.author.lastName}
                      </Typography>
                    </div>

                    <Typography variant="caption">•</Typography>
                    <Typography variant="caption">{post.viewCount.toLocaleString()} views</Typography>

                    {post.readingTimeMinutes && (
                      <>
                        <Typography variant="caption">•</Typography>
                        <Typography variant="caption">{post.readingTimeMinutes} min read</Typography>
                      </>
                    )}

                    {post.tags.length > 0 && (
                      <>
                        <Typography variant="caption">•</Typography>
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <Chip key={tag.id}>
                              {tag.name}
                            </Chip>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination Info */}
            <div className="flex items-center justify-between w-full pt-4 border-t border-gray-200 dark:border-gray-800">
              <Typography variant="caption">
                Showing {data.content.length} of {data.totalElements} posts
                {data.totalPages > 1 && ` • Page ${data.number + 1} of ${data.totalPages}`}
              </Typography>
              <Button>View All Posts</Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
