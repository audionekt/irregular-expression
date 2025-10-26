# Testing Guide

This monorepo uses **Jest** and **React Testing Library** for testing React components and applications.

## Philosophy

Our testing approach follows these principles:
- ✅ **Test real component behavior** - Test how users interact with components
- ✅ **Minimal mocking** - Only mock when absolutely necessary (e.g., Next.js fonts, external APIs)
- ✅ **Integration over unit** - Test components as they work together
- ✅ **Coverage enforcement** - 80% coverage threshold for all code

## Running Tests

### Run all tests
```bash
pnpm test
```

### Run tests for a specific package
```bash
# UI package
cd packages/ui && pnpm test

# Blog app
cd apps/blog && pnpm test

# CMS app
cd apps/cms && pnpm test
```

### Watch mode (for development)
```bash
pnpm test:watch
```

### Generate coverage report
```bash
pnpm test:coverage
```

## Coverage Thresholds

All packages enforce **80% coverage** for:
- Branches
- Functions
- Lines
- Statements

### What's excluded from coverage:
- Storybook files (`*.stories.tsx`)
- Configuration files (`*.config.ts`, `jest.config.js`)
- Type definition files (`*.d.ts`)
- Barrel export files (`index.ts`)
- Next.js app directory files (layouts, pages - tested via integration)

## Project Structure

```
portfolio-monorepo/
├── jest.setup.js                 # Shared Jest setup
├── packages/
│   └── ui/
│       ├── jest.config.js        # UI package Jest config
│       └── src/
│           └── components/
│               └── Button/
│                   ├── Button.tsx
│                   └── Button.test.tsx   # Component tests
└── apps/
    ├── blog/
    │   ├── jest.config.js        # Blog app Jest config
    │   └── src/
    │       └── app/
    │           └── __tests__/
    │               └── page.test.tsx
    └── cms/
        ├── jest.config.js        # CMS app Jest config
        └── src/
            └── app/
                └── __tests__/
                    └── page.test.tsx
```

## Writing Tests

### Example: Testing a Button Component

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### When to Mock

Only mock when absolutely necessary:

#### ✅ **DO Mock:**
- Next.js fonts (require Next.js runtime)
  ```typescript
  jest.mock('next/font/google', () => ({
    Geist: () => ({ variable: '--font-geist-sans' }),
  }));
  ```
- External API calls
- Browser-only APIs (window, localStorage)

#### ❌ **DON'T Mock:**
- React components (test them as users would use them)
- Props and state
- Event handlers
- CSS imports (handled by identity-obj-proxy)
- Component logic

## Best Practices

1. **Use semantic queries**
   ```typescript
   // ✅ Good - accessible and user-focused
   screen.getByRole('button', { name: /submit/i })
   
   // ❌ Avoid - implementation details
   container.querySelector('.submit-button')
   ```

2. **Test user interactions**
   ```typescript
   // ✅ Good - tests real user behavior
   const user = userEvent.setup();
   await user.click(button);
   
   // ❌ Avoid - bypasses real interaction
   fireEvent.click(button);
   ```

3. **Test accessibility**
   ```typescript
   expect(button).toHaveAttribute('aria-label', 'Submit form');
   expect(button).not.toBeDisabled();
   ```

4. **Write descriptive test names**
   ```typescript
   // ✅ Good
   it('disables button and prevents clicks when loading')
   
   // ❌ Avoid
   it('works correctly')
   ```

## Troubleshooting

### Tests fail with module resolution errors
Make sure your `jest.config.js` has proper `moduleNameMapper` entries for workspace packages:

```javascript
moduleNameMapper: {
  '^@repo/ui$': '<rootDir>/../../packages/ui/src/index.ts',
  '^@repo/styles$': '<rootDir>/../../packages/styles/src/index.ts',
}
```

### Coverage not meeting thresholds
Run with verbose coverage to see what's missing:
```bash
pnpm test:coverage --verbose
```

### CSS import errors
CSS imports are automatically handled by `identity-obj-proxy` in the Jest config.

## CI/CD Integration

Add to your CI pipeline:
```yaml
- name: Run tests
  run: pnpm test:coverage
  
- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Dependencies

- `jest` - Test runner
- `@testing-library/react` - React testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers
- `@testing-library/user-event` - User interaction simulation
- `ts-jest` - TypeScript support
- `jest-environment-jsdom` - DOM environment for React
- `identity-obj-proxy` - CSS module mocking

