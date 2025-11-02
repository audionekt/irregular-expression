import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';

export const card = style({
  borderRadius: vars.radius.lg,
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.easeInOut}`,
});

export const variants = styleVariants({
  default: {
    backgroundColor: 'white',
    border: `1px solid ${vars.color.gray[200]}`,
  },
  elevated: {
    backgroundColor: 'white',
    boxShadow: vars.shadow.lg,
  },
  outlined: {
    backgroundColor: 'transparent',
    border: `2px solid ${vars.color.gray[200]}`,
  },
});

export const padding = styleVariants({
  none: {
    padding: 0,
  },
  sm: {
    padding: vars.space[4],
  },
  md: {
    padding: vars.space[6],
  },
  lg: {
    padding: vars.space[8],
  },
});

export const interactive = style({
  cursor: 'pointer',
  
  ':hover': {
    borderColor: vars.color.gray[300],
  },
});

