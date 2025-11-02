import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';

export const chip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[1],
  borderRadius: vars.radius.full,
  fontWeight: globalTokens.font.weight.medium,
  whiteSpace: 'nowrap',
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.easeInOut}`,
  border: '1px solid transparent',
});

export const clickable = style({
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
});

export const sizes = styleVariants({
  sm: {
    height: vars.space[5],
    paddingLeft: vars.space[2],
    paddingRight: vars.space[2],
    fontSize: globalTokens.font.size.xs,
  },
  md: {
    height: vars.space[6],
    paddingLeft: vars.space[2.5],
    paddingRight: vars.space[2.5],
    fontSize: globalTokens.font.size.sm,
  },
  lg: {
    height: vars.space[8],
    paddingLeft: vars.space[3],
    paddingRight: vars.space[3],
    fontSize: globalTokens.font.size.base,
  },
});

export const variants = styleVariants({
  default: {
    backgroundColor: vars.color.gray[100],
    color: vars.color.gray[800],
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: vars.color.gray[300],
    color: vars.color.gray[700],
  },
  featured: {
    backgroundColor: vars.color.brand[100],
    color: vars.color.brand[700],
  },
  success: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  warning: {
    backgroundColor: '#fed7aa',
    color: '#92400e',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
});

export const dismissButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: vars.space[1],
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  borderRadius: vars.radius.full,
  opacity: 0.6,
  transition: `opacity ${vars.transition.duration.fast} ${vars.transition.easing.easeInOut}`,
  
  ':hover': {
    opacity: 1,
  },
});

