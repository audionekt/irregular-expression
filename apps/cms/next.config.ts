import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  outputFileTracingRoot: '/Users/arunravishankar/portfolio-monorepo',
  transpilePackages: ['@repo/ui', '@repo/styles', '@repo/tokens'],
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    // Add alias for workspace packages
    config.resolve.alias = {
      ...config.resolve.alias,
      '@repo/styles': path.resolve(__dirname, '../../packages/styles/src'),
      '@repo/tokens': path.resolve(__dirname, '../../packages/tokens/src'),
      '@repo/ui': path.resolve(__dirname, '../../packages/ui/src'),
    };
    
    return config;
  },
};

export default nextConfig;
