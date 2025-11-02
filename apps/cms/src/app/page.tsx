'use client';

import { Typography, Button, Card, Chip, Avatar } from "aurigami";
import { useBlogPosts, PostStatus } from "@repo/api";
import { useRouter } from 'next/navigation';

export default function PostsPage() {
  const router = useRouter();
  const { data, isLoading, error } = useBlogPosts({
    page: 0,
    size: 50,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h1" className="mb-2">
                Content Management
              </Typography>
              <Typography variant="p" className="text-gray-600 dark:text-gray-400">
                Manage your blog posts and content
              </Typography>
            </div>
            <Button
              size="lg"
              leftIcon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
              onClick={() => router.push('/posts/new')}
            >
              New Post
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Total Posts', value: data?.totalElements || 0, icon: '📝' },
              { label: 'Published', value: data?.content.filter(p => p.status === 'PUBLISHED').length || 0, icon: '✅' },
              { label: 'Drafts', value: data?.content.filter(p => p.status === 'DRAFT').length || 0, icon: '📄' },
              { label: 'Featured', value: data?.content.filter(p => p.featured).length || 0, icon: '⭐' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </Typography>
                    <Typography variant="h2" className="text-2xl">
                      {stat.value}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <Typography variant="p" className="text-gray-600 dark:text-gray-400">
                Loading posts...
              </Typography>
            </div>
          </div>
        )}

        {error && (
          <Card className="p-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <Typography variant="h3" className="text-red-900 dark:text-red-200 mb-1">
                  Error loading posts
                </Typography>
                <Typography variant="p" className="text-red-700 dark:text-red-300">
                  {error.message}
                </Typography>
              </div>
            </div>
          </Card>
        )}

        {data && data.content.length === 0 && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📝</div>
              <Typography variant="h2" className="mb-3">
                No posts yet
              </Typography>
              <Typography variant="p" className="text-gray-600 dark:text-gray-400 mb-6">
                Get started by creating your first blog post. Share your thoughts, ideas, and stories with the world.
              </Typography>
              <Button
                size="lg"
                onClick={() => router.push('/posts/new')}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                Create Your First Post
              </Button>
            </div>
          </Card>
        )}

        {data && data.content.length > 0 && (
          <div className="space-y-4">
            {data.content.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => router.push(`/posts/${post.id}`)}
              >
                <div className="flex items-start justify-between gap-6">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Typography variant="h2" className="truncate">
                        {post.title}
                      </Typography>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {post.featured && (
                          <Chip variant="featured" size="md">
                            ⭐ Featured
                          </Chip>
                        )}
                        <Chip
                          variant={post.status === PostStatus.PUBLISHED ? 'default' : 'outlined'}
                          size="md"
                        >
                          {post.status === PostStatus.PUBLISHED ? '✅' : '📄'} {post.status}
                        </Chip>
                      </div>
                    </div>

                    {post.excerpt && (
                      <Typography variant="p" className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </Typography>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm">
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

                      <Typography variant="caption" className="text-gray-400">•</Typography>
                      
                      <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
                        👁️ {post.viewCount.toLocaleString()} views
                      </Typography>

                      {post.readingTimeMinutes && (
                        <>
                          <Typography variant="caption" className="text-gray-400">•</Typography>
                          <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
                            ⏱️ {post.readingTimeMinutes} min read
                          </Typography>
                        </>
                      )}

                      {post.tags.length > 0 && (
                        <>
                          <Typography variant="caption" className="text-gray-400">•</Typography>
                          <div className="flex gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Chip key={tag.id} size="sm">
                                {tag.name}
                              </Chip>
                            ))}
                            {post.tags.length > 3 && (
                              <Chip size="sm" variant="outlined">
                                +{post.tags.length - 3}
                              </Chip>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/posts/${post.id}`);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
