import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[6],
});

export const formSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[4],
});

export const formSectionHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[1],
});

export const formSectionTitle = style({
  fontSize: globalTokens.font.size.lg,
  fontWeight: globalTokens.font.weight.semibold,
  color: vars.color.semantic.foreground.primary,
});

export const formSectionDescription = style({
  fontSize: globalTokens.font.size.sm,
  color: vars.color.semantic.foreground.tertiary,
});

export const formSectionContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[4],
});

export const formGrid = style({
  display: 'grid',
  gap: vars.space[4],
});

export const gridColumns = styleVariants({
  1: { gridTemplateColumns: '1fr' },
  2: {
    gridTemplateColumns: '1fr',
    '@media': {
      '(min-width: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
  },
  3: {
    gridTemplateColumns: '1fr',
    '@media': {
      '(min-width: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '(min-width: 1024px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    },
  },
  4: {
    gridTemplateColumns: '1fr',
    '@media': {
      '(min-width: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '(min-width: 1024px)': {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
  },
});

export const formActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[3],
  paddingTop: vars.space[4],
  borderTop: `1px solid ${vars.color.semantic.border.default}`,
});

export const formActionsAlign = styleVariants({
  left: { justifyContent: 'flex-start' },
  center: { justifyContent: 'center' },
  right: { justifyContent: 'flex-end' },
  between: { justifyContent: 'space-between' },
});

