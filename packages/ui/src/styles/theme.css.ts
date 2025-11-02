import { createTheme, createGlobalTheme } from '@vanilla-extract/css';
import { colors, spacing, shadows, radii, duration, easing } from '@repo/tokens';
import { vars } from './contract.css';

// Create the light theme (default)
export const lightTheme = createTheme(vars, {
  color: {
    brand: colors.brand,
    gray: colors.gray,
    accent: colors.accent,
    semantic: colors.semantic,
  },
  space: spacing,
  shadow: shadows,
  radius: radii,
  transition: {
    duration,
    easing,
  },
});

// Create the dark theme
export const darkTheme = createTheme(vars, {
  color: {
    brand: colors.brand,
    gray: {
      // Invert gray scale for dark mode
      50: colors.gray[950],
      100: colors.gray[900],
      200: colors.gray[800],
      300: colors.gray[700],
      400: colors.gray[600],
      500: colors.gray[500],
      600: colors.gray[400],
      700: colors.gray[300],
      800: colors.gray[200],
      900: colors.gray[100],
      950: colors.gray[50],
    },
    accent: colors.accent,
    semantic: colors.semantic,
  },
  space: spacing,
  shadow: shadows,
  radius: radii,
  transition: {
    duration,
    easing,
  },
});

// Global tokens that don't change between themes
export const globalTokens = createGlobalTheme(':root', {
  font: {
    family: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      serif: 'Merriweather, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: '"JetBrains Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    weight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  zIndex: {
    base: '0',
    dropdown: '1000',
    sticky: '1100',
    fixed: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    tooltip: '1600',
    toast: '1700',
  },
  breakpoint: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
});

