// Aurigami Gradient System

export const background = {
  subtle: 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)',
  muted: 'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)',
  warm: 'linear-gradient(135deg, #faf7fc 0%, #f4eef9 100%)',
} as const;

export const brand = {
  primary: 'linear-gradient(135deg, #bb9bd8 0%, #6d4290 100%)',
  accent: 'linear-gradient(135deg, #d6c1e7 0%, #8454ab 100%)',
  hero: 'linear-gradient(135deg, #6d4290 0%, #bb9bd8 50%, #6d4290 100%)',
  subtle: 'linear-gradient(135deg, #f4eef9 0%, #d6c1e7 100%)',
} as const;

export const overlay = {
  dark: 'linear-gradient(180deg, rgba(15, 14, 13, 0) 0%, rgba(15, 14, 13, 0.75) 100%)',
  light: 'linear-gradient(180deg, rgba(250, 250, 249, 0) 0%, rgba(250, 250, 249, 0.95) 100%)',
} as const;

export const mesh = {
  warm: 'radial-gradient(at 27% 37%, rgba(157, 111, 196, 0.15) 0px, transparent 50%), radial-gradient(at 97% 21%, rgba(187, 155, 216, 0.12) 0px, transparent 50%), radial-gradient(at 52% 99%, rgba(132, 84, 171, 0.1) 0px, transparent 50%)',
  subtle: 'radial-gradient(at 40% 20%, rgba(250, 247, 252, 0.9) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(214, 193, 231, 0.7) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(245, 245, 244, 1) 0px, transparent 50%)',
} as const;

export const shimmer = {
  amethyst: 'linear-gradient(90deg, transparent 0%, rgba(250, 250, 249, 0.4) 50%, transparent 100%)',
  light: 'linear-gradient(90deg, transparent 0%, rgba(157, 111, 196, 0.25) 50%, transparent 100%)',
} as const;

export const text = {
  amethyst: 'linear-gradient(135deg, #bb9bd8 0%, #6d4290 100%)',
  subtle: 'linear-gradient(135deg, #716c66 0%, #3f3b37 100%)',
  hero: 'linear-gradient(135deg, #6d4290 0%, #d6c1e7 50%, #6d4290 100%)',
} as const;

export const success = {
  subtle: 'linear-gradient(135deg, #eff2ef 0%, #dfe5df 100%)',
  base: 'linear-gradient(135deg, #7a927a 0%, #5f7360 100%)',
} as const;

export const error = {
  subtle: 'linear-gradient(135deg, #f5eeec 0%, #ead9d5 100%)',
  base: 'linear-gradient(135deg, #a24d42 0%, #8f3d32 100%)',
} as const;

export const warning = {
  subtle: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
  base: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)',
} as const;

export const info = {
  subtle: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
  base: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
} as const;

// Combined gradients export
export const gradients = {
  background,
  brand,
  overlay,
  mesh,
  shimmer,
  text,
  success,
  error,
  warning,
  info,
} as const;

// Export types for type safety
export type GradientToken = typeof gradients;
export type BackgroundGradient = keyof typeof background;
export type BrandGradient = keyof typeof brand;
export type OverlayGradient = keyof typeof overlay;
export type MeshGradient = keyof typeof mesh;
export type ShimmerGradient = keyof typeof shimmer;
export type TextGradient = keyof typeof text;

