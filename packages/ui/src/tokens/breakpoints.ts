export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Media query helpers
export const mediaQueries = {
  xs: `screen and (min-width: ${breakpoints.xs})`,
  sm: `screen and (min-width: ${breakpoints.sm})`,
  md: `screen and (min-width: ${breakpoints.md})`,
  lg: `screen and (min-width: ${breakpoints.lg})`,
  xl: `screen and (min-width: ${breakpoints.xl})`,
  '2xl': `screen and (min-width: ${breakpoints['2xl']})`,
} as const;

export type BreakpointToken = typeof breakpoints;
export type BreakpointKey = keyof typeof breakpoints;
export type MediaQueryToken = typeof mediaQueries;
export type MediaQueryKey = keyof typeof mediaQueries;

