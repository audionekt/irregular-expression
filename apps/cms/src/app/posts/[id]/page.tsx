'use client';

import { Typography, Button } from 'aurigami';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <Typography variant="h1" className="mb-3">
          Edit Post #{id}
        </Typography>
        <Typography variant="p" className="text-gray-600 dark:text-gray-400 mb-6">
          Edit functionality coming soon! Use the form structure from /posts/new
        </Typography>
        <Button onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}

