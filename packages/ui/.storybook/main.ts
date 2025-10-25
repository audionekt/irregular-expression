import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Set unique cache directory to avoid conflicts
    config.cacheDir = path.join(__dirname, '../node_modules/.vite-storybook');

    // Configure alias for workspace packages
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@repo/styles': path.resolve(__dirname, '../../styles/src'),
      '@repo/tokens': path.resolve(__dirname, '../../tokens/src'),
    };

    // Add PostCSS support for Tailwind
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    };

    return config;
  },
};

export default config;
