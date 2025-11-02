// Tailwind CSS utility classes
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

// Common component class combinations
export const buttonVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary: "bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 focus:ring-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700",
  ghost: "hover:bg-gray-100 text-gray-700 hover:text-gray-900 active:bg-gray-200 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-md focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600",
  success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-sm hover:shadow-md focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600",
} as const;

export const buttonSizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-lg",
} as const;

export const baseButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";
