import { style } from '@vanilla-extract/css';

export const container = style({
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
});

export const header = style({
  backgroundColor: 'white',
  borderBottom: '1px solid #e5e7eb',
  position: 'sticky',
  top: 0,
  zIndex: 10,
});

export const headerInner = style({
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '1rem 1.5rem',
});

export const headerContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const headerTitles = style({
  display: 'flex',
  flexDirection: 'column',
});

export const headerRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
});

export const formContainer = style({
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '2rem 1.5rem',
});

export const formGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.5rem',
  '@media': {
    '(min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const mainColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  '@media': {
    '(min-width: 1024px)': {
      gridColumn: 'span 2',
    },
  },
});

export const sidebar = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const featuredToggle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  backgroundColor: '#f9fafb',
  borderRadius: '0.5rem',
  border: '1px solid #e5e7eb',
});

export const toggleText = style({
  display: 'flex',
  flexDirection: 'column',
});

export const toggleSwitch = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
});

export const toggleCheckbox = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});

export const toggleTrack = style({
  width: '2.75rem',
  height: '1.5rem',
  backgroundColor: '#d1d5db',
  borderRadius: '9999px',
  position: 'relative',
  transition: 'background-color 0.2s',
  selectors: {
    'input:checked + &': {
      backgroundColor: '#2563eb',
    },
    'input:focus + &': {
      outline: '2px solid transparent',
      outlineOffset: '2px',
      boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.3)',
    },
  },
});

export const toggleThumb = style({
  position: 'absolute',
  top: '2px',
  left: '2px',
  width: '1.25rem',
  height: '1.25rem',
  backgroundColor: 'white',
  border: '1px solid #d1d5db',
  borderRadius: '9999px',
  transition: 'transform 0.2s',
  selectors: {
    'input:checked ~ &': {
      transform: 'translateX(1.25rem)',
      border: '1px solid white',
    },
  },
});

export const tagsContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginTop: '0.5rem',
});

export const imageSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const imagePreview = style({
  position: 'relative',
  aspectRatio: '16 / 9',
  borderRadius: '0.5rem',
  overflow: 'hidden',
  backgroundColor: '#f3f4f6',
});

export const previewImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const formActionsCard = style({
  position: 'sticky',
  bottom: '1rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
});

export const formActionsButtons = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
});

export const svgIcon = style({
  width: '1.25rem',
  height: '1.25rem',
});

