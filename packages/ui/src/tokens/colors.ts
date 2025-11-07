// Aurigami Color System
// Primitive color scales

export const primitive = {
  charcoal: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d4d1cd',
    400: '#a39e98',
    500: '#716c66',
    600: '#58534e',
    700: '#3f3b37',
    800: '#2a2724',
    900: '#1a1816',
    950: '#0f0e0d',
  },
  gold: {
    50: '#fdfcf7',
    100: '#faf7ed',
    200: '#f5eed5',
    300: '#ede2b8',
    400: '#e3cf8a',
    500: '#d4b568',
    600: '#b8954a',
    700: '#95763a',
    800: '#6e5830',
    900: '#4a3a20',
    950: '#2a2013',
  },
  sage: {
    50: '#f7f9f7',
    100: '#eff2ef',
    200: '#dfe5df',
    300: '#c5d1c5',
    400: '#a1b3a1',
    500: '#7a927a',
    600: '#5f7360',
    700: '#4a5a4b',
    800: '#36423a',
    900: '#252d28',
    950: '#161a18',
  },
  terracotta: {
    50: '#faf7f7',
    100: '#f5eeec',
    200: '#ead9d5',
    300: '#dab8ae',
    400: '#c7897a',
    500: '#b85c4f',
    600: '#a24d42',
    700: '#8f3d32',
    800: '#6d2f27',
    900: '#4a201c',
    950: '#2a1310',
  },
} as const;

// Semantic color mappings
export const semantic = {
  brand: {
    primary: '#1a1816',
    primaryHover: '#2a2724',
    primaryActive: '#3f3b37',
    accent: '#d4b568',
    accentHover: '#b8954a',
    accentActive: '#95763a',
  },
  background: {
    base: '#ffffff',
    subtle: '#fafaf9',
    muted: '#f5f5f4',
    elevated: '#ffffff',
    overlay: 'rgba(26, 24, 22, 0.5)',
  },
  foreground: {
    primary: '#1a1816',
    secondary: '#58534e',
    tertiary: '#a39e98',
    muted: '#d4d1cd',
    onBrand: '#ffffff',
    accent: '#b8954a',
  },
  border: {
    default: '#e7e5e4',
    strong: '#d4d1cd',
    subtle: '#f5f5f4',
    accent: '#e3cf8a',
  },
  success: {
    base: '#7a927a',
    hover: '#5f7360',
    subtle: '#f7f9f7',
    text: '#4a5a4b',
    border: '#dfe5df',
  },
  error: {
    base: '#b85c4f',
    hover: '#a24d42',
    subtle: '#faf7f7',
    text: '#8f3d32',
    border: '#ead9d5',
  },
  warning: {
    base: '#d4b568',
    hover: '#b8954a',
    subtle: '#fdfcf7',
    text: '#95763a',
    border: '#f5eed5',
  },
  info: {
    base: '#7a927a',
    hover: '#5f7360',
    subtle: '#f7f9f7',
    text: '#4a5a4b',
    border: '#dfe5df',
  },
} as const;

// Combined colors export
export const colors = {
  primitive,
  semantic,
} as const;

// Export types for type safety
export type ColorToken = typeof colors;
export type PrimitiveColor = keyof typeof primitive;
export type CharcoalColor = keyof typeof primitive.charcoal;
export type GoldColor = keyof typeof primitive.gold;
export type SageColor = keyof typeof primitive.sage;
export type TerracottaColor = keyof typeof primitive.terracotta;
export type SemanticColor = keyof typeof semantic;
