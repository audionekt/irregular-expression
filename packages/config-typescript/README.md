# @repo/config-typescript

Shared TypeScript configurations for the monorepo.

## Configurations

### `base.json`
Base TypeScript configuration with strict settings and modern ES features. This is the foundation that other configurations extend from.

### `nextjs.json`
TypeScript configuration optimized for Next.js applications. Extends `base.json` and adds:
- Next.js plugin support
- Path mapping for `@/*` imports
- Next.js specific file includes

### `react-library.json`
TypeScript configuration for React library packages. Extends `base.json` and adds:
- Declaration file generation
- Output directory configuration
- Composite project support

## Usage

### In Next.js Apps
```json
{
  "extends": "@repo/config-typescript/nextjs.json"
}
```

### In React Libraries
```json
{
  "extends": "@repo/config-typescript/react-library.json"
}
```

### Custom Configuration
```json
{
  "extends": "@repo/config-typescript/base.json",
  "compilerOptions": {
    // Your custom options
  }
}
```

## Features

- **Strict Type Checking**: Enables all strict TypeScript flags
- **Modern ES Features**: Targets ES2017 with modern libraries
- **React Support**: Optimized for React and JSX
- **Path Mapping**: Supports `@/*` imports
- **Incremental Compilation**: Faster builds with incremental compilation
- **Declaration Files**: Generates `.d.ts` files for libraries
