import { style } from '@vanilla-extract/css';

export const outerContainer = style({
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  backgroundColor: 'black',
});

export const mainContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '8rem 4rem',
  minHeight: '100vh',
  width: '100%',
  maxWidth: '48rem',
  backgroundColor: 'white',
  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: 'black',
    },
    '(min-width: 640px)': {
      alignItems: 'flex-start',
    },
  },
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const loadingContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3rem 0',
});

export const errorBox = style({
  padding: '1rem',
  backgroundColor: 'rgba(254, 202, 202, 0.5)',
  border: '1px solid rgba(248, 113, 113, 0.5)',
  borderRadius: '0.5rem',
  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: 'rgba(127, 29, 29, 0.2)',
      borderColor: 'rgba(127, 29, 29, 0.5)',
    },
  },
});

export const postsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
});

export const postCard = style({
  display: 'flex',
  flexDirection: 'column',
});

export const postHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: '0.75rem',
});

export const postTitle = style({
  cursor: 'pointer',
  transition: 'color 0.2s',
  ':hover': {
    color: '#2563eb',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      ':hover': {
        color: '#60a5fa',
      },
    },
  },
});

export const featuredChip = style({
  marginLeft: '0.5rem',
});

export const postExcerpt = style({
  marginBottom: '1rem',
});

export const postMeta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '1rem',
});

export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const tagsContainer = style({
  display: 'flex',
  gap: '0.5rem',
});

export const pagination = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingTop: '1rem',
  borderTop: '1px solid #e5e7eb',
  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#1f2937',
    },
  },
});

