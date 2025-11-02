import { style, keyframes } from '@vanilla-extract/css';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const container = style({
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
});

export const header = style({
  backgroundColor: 'white',
  borderBottom: '1px solid #e5e7eb',
});

export const headerInner = style({
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '2rem 1.5rem',
});

export const headerTop = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '2rem',
});

export const headerTitles = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '1rem',
  marginTop: '2rem',
  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
});

export const statCard = style({
  backgroundColor: '#f9fafb',
  borderRadius: '0.5rem',
  padding: '1rem',
  border: '1px solid #e5e7eb',
});

export const statContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
});

export const statIcon = style({
  fontSize: '1.5rem',
});

export const statText = style({
  display: 'flex',
  flexDirection: 'column',
});

export const content = style({
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '2rem 1.5rem',
});

export const loadingContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5rem 0',
});

export const loadingInner = style({
  textAlign: 'center',
});

export const spinner = style({
  width: '3rem',
  height: '3rem',
  border: '4px solid #2563eb',
  borderTopColor: 'transparent',
  borderRadius: '9999px',
  margin: '0 auto 1rem',
  animation: `${spin} 1s linear infinite`,
});

export const emptyState = style({
  maxWidth: '28rem',
  margin: '0 auto',
  textAlign: 'center',
});

export const emptyIcon = style({
  fontSize: '3.75rem',
  marginBottom: '1rem',
});

export const postsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const postCard = style({
  cursor: 'pointer',
  transition: 'box-shadow 0.2s',
  ':hover': {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
});

export const postContent = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '1.5rem',
});

export const postMain = style({
  flex: 1,
  minWidth: 0,
});

export const postHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '0.75rem',
});

export const postBadges = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexShrink: 0,
});

export const postMeta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '1rem',
  fontSize: '0.875rem',
});

export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const metaTags = style({
  display: 'flex',
  gap: '0.5rem',
});

export const postActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexShrink: 0,
});

export const svgIcon = style({
  width: '1.25rem',
  height: '1.25rem',
});

export const svgIconSm = style({
  width: '1rem',
  height: '1rem',
});

export const errorIcon = style({
  width: '1.5rem',
  height: '1.5rem',
  flexShrink: 0,
});

