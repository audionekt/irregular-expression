import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';

export const avatarBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  userSelect: 'none',
  overflow: 'hidden',
});

export const avatarWrapper = style({
  border: '2px solid',
  borderColor: vars.color.gray[300],
  borderRadius: vars.radius.circle,
  boxSizing: 'border-box',
  overflow: 'hidden',
});

export const avatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const avatarFallback = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.color.gray[200],
  color: vars.color.gray[600],
  fontWeight: globalTokens.font.weight.medium,
  userSelect: 'none',
});

// Size variants
export const sizes = styleVariants({
  sm: {
    width: vars.space[6],
    height: vars.space[6],
    fontSize: globalTokens.font.size.xs,
  },
  md: {
    width: vars.space[10],
    height: vars.space[10],
    fontSize: globalTokens.font.size.sm,
  },
  lg: {
    width: vars.space[16],
    height: vars.space[16],
    fontSize: globalTokens.font.size.base,
  },
});

// Shape variants
export const shapes = styleVariants({
  circle: {
    borderRadius: vars.radius.circle,
  },
  square: {
    borderRadius: vars.radius.none,
  },
  rounded: {
    borderRadius: vars.radius.lg,
  },
});

