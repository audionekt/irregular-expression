import { createTheme, createGlobalTheme } from '@vanilla-extract/css';
import { colors, gradients, spacing, shadows, radii, duration, easing } from '../tokens';
import { vars } from './contract.css';

// Create the light theme (default)
export const lightTheme = createTheme(vars, {
  color: {
    primitive: colors.primitive,
    semantic: colors.semantic,
  },
  gradient: gradients,
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
    primitive: {
      // Invert charcoal scale for dark mode
      charcoal: {
        50: colors.primitive.charcoal[950],
        100: colors.primitive.charcoal[900],
        200: colors.primitive.charcoal[800],
        300: colors.primitive.charcoal[700],
        400: colors.primitive.charcoal[600],
        500: colors.primitive.charcoal[500],
        600: colors.primitive.charcoal[400],
        700: colors.primitive.charcoal[300],
        800: colors.primitive.charcoal[200],
        900: colors.primitive.charcoal[100],
        950: colors.primitive.charcoal[50],
      },
      // Keep other primitive colors the same
      gold: colors.primitive.gold,
      sage: colors.primitive.sage,
      terracotta: colors.primitive.terracotta,
    },
    semantic: {
      brand: {
        primary: colors.primitive.charcoal[50],
        primaryHover: colors.primitive.charcoal[100],
        primaryActive: colors.primitive.charcoal[200],
        accent: colors.semantic.brand.accent,
        accentHover: colors.semantic.brand.accentHover,
        accentActive: colors.semantic.brand.accentActive,
      },
      background: {
        base: colors.primitive.charcoal[950],
        subtle: colors.primitive.charcoal[900],
        muted: colors.primitive.charcoal[800],
        elevated: colors.primitive.charcoal[900],
        overlay: 'rgba(250, 250, 249, 0.1)',
      },
      foreground: {
        primary: colors.primitive.charcoal[50],
        secondary: colors.primitive.charcoal[300],
        tertiary: colors.primitive.charcoal[400],
        muted: colors.primitive.charcoal[600],
        onBrand: colors.primitive.charcoal[950],
        accent: colors.semantic.foreground.accent,
      },
      border: {
        default: colors.primitive.charcoal[800],
        strong: colors.primitive.charcoal[700],
        subtle: colors.primitive.charcoal[900],
        accent: colors.primitive.gold[700],
      },
      success: colors.semantic.success,
      error: colors.semantic.error,
      warning: colors.semantic.warning,
      info: colors.semantic.info,
    },
  },
  gradient: gradients,
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
      sans: "'Merge One', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
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
    },
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
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
