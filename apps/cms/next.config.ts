import type { NextConfig } from "next";
import path from 'path';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  outputFileTracingRoot: path.resolve(__dirname, '../..'),
  transpilePackages: ['aurigami', '@repo/styles', '@repo/tokens'],
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    // Add alias for workspace packages to resolve from source
    config.resolve.alias = {
      ...config.resolve.alias,
      '@repo/styles': path.resolve(__dirname, '../../packages/styles/src'),
      '@repo/tokens': path.resolve(__dirname, '../../packages/tokens/src'),
      'aurigami/layout': path.resolve(__dirname, '../../packages/ui/src/layout.ts'),
      'aurigami': path.resolve(__dirname, '../../packages/ui/src'),
    };
    
    return config;
  },
};

export default withVanillaExtract(nextConfig);
