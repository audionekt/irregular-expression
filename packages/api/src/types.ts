export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string; // MDX string
  status: 'draft' | 'published';
  publishedAt: string;
  coverImage?: string;
  tags: string[];
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string; // MDX
  technologies: string[];
  coverImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ImageUploadResponse {
  url: string; // CloudFront CDN URL
  key: string;
}

export interface AuthResponse {
  token: string;
  user: { 
    id: string; 
    email: string; 
    name: string; 
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'editor';
}

export interface FetchPostsParams {
  status?: 'draft' | 'published';
  tag?: string;
  limit?: number;
  offset?: number;
}

export interface FetchProjectsParams {
  status?: 'draft' | 'published';
  technology?: string;
  limit?: number;
  offset?: number;
}

export interface CreatePostInput {
  title: string;
  description: string;
  content: string;
  tags: string[];
  coverImage?: string;
  status: 'draft' | 'published';
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  content: string;
  technologies: string[];
  coverImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  status: 'draft' | 'published';
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}
