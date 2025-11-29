'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';

// Constants
const QUERY_CLIENT_CONFIG = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
};

// Create a client
const queryClient = new QueryClient(QUERY_CLIENT_CONFIG);

// Helper functions
function shouldUseMockAPI(): boolean {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return !apiUrl || apiUrl.trim() === '' || apiUrl === 'undefined';
}

function isClientSideDevelopment(): boolean {
  return typeof window !== 'undefined' && process.env.NODE_ENV === 'development';
}

/**
 * Providers component that sets up:
 * 1. Mock Service Worker (MSW) in development
 * 2. TanStack Query (React Query) for data fetching
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    initializeMSW();
  }, []);

  async function initializeMSW() {
    if (!shouldUseMockAPI()) {
      console.log('🌐 Using real API:', process.env.NEXT_PUBLIC_API_URL);
      setMswReady(true);
      return;
    }

    if (isClientSideDevelopment()) {
      try {
        console.log('🔧 No API URL configured - initializing MSW for mocked data');
        const { setupMocks } = await import('@repo/api/mocks');
        await setupMocks();
        console.log('✅ MSW is ready - CMS API calls will be mocked');
      } catch (error) {
        console.error('Failed to initialize MSW:', error);
      }
    }
    
    setMswReady(true);
  }

  if (!mswReady) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

// Component: Loading Screen
function LoadingScreen() {
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

