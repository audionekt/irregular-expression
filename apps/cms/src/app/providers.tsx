'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Providers component that sets up:
 * 1. Mock Service Worker (MSW) in development
 * 2. TanStack Query (React Query) for data fetching
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      // Only enable MSW in development mode IN THE BROWSER (not during SSR/build)
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        try {
          // Dynamically import MSW browser code only in the browser
          const { setupMocks } = await import('@repo/api/mocks');
          await setupMocks();
          console.log('✅ MSW is ready - CMS API calls will be mocked');
        } catch (error) {
          console.error('Failed to initialize MSW:', error);
        }
      }
      setMswReady(true);
    };

    initMSW();
  }, []);

  // Show loading state while MSW initializes
  if (!mswReady) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div>
          <div style={{ marginBottom: '8px' }}>🔄 Initializing CMS...</div>
          <div style={{ fontSize: '14px', color: '#999' }}>
            Setting up Mock Service Worker
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

