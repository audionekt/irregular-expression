import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';
import * as inputStyles from '../input/input.css';

// Reuse input styles for consistency
export const wrapper = inputStyles.wrapper;
export const fullWidth = inputStyles.fullWidth;
export const label = inputStyles.label;
export const required = inputStyles.required;
export const message = inputStyles.message;
export const errorMessage = inputStyles.errorMessage;
export const helperMessage = inputStyles.helperMessage;
export const errorIcon = inputStyles.errorIcon;
export const inputStates = inputStyles.inputStates;

export const selectWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const select = style({
  display: 'flex',
  height: vars.space[10],
  width: '100%',
  appearance: 'none',
  borderRadius: vars.radius.lg,
  border: `2px solid ${vars.color.gray[300]}`,
  backgroundColor: 'white',
  paddingLeft: vars.space[3],
  paddingRight: vars.space[10],
  paddingTop: vars.space[2],
  paddingBottom: vars.space[2],
  fontSize: globalTokens.font.size.sm,
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.easeInOut}`,
  cursor: 'pointer',

  ':focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${vars.color.brand[500]}`,
    borderColor: 'transparent',
  },

  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: vars.color.gray[400],
    },
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
    backgroundColor: vars.color.gray[50],
  },
});

export const dropdownIcon = style({
  position: 'absolute',
  right: vars.space[3],
  top: '50%',
  transform: 'translateY(-50%)',
  color: vars.color.gray[400],
  pointerEvents: 'none',
  height: '1.25rem',
  width: '1.25rem',
});

