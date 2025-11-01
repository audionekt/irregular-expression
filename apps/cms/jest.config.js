/** @type {import('jest').Config} */
module.exports = {
  displayName: 'cms',
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
    '^aurigami$': '<rootDir>/../../packages/ui/src/index.ts',
    '^@repo/styles$': '<rootDir>/../../packages/styles/src/index.ts',
    '^@repo/styles/(.*)$': '<rootDir>/../../packages/styles/src/$1',
    '^@repo/tokens$': '<rootDir>/../../packages/tokens/src/index.ts',
    // Handle CSS imports
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
    '/.next/',
    '/dist/',
    '/build/',
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/app/**/layout.tsx',      // Exclude Next.js root layouts
    '!src/**/*.d.ts',              // Exclude type definitions
    '!src/**/__tests__/**',        // Exclude test files
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Coverage reporters for CI
  coverageReporters: ['text', 'lcov', 'html', 'cobertura'],
  
  // Better error messages
  verbose: true,
};

