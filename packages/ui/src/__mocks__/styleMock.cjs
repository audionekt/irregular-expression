// Mock for vanilla-extract .css.ts files in Jest
// This creates a recursive proxy that returns 'mock-class' for any property access

const MOCK_CLASS_NAME = 'mock-class';

// Create a handler that works recursively  
const createProxyHandler = () => ({
  get: (_target, prop) => {
    // Don't mock special React/internal properties
    if (
      typeof prop === 'symbol' ||
      prop === 'then' ||
      prop === '$$typeof' ||
      prop === 'constructor' ||
      prop === 'nodeType' ||
      prop === 'inspect'
    ) {
      return undefined;
    }

    // For toString/valueOf, return the mock class name
    if (prop === 'toString' || prop === 'valueOf') {
      return () => MOCK_CLASS_NAME;
    }

    // Return a new proxy for any other property access
    // This handles chaining like styles.variants.primary or styles.sizes[size]
    return new Proxy({}, createProxyHandler());
  },
  
  // Support using the proxy as a string in template literals
  toString: () => MOCK_CLASS_NAME,
  valueOf: () => MOCK_CLASS_NAME,
});

// Create the base mock object
const mockStyles = new Proxy({}, createProxyHandler());

// Export as default for `import * as styles from './component.css'`
module.exports = mockStyles;
module.exports.default = mockStyles;

