// Tailwind CSS utility classes
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

// Common component class combinations
export const buttonVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
  ghost: "hover:bg-gray-100 text-gray-900 focus:ring-gray-500",
  danger: "bg-red-600",
} as const;

export const buttonSizes = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
} as const;

export const baseButtonClasses =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
