'use client';

import { Button, Typography, Card, Chip, Avatar } from "aurigami";
import { useBlogPosts, PostStatus } from "@repo/api";
import * as styles from './page.css';

export default function Home() {
  const { data, isLoading, error } = useBlogPosts({
    status: PostStatus.PUBLISHED,
    page: 0,
    size: 10,
  });

  return (
    <div className={styles.outerContainer}>
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <Typography variant="h1">
            Blog Posts
          </Typography>
          <Typography variant="p">
            Exploring web development, design, and technology
          </Typography>
        </div>

        {isLoading && (
          <div className={styles.loadingContainer}>
            <Typography variant="caption">
              Loading posts...
            </Typography>
          </div>
        )}

        {error && (
          <div className={styles.errorBox}>
            <Typography variant="p">
              Error loading posts: {error.message}
            </Typography>
          </div>
        )}

        {data && (
          <>
            <div className={styles.postsContainer}>
              {data.content.map((post) => (
                <Card key={post.id} padding="md">
                  <div className={styles.postHeader}>
                    <Typography 
                      variant="h2" 
                      className={styles.postTitle}
                    >
                      {post.title}
                    </Typography>
                    {post.featured && (
                      <Chip variant="featured" size="md" className={styles.featuredChip}>
                        Featured
                      </Chip>
                    )}
                  </div>

                  {post.excerpt && (
                    <Typography variant="p" className={styles.postExcerpt}>
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
                        <div className={styles.tagsContainer}>
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
            <div className={styles.pagination}>
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
