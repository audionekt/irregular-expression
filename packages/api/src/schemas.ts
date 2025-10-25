import { z } from 'zod';

export const BlogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()),
  author: z.object({
    name: z.string(),
    avatar: z.string().optional(),
  }).optional(),
});

export const PortfolioProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  technologies: z.array(z.string()),
  coverImage: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  status: z.enum(['draft', 'published']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ImageUploadResponseSchema = z.object({
  url: z.string(),
  key: z.string(),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  }),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  role: z.enum(['admin', 'editor']),
});

export const CreatePostInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  coverImage: z.string().optional(),
  status: z.enum(['draft', 'published']),
});

export const UpdatePostInputSchema = CreatePostInputSchema.partial().extend({
  id: z.string(),
});

export const CreateProjectInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  technologies: z.array(z.string()),
  coverImage: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  status: z.enum(['draft', 'published']),
});

export const UpdateProjectInputSchema = CreateProjectInputSchema.partial().extend({
  id: z.string(),
});
