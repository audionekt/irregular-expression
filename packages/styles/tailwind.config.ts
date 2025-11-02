import type { Config } from 'tailwindcss';

// Shared Tailwind preset for the entire monorepo
// Apps will extend this and provide their own content paths
const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      // Add more shared theme customizations here
    },
  },
  plugins: [
    // Add shared plugins here
  ],
};

export default preset;

