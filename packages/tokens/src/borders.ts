export const borderWidths = {
  none: '0',
  thin: '1px',
  base: '2px',
  thick: '4px',
  heavy: '8px',
} as const;

export const borderStyles = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
  none: 'none',
} as const;

export type BorderWidthToken = typeof borderWidths;
export type BorderWidthKey = keyof typeof borderWidths;
export type BorderStyleToken = typeof borderStyles;
export type BorderStyleKey = keyof typeof borderStyles;

