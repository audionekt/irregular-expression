import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';

export const typography = style({
  margin: 0,
  padding: 0,
});

export const variants = styleVariants({
  h1: {
    fontSize: globalTokens.font.size['4xl'],
    fontWeight: globalTokens.font.weight.bold,
    lineHeight: globalTokens.font.lineHeight.tight,
    letterSpacing: globalTokens.font.letterSpacing.tight,
  },
  h2: {
    fontSize: globalTokens.font.size['3xl'],
    fontWeight: globalTokens.font.weight.bold,
    lineHeight: globalTokens.font.lineHeight.tight,
  },
  h3: {
    fontSize: globalTokens.font.size['2xl'],
    fontWeight: globalTokens.font.weight.semibold,
    lineHeight: globalTokens.font.lineHeight.snug,
  },
  h4: {
    fontSize: globalTokens.font.size.xl,
    fontWeight: globalTokens.font.weight.semibold,
    lineHeight: globalTokens.font.lineHeight.snug,
  },
  h5: {
    fontSize: globalTokens.font.size.lg,
    fontWeight: globalTokens.font.weight.semibold,
    lineHeight: globalTokens.font.lineHeight.normal,
  },
  h6: {
    fontSize: globalTokens.font.size.base,
    fontWeight: globalTokens.font.weight.semibold,
    lineHeight: globalTokens.font.lineHeight.normal,
  },
  p: {
    fontSize: globalTokens.font.size.base,
    fontWeight: globalTokens.font.weight.normal,
    lineHeight: globalTokens.font.lineHeight.relaxed,
  },
  caption: {
    fontSize: globalTokens.font.size.sm,
    fontWeight: globalTokens.font.weight.normal,
    lineHeight: globalTokens.font.lineHeight.normal,
    color: vars.color.gray[600],
  },
  small: {
    fontSize: globalTokens.font.size.xs,
    fontWeight: globalTokens.font.weight.normal,
    lineHeight: globalTokens.font.lineHeight.normal,
  },
});

export const weights = styleVariants({
  thin: { fontWeight: globalTokens.font.weight.thin },
  extralight: { fontWeight: globalTokens.font.weight.extralight },
  light: { fontWeight: globalTokens.font.weight.light },
  normal: { fontWeight: globalTokens.font.weight.normal },
  medium: { fontWeight: globalTokens.font.weight.medium },
  semibold: { fontWeight: globalTokens.font.weight.semibold },
  bold: { fontWeight: globalTokens.font.weight.bold },
  extrabold: { fontWeight: globalTokens.font.weight.extrabold },
  black: { fontWeight: globalTokens.font.weight.black },
});

export const aligns = styleVariants({
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  justify: { textAlign: 'justify' },
});

