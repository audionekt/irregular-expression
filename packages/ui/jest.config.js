/** @type {import('jest').Config} */
module.exports = {
  displayName: '@repo/ui',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/../../jest.setup.js'],
  
  // TypeScript transformation
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  
  // Module resolution
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@repo/styles$': '<rootDir>/../styles/src/index.ts',
    '^@repo/styles/(.*)$': '<rootDir>/../styles/src/$1',
    // Handle CSS imports (Tailwind, CSS modules, etc.)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{ts,tsx}',
  ],
  
  // Files to exclude from testing
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.storybook/',
    '/dist/',
    '/build/',
    '\\.stories\\.(ts|tsx)$', // Exclude Storybook files
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}', // Exclude Storybook files
    '!src/**/index.{ts,tsx}',     // Exclude barrel exports
    '!src/**/*.d.ts',              // Exclude type definitions
  ],
  
  // Coverage thresholds - enforcing good test coverage
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.storybook/',
    '\\.stories\\.(ts|tsx)$',
  ],
  
  // Coverage reporters for CI
  coverageReporters: ['text', 'lcov', 'html', 'cobertura'],
  
  // Better error messages
  verbose: true,
};

