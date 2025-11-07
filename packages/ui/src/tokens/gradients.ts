// Aurigami Gradient System

export const background = {
  subtle: 'linear-gradient(135deg, #ffffff 0%, #fafaf9 100%)',
  muted: 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)',
  warm: 'linear-gradient(135deg, #fdfcf7 0%, #faf7ed 100%)',
} as const;

export const brand = {
  primary: 'linear-gradient(135deg, #1a1816 0%, #2a2724 100%)',
  accent: 'linear-gradient(135deg, #d4b568 0%, #b8954a 100%)',
  hero: 'linear-gradient(135deg, #1a1816 0%, #d4b568 50%, #1a1816 100%)',
  subtle: 'linear-gradient(135deg, #fdfcf7 0%, #f5eed5 100%)',
} as const;

export const overlay = {
  dark: 'linear-gradient(180deg, rgba(26, 24, 22, 0) 0%, rgba(26, 24, 22, 0.8) 100%)',
  light: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 100%)',
} as const;

export const mesh = {
  warm: 'radial-gradient(at 27% 37%, rgba(212, 181, 104, 0.1) 0px, transparent 50%), radial-gradient(at 97% 21%, rgba(122, 146, 122, 0.05) 0px, transparent 50%), radial-gradient(at 52% 99%, rgba(163, 158, 152, 0.05) 0px, transparent 50%)',
  subtle: 'radial-gradient(at 40% 20%, rgba(250, 250, 249, 1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(253, 252, 247, 1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(247, 249, 247, 1) 0px, transparent 50%)',
} as const;

export const shimmer = {
  gold: 'linear-gradient(90deg, transparent 0%, rgba(212, 181, 104, 0.1) 50%, transparent 100%)',
  light: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
} as const;

export const text = {
  gold: 'linear-gradient(135deg, #d4b568 0%, #b8954a 100%)',
  subtle: 'linear-gradient(135deg, #58534e 0%, #1a1816 100%)',
  hero: 'linear-gradient(135deg, #1a1816 0%, #d4b568 50%, #1a1816 100%)',
} as const;

export const success = {
  subtle: 'linear-gradient(135deg, #f7f9f7 0%, #eff2ef 100%)',
  base: 'linear-gradient(135deg, #7a927a 0%, #5f7360 100%)',
} as const;

export const error = {
  subtle: 'linear-gradient(135deg, #faf7f7 0%, #f5eeec 100%)',
  base: 'linear-gradient(135deg, #b85c4f 0%, #a24d42 100%)',
} as const;

export const warning = {
  subtle: 'linear-gradient(135deg, #fdfcf7 0%, #faf7ed 100%)',
  base: 'linear-gradient(135deg, #d4b568 0%, #b8954a 100%)',
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
} as const;

// Export types for type safety
export type GradientToken = typeof gradients;
export type BackgroundGradient = keyof typeof background;
export type BrandGradient = keyof typeof brand;
export type OverlayGradient = keyof typeof overlay;
export type MeshGradient = keyof typeof mesh;
export type ShimmerGradient = keyof typeof shimmer;
export type TextGradient = keyof typeof text;

