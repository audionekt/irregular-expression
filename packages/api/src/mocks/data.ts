import {
  BlogPostResponse,
  TagResponse,
  UserResponse,
  MediaResponse,
  PostStatus,
  UserRole,
  MediaType,
} from '../types';

// Mock Users
export const mockUsers: UserResponse[] = [
  {
    id: 1,
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    bio: 'Senior Full Stack Developer and Technical Writer',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    role: UserRole.ADMIN,
    active: true,
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    bio: 'UI/UX Designer and Frontend Developer',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    role: UserRole.AUTHOR,
    active: true,
    createdAt: '2023-02-20T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: 3,
    email: 'mike.johnson@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    username: 'mikejohnson',
    bio: 'DevOps Engineer and Cloud Architect',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    role: UserRole.AUTHOR,
    active: true,
    createdAt: '2023-03-10T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
  },
];

// Mock Tags
export const mockTags: TagResponse[] = [
  {
    id: 1,
    name: 'Next.js',
    slug: 'nextjs',
    postCount: 3,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'TypeScript',
    slug: 'typescript',
    postCount: 5,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 3,
    name: 'React',
    slug: 'react',
    postCount: 4,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 4,
    name: 'Web Development',
    slug: 'web-development',
    postCount: 6,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 5,
    name: 'CSS',
    slug: 'css',
    postCount: 2,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: 6,
    name: 'Architecture',
    slug: 'architecture',
    postCount: 2,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
  },
  {
    id: 7,
    name: 'Performance',
    slug: 'performance',
    postCount: 1,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
  },
  {
    id: 8,
    name: 'Tutorial',
    slug: 'tutorial',
    postCount: 3,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
];

// Mock Media
export const mockMedia: MediaResponse[] = [
  {
    id: 1,
    fileName: 'nextjs-blog-cover.jpg',
    originalFileName: 'blog-header-nextjs.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    contentType: 'image/jpeg',
    fileSize: 245680,
    mediaType: MediaType.IMAGE,
    width: 1200,
    height: 600,
    altText: 'Modern web development setup with code editor',
    caption: 'Building modern applications with Next.js',
    uploadedBy: {
      id: 1,
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    },
    uploadedAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 2,
    fileName: 'css-styling-cover.jpg',
    originalFileName: 'styling-comparison.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
    contentType: 'image/jpeg',
    fileSize: 198420,
    mediaType: MediaType.IMAGE,
    width: 1200,
    height: 600,
    altText: 'CSS styling and design tools',
    caption: 'Modern CSS approaches comparison',
    uploadedBy: {
      id: 2,
      username: 'janesmith',
      firstName: 'Jane',
      lastName: 'Smith',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    },
    uploadedAt: '2024-01-10T13:00:00Z',
    updatedAt: '2024-01-10T13:00:00Z',
  },
  {
    id: 3,
    fileName: 'monorepo-architecture.jpg',
    originalFileName: 'architecture-diagram.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    contentType: 'image/jpeg',
    fileSize: 312450,
    mediaType: MediaType.IMAGE,
    width: 1200,
    height: 600,
    altText: 'Software architecture diagram',
    caption: 'Monorepo architecture visualization',
    uploadedBy: {
      id: 3,
      username: 'mikejohnson',
      firstName: 'Mike',
      lastName: 'Johnson',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    },
    uploadedAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-05T08:00:00Z',
  },
];

// Mock Blog Posts
export const mockBlogPosts: BlogPostResponse[] = [
  {
    id: 1,
    slug: 'building-a-modern-blog-with-nextjs',
    title: 'Building a Modern Blog with Next.js',
    excerpt: 'Learn how to build a sophisticated blog using Next.js 15, TypeScript, and modern web technologies.',
    mdxContent: `# Building a Modern Blog with Next.js

This is a comprehensive guide to building a modern blog using Next.js 15, TypeScript, and cutting-edge web technologies.

## What We'll Cover

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **MDX** for rich content
- **Vanilla Extract** for styling
- **MSW** for API mocking

## Getting Started

First, let's set up our project structure:

\`\`\`bash
npx create-next-app@latest my-blog --typescript --tailwind --app
\`\`\`

## Key Features

Our blog will include:

1. **Server-Side Rendering (SSR)** for fast initial loads
2. **Incremental Static Regeneration (ISR)** for dynamic content
3. **MDX Support** for rich, interactive content
4. **Type-Safe API** with Zod validation
5. **Modern Styling** with Vanilla Extract

## Conclusion

Building a modern blog with Next.js provides excellent performance, developer experience, and user experience. The combination of SSR, ISR, and modern tooling makes it a powerful choice for content-driven websites.

![Blog Architecture](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

> This blog post demonstrates the power of modern web development with Next.js and TypeScript.`,
    featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    featuredMedia: {
      id: 1,
      fileName: 'nextjs-blog-cover.jpg',
      fileUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
      contentType: 'image/jpeg',
      mediaType: MediaType.IMAGE,
    },
    author: {
      id: 1,
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    },
    tags: [
      { id: 1, name: 'Next.js', slug: 'nextjs' },
      { id: 2, name: 'TypeScript', slug: 'typescript' },
      { id: 4, name: 'Web Development', slug: 'web-development' },
      { id: 8, name: 'Tutorial', slug: 'tutorial' },
    ],
    status: PostStatus.PUBLISHED,
    metaTitle: 'Building a Modern Blog with Next.js | Complete Guide',
    metaDescription: 'Learn how to build a sophisticated blog using Next.js 15, TypeScript, and modern web technologies in this comprehensive guide.',
    metaKeywords: 'Next.js, TypeScript, Blog, Web Development, Tutorial',
    publishedAt: '2024-01-15T10:00:00Z',
    viewCount: 1250,
    readingTimeMinutes: 8,
    allowComments: true,
    featured: true,
    createdAt: '2024-01-14T15:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    slug: 'vanilla-extract-vs-tailwind-css',
    title: 'Vanilla Extract vs Tailwind CSS: A Developer\'s Perspective',
    excerpt: 'Comparing Vanilla Extract and Tailwind CSS for styling modern React applications.',
    mdxContent: `# Vanilla Extract vs Tailwind CSS

When choosing a styling solution for React applications, developers often debate between Vanilla Extract and Tailwind CSS. Let's explore both approaches.

## Vanilla Extract

Vanilla Extract is a **zero-runtime** CSS-in-TypeScript library that provides:

- **Type Safety**: Full TypeScript support for styles
- **Zero Runtime**: Styles are extracted at build time
- **Component Scoping**: Automatic CSS scoping
- **Theme Contracts**: Type-safe design tokens

\`\`\`typescript
import { recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: {
    padding: '12px 24px',
    borderRadius: '8px',
  },
  variants: {
    variant: {
      primary: { backgroundColor: 'blue' },
      secondary: { backgroundColor: 'gray' },
    },
  },
});
\`\`\`

## Tailwind CSS

Tailwind CSS is a **utility-first** CSS framework that offers:

- **Rapid Development**: Pre-built utility classes
- **Responsive Design**: Mobile-first approach
- **Customization**: Extensive configuration options
- **Performance**: PurgeCSS removes unused styles

\`\`\`jsx
<button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click me
</button>
\`\`\`

## The Verdict

Both approaches have their merits:

- **Choose Vanilla Extract** if you value type safety and component encapsulation
- **Choose Tailwind** if you prioritize rapid development and utility-first approach

For our monorepo, we chose Vanilla Extract for its type safety and zero-runtime benefits.`,
    featuredImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
    featuredMedia: {
      id: 2,
      fileName: 'css-styling-cover.jpg',
      fileUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
      contentType: 'image/jpeg',
      mediaType: MediaType.IMAGE,
    },
    author: {
      id: 2,
      username: 'janesmith',
      firstName: 'Jane',
      lastName: 'Smith',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    },
    tags: [
      { id: 5, name: 'CSS', slug: 'css' },
      { id: 3, name: 'React', slug: 'react' },
      { id: 2, name: 'TypeScript', slug: 'typescript' },
    ],
    status: PostStatus.PUBLISHED,
    metaTitle: 'Vanilla Extract vs Tailwind CSS | Developer Comparison',
    metaDescription: 'Comparing Vanilla Extract and Tailwind CSS for styling modern React applications.',
    metaKeywords: 'CSS, Tailwind, Vanilla Extract, React, Styling',
    publishedAt: '2024-01-10T14:30:00Z',
    viewCount: 875,
    readingTimeMinutes: 6,
    allowComments: true,
    featured: false,
    createdAt: '2024-01-09T10:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: 3,
    slug: 'monorepo-architecture-best-practices',
    title: 'Monorepo Architecture: Best Practices for Modern Development',
    excerpt: 'Explore best practices for organizing and managing monorepos in modern web development.',
    mdxContent: `# Monorepo Architecture: Best Practices

Monorepos have become increasingly popular in modern web development. Here's how to structure them effectively.

## What is a Monorepo?

A monorepo is a single repository containing multiple related projects. It offers:

- **Shared Code**: Common utilities and components
- **Atomic Changes**: Cross-project changes in single commits
- **Simplified CI/CD**: Single task for all projects
- **Consistent Tooling**: Shared configurations

## Structure Best Practices

\`\`\`
monorepo/
├── apps/
│   ├── web/          # Main application
│   ├── mobile/       # Mobile app
│   └── docs/         # Documentation site
├── packages/
│   ├── ui/           # Shared components
│   ├── utils/        # Shared utilities
│   └── config/       # Shared configurations
└── tools/
    ├── build/        # Build tools
    └── scripts/      # Development scripts
\`\`\`

## Tooling Recommendations

- **Turborepo**: Build system and caching
- **pnpm**: Fast package manager
- **Changesets**: Version management
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Benefits

1. **Code Reuse**: Share components across projects
2. **Consistency**: Unified coding standards
3. **Efficiency**: Single setup for multiple projects
4. **Collaboration**: Easier team coordination

Monorepos are powerful when used correctly, but require careful planning and tooling to be effective.`,
    featuredImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    featuredMedia: {
      id: 3,
      fileName: 'monorepo-architecture.jpg',
      fileUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
      contentType: 'image/jpeg',
      mediaType: MediaType.IMAGE,
    },
    author: {
      id: 3,
      username: 'mikejohnson',
      firstName: 'Mike',
      lastName: 'Johnson',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    },
    tags: [
      { id: 6, name: 'Architecture', slug: 'architecture' },
      { id: 4, name: 'Web Development', slug: 'web-development' },
      { id: 7, name: 'Performance', slug: 'performance' },
    ],
    status: PostStatus.PUBLISHED,
    metaTitle: 'Monorepo Architecture Best Practices | Modern Development',
    metaDescription: 'Explore best practices for organizing and managing monorepos in modern web development.',
    metaKeywords: 'Monorepo, Architecture, Development, Best Practices',
    publishedAt: '2024-01-05T09:15:00Z',
    viewCount: 1520,
    readingTimeMinutes: 7,
    allowComments: true,
    featured: true,
    createdAt: '2024-01-04T12:00:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
  },
];
