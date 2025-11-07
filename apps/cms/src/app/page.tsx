'use client';

import { Typography, Button, Card, Chip, Avatar } from "aurigami";
import { useBlogPosts, PostStatus } from "@repo/api";
import { useRouter } from 'next/navigation';
import { Plus, AlertCircle, Edit } from 'lucide-react';
import * as styles from './page.css';

export default function PostsPage() {
  const router = useRouter();
  const { data, isLoading, error } = useBlogPosts({
    page: 0,
    size: 50,
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerTop}>
            <div className={styles.headerTitles}>
              <Typography variant="h1">
                Content Management
              </Typography>
              <Typography variant="p">
                Manage your blog posts and content
              </Typography>
            </div>
            <Button
              size="lg"
              leftIcon={<Plus className={styles.svgIcon} />}
              onClick={() => router.push('/posts/new')}
            >
              New Post
            </Button>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            {[
              { label: 'Total Posts', value: data?.totalElements || 0, icon: '📝' },
              { label: 'Published', value: data?.content.filter(p => p.status === 'PUBLISHED').length || 0, icon: '✅' },
              { label: 'Drafts', value: data?.content.filter(p => p.status === 'DRAFT').length || 0, icon: '📄' },
              { label: 'Featured', value: data?.content.filter(p => p.featured).length || 0, icon: '⭐' },
            ].map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statContent}>
                  <span className={styles.statIcon}>{stat.icon}</span>
                  <div className={styles.statText}>
                    <Typography variant="caption">
                      {stat.label}
                    </Typography>
                    <Typography variant="h2">
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
      <div className={styles.content}>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingInner}>
              <div className={styles.spinner}></div>
              <Typography variant="p">
                Loading posts...
              </Typography>
            </div>
          </div>
        )}

        {error && (
          <Card padding="md">
            <div className={styles.statContent}>
              <AlertCircle className={styles.errorIcon} />
              <div>
                <Typography variant="h3">
                  Error loading posts
                </Typography>
                <Typography variant="p">
                  {error.message}
                </Typography>
              </div>
            </div>
          </Card>
        )}

        {data && data.content.length === 0 && (
          <Card padding="lg">
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📝</div>
              <Typography variant="h2">
                No posts yet
              </Typography>
              <Typography variant="p" style={{ margin: '1rem 0 1.5rem' }}>
                Get started by creating your first blog post. Share your thoughts, ideas, and stories with the world.
              </Typography>
              <Button
                size="lg"
                onClick={() => router.push('/posts/new')}
                leftIcon={<Plus className={styles.svgIcon} />}
              >
                Create Your First Post
              </Button>
            </div>
          </Card>
        )}

        {data && data.content.length > 0 && (
          <div className={styles.postsList}>
            {data.content.map((post) => (
              <Card
                key={post.id}
                padding="md"
                interactive
                className={styles.postCard}
                onClick={() => router.push(`/posts/${post.id}`)}
              >
                <div className={styles.postContent}>
                  {/* Content */}
                  <div className={styles.postMain}>
                    <div className={styles.postHeader}>
                      <Typography variant="h2" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {post.title}
                      </Typography>
                      <div className={styles.postBadges}>
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
                      <Typography variant="p" style={{ marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </Typography>
                    )}

                    <div className={styles.postMeta}>
                      <div className={styles.metaItem}>
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
                      
                      <Typography variant="caption">
                        👁️ {post.viewCount.toLocaleString()} views
                      </Typography>

                      {post.readingTimeMinutes && (
                        <>
                          <Typography variant="caption">•</Typography>
                          <Typography variant="caption">
                            ⏱️ {post.readingTimeMinutes} min read
                          </Typography>
                        </>
                      )}

                      {post.tags.length > 0 && (
                        <>
                          <Typography variant="caption">•</Typography>
                          <div className={styles.metaTags}>
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
                  <div className={styles.postActions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/posts/${post.id}`);
                      }}
                    >
                      <Edit className={styles.svgIconSm} />
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
