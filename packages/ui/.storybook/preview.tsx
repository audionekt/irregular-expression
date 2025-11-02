import React from 'react';
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { handlers } from '@repo/api/mocks/handlers';
import '@repo/styles/globals.css';
import './fonts.css';

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass', // Don't warn about unhandled requests (Storybook assets)
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: {
      handlers: handlers, // Default handlers for all stories
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export default preview;