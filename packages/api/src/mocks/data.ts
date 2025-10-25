import { BlogPost, PortfolioProject } from '../types';

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'building-a-modern-blog-with-nextjs',
    title: 'Building a Modern Blog with Next.js',
    description: 'Learn how to build a sophisticated blog using Next.js 15, TypeScript, and modern web technologies.',
    content: `# Building a Modern Blog with Next.js

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
    status: 'published',
    publishedAt: '2024-01-15T10:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    tags: ['Next.js', 'TypeScript', 'Web Development', 'Tutorial'],
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: '2',
    slug: 'vanilla-extract-vs-tailwind-css',
    title: 'Vanilla Extract vs Tailwind CSS: A Developer\'s Perspective',
    description: 'Comparing Vanilla Extract and Tailwind CSS for styling modern React applications.',
    content: `# Vanilla Extract vs Tailwind CSS

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
    status: 'published',
    publishedAt: '2024-01-10T14:30:00Z',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
    tags: ['CSS', 'Styling', 'React', 'Comparison'],
    author: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: '3',
    slug: 'monorepo-architecture-best-practices',
    title: 'Monorepo Architecture: Best Practices for Modern Development',
    description: 'Explore best practices for organizing and managing monorepos in modern web development.',
    content: `# Monorepo Architecture: Best Practices

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
    status: 'published',
    publishedAt: '2024-01-05T09:15:00Z',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    tags: ['Monorepo', 'Architecture', 'Development', 'Best Practices'],
    author: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    }
  }
];

export const mockPortfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js, TypeScript, and PostgreSQL.',
    content: `# E-Commerce Platform

A comprehensive e-commerce solution built with modern web technologies.

## Technologies Used

- **Frontend**: Next.js 15, TypeScript, Vanilla Extract
- **Backend**: Node.js, Express, PostgreSQL
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Deployment**: Vercel, Railway

## Key Features

- Product catalog with search and filtering
- Shopping cart and checkout process
- User authentication and profiles
- Admin dashboard for inventory management
- Payment processing with Stripe
- Order tracking and management

## Architecture

The platform follows a microservices architecture with separate services for:

- User management
- Product catalog
- Order processing
- Payment handling
- Notification system

## Performance Optimizations

- Server-side rendering for SEO
- Image optimization with Next.js Image
- Database query optimization
- CDN integration for static assets
- Caching strategies

## Results

- **99.9%** uptime
- **< 2s** page load times
- **95%** Lighthouse score
- **$50k+** in processed transactions`,
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Vercel'],
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/username/ecommerce-platform',
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    slug: 'task-management-app',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    content: `# Task Management App

A modern task management application designed for teams and individuals.

## Features

- **Real-time Collaboration**: Live updates across all connected clients
- **Project Organization**: Hierarchical project and task structure
- **Team Management**: User roles and permissions
- **Time Tracking**: Built-in time tracking for tasks
- **Notifications**: Real-time notifications for updates
- **Mobile Support**: Responsive design for all devices

## Tech Stack

- **Frontend**: React, TypeScript, Chakra UI
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io for live updates
- **Authentication**: JWT with refresh tokens
- **Deployment**: Docker, AWS ECS

## Architecture Highlights

- **Event-driven architecture** for real-time updates
- **Microservices** for scalability
- **GraphQL API** for efficient data fetching
- **Redis** for caching and session management
- **Elasticsearch** for advanced search capabilities

## Performance Metrics

- **< 100ms** real-time update latency
- **99.5%** uptime
- **10k+** concurrent users supported
- **< 1s** initial load time`,
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS'],
    coverImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=600&fit=crop',
    liveUrl: 'https://taskmanager-demo.vercel.app',
    githubUrl: 'https://github.com/username/task-manager',
    status: 'published',
    createdAt: '2023-12-15T00:00:00Z',
    updatedAt: '2024-01-10T15:30:00Z'
  }
];
