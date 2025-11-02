export const duration = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

export const easing = {
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

export const transitions = {
  default: `all ${duration.base} ${easing.easeInOut}`,
  fast: `all ${duration.fast} ${easing.easeInOut}`,
  slow: `all ${duration.slow} ${easing.easeInOut}`,
  colors: `color ${duration.base} ${easing.easeInOut}, background-color ${duration.base} ${easing.easeInOut}, border-color ${duration.base} ${easing.easeInOut}`,
  transform: `transform ${duration.base} ${easing.spring}`,
  opacity: `opacity ${duration.base} ${easing.easeInOut}`,
} as const;

export type DurationToken = typeof duration;
export type DurationKey = keyof typeof duration;
export type EasingToken = typeof easing;
export type EasingKey = keyof typeof easing;
export type TransitionToken = typeof transitions;
export type TransitionKey = keyof typeof transitions;

