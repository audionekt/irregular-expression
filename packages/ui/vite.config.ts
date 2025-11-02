import { defineConfig, mergeConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import baseConfig from '../../vite.config.base';

// Extend the base config with package-specific settings
export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      vanillaExtractPlugin(),
      dts({
        include: ['src/**/*'],
        exclude: [
          'src/**/*.test.tsx',
          'src/**/*.test.ts',
          'src/**/*.stories.tsx',
          'src/**/*.css.ts',  // Exclude vanilla-extract files
          'src/utils/layout.tsx',  // Exclude Layout (uses Next.js fonts)
        ],
        rollupTypes: false,
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Aurigami',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      },
    },
  })
);

