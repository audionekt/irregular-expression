import { style } from '@vanilla-extract/css';

export const container = style({
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.5rem',
});

export const content = style({
  textAlign: 'center',
});

export const icon = style({
  fontSize: '3.75rem',
  marginBottom: '1rem',
});

export const subtitle = style({
  marginBottom: '1.5rem',
});

