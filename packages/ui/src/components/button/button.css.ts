import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
  borderRadius: vars.radius.lg,
  fontWeight: globalTokens.font.weight.semibold,
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.easeInOut}`,
  cursor: 'pointer',
  border: 'none',
  textDecoration: 'none',
  userSelect: 'none',
  
  ':focus-visible': {
    outline: `2px solid ${vars.color.brand[500]}`,
    outlineOffset: '2px',
  },
  
  ':disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
});

// Variant styles
export const variants = styleVariants({
  primary: {
    backgroundColor: vars.color.brand[600],
    color: 'white',
    boxShadow: vars.shadow.sm,
    
    ':hover': {
      backgroundColor: vars.color.brand[700],
      boxShadow: vars.shadow.md,
    },
    
    ':active': {
      backgroundColor: vars.color.brand[800],
    },
  },
  secondary: {
    backgroundColor: 'white',
    color: vars.color.gray[900],
    border: `2px solid ${vars.color.gray[300]}`,
    
    ':hover': {
      backgroundColor: vars.color.gray[50],
      borderColor: vars.color.gray[400],
    },
    
    ':active': {
      backgroundColor: vars.color.gray[100],
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: vars.color.gray[700],
    
    ':hover': {
      backgroundColor: vars.color.gray[100],
      color: vars.color.gray[900],
    },
    
    ':active': {
      backgroundColor: vars.color.gray[200],
    },
  },
  danger: {
    backgroundColor: vars.color.semantic.error,
    color: 'white',
    boxShadow: vars.shadow.sm,
    
    ':hover': {
      backgroundColor: '#dc2626',
      boxShadow: vars.shadow.md,
    },
    
    ':active': {
      backgroundColor: '#b91c1c',
    },
  },
  success: {
    backgroundColor: vars.color.semantic.success,
    color: 'white',
    boxShadow: vars.shadow.sm,
    
    ':hover': {
      backgroundColor: '#059669',
      boxShadow: vars.shadow.md,
    },
    
    ':active': {
      backgroundColor: '#047857',
    },
  },
});

// Size variants
export const sizes = styleVariants({
  sm: {
    height: vars.space[9],
    paddingLeft: vars.space[3],
    paddingRight: vars.space[3],
    fontSize: globalTokens.font.size.sm,
  },
  md: {
    height: vars.space[10],
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
    fontSize: globalTokens.font.size.sm,
  },
  lg: {
    height: vars.space[12],
    paddingLeft: vars.space[6],
    paddingRight: vars.space[6],
    fontSize: globalTokens.font.size.base,
  },
  xl: {
    height: '3.5rem',
    paddingLeft: vars.space[8],
    paddingRight: vars.space[8],
    fontSize: globalTokens.font.size.lg,
  },
});

export const fullWidth = style({
  width: '100%',
});

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const loadingSpinner = style({
  animation: `${spin} 1s linear infinite`,
  height: '1rem',
  width: '1rem',
});

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});

