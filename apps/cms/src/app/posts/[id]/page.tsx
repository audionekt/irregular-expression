'use client';

import { Typography, Button } from 'aurigami';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import * as styles from './page.css';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>🚧</div>
        <Typography variant="h1" style={{ marginBottom: '0.75rem' }}>
          Edit Post #{id}
        </Typography>
        <Typography variant="p" className={styles.subtitle}>
          Edit functionality coming soon! Use the form structure from /posts/new
        </Typography>
        <Button onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}

