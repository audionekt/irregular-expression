import type { Config } from 'tailwindcss';
import sharedPreset from '@repo/styles/tailwind.config';

const config: Config = {
  presets: [sharedPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

export default config;
