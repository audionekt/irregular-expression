import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

/**
 * Base Vite configuration for library packages in the monorepo.
 * 
 * Usage in package vite.config.ts:
 * ```ts
 * import { defineConfig, mergeConfig } from 'vite';
 * import baseConfig from '../../vite.config.base';
 * 
 * export default mergeConfig(baseConfig, defineConfig({
 *   // package-specific config
 * }));
 * ```
 */
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into libraries
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'next',
        /^next\//,      // All Next.js subpaths (next/font/*, next/image, etc.)
        /^@repo\//,     // All workspace packages
      ],
      output: {
        // Global variables for externals (for UMD builds)
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        // Named exports for better tree-shaking
        exports: 'named',
      },
    },
    // Source maps for debugging
    sourcemap: true,
    // Clean output directory before build
    emptyOutDir: true,
    // Don't minify - better for debugging and not needed for libraries
    minify: false,
  },
});

