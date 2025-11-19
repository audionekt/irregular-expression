import { globalStyle } from '@vanilla-extract/css';
import { vars } from './contract.css';
import { globalTokens, lightTheme } from './theme.css';

// CSS Reset
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

globalStyle('html', {
  lineHeight: globalTokens.font.lineHeight.normal,
  WebkitTextSizeAdjust: '100%',
  fontFamily: globalTokens.font.family.sans,
});

globalStyle(`body, body.${lightTheme}`, {
  margin: 0,
  fontFamily: globalTokens.font.family.sans,
  fontSize: globalTokens.font.size.base,
  fontWeight: globalTokens.font.weight.normal,
  lineHeight: globalTokens.font.lineHeight.normal,
  color: vars.color.semantic.foreground.primary,
  backgroundColor: vars.color.semantic.background.subtle,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontSize: 'inherit',
  fontWeight: 'inherit',
  margin: 0,
});

globalStyle('p', {
  margin: 0,
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'inherit',
});

globalStyle('button', {
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  margin: 0,
  padding: 0,
});

globalStyle('button:disabled', {
  cursor: 'not-allowed',
});

globalStyle('input, textarea, select', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  margin: 0,
});

globalStyle('img, svg, video, canvas, audio, iframe, embed, object', {
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
});

globalStyle('img, svg', {
  verticalAlign: 'middle',
});

// Focus styles
globalStyle(':focus-visible', {
  outline: `2px solid ${vars.color.semantic.brand.accent}`,
  outlineOffset: '2px',
});

