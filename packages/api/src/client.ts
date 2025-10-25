import { 
  BlogPost, 
  PortfolioProject, 
  ImageUploadResponse, 
  AuthResponse, 
  FetchPostsParams, 
  FetchProjectsParams,
  CreatePostInput,
  UpdatePostInput,
  CreateProjectInput,
  UpdateProjectInput
} from './types';
import { 
  BlogPostSchema, 
  PortfolioProjectSchema, 
  ImageUploadResponseSchema, 
  AuthResponseSchema,
  CreatePostInputSchema,
  UpdatePostInputSchema,
  CreateProjectInputSchema,
  UpdateProjectInputSchema
} from './schemas';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Blog Posts API
export async function fetchPosts(params?: FetchPostsParams): Promise<BlogPost[]> {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set('status', params.status);
  if (params?.tag) searchParams.set('tag', params.tag);
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.offset) searchParams.set('offset', params.offset.toString());

  const res = await fetch(`${API_BASE_URL}/api/posts?${searchParams}`);
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
  
  const data = await res.json();
  return BlogPostSchema.array().parse(data);
}

export async function fetchPost(slug: string): Promise<BlogPost> {
  const res = await fetch(`${API_BASE_URL}/api/posts/${slug}`);
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.statusText}`);
  
  const data = await res.json();
  return BlogPostSchema.parse(data);
}

export async function createPost(post: CreatePostInput): Promise<BlogPost> {
  CreatePostInputSchema.parse(post);
  
  const res = await fetch(`${API_BASE_URL}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  
  if (!res.ok) throw new Error(`Failed to create post: ${res.statusText}`);
  
  const data = await res.json();
  return BlogPostSchema.parse(data);
}

export async function updatePost(post: UpdatePostInput): Promise<BlogPost> {
  UpdatePostInputSchema.parse(post);
  
  const res = await fetch(`${API_BASE_URL}/api/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  
  if (!res.ok) throw new Error(`Failed to update post: ${res.statusText}`);
  
  const data = await res.json();
  return BlogPostSchema.parse(data);
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) throw new Error(`Failed to delete post: ${res.statusText}`);
}

// Portfolio Projects API
export async function fetchProjects(params?: FetchProjectsParams): Promise<PortfolioProject[]> {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set('status', params.status);
  if (params?.technology) searchParams.set('technology', params.technology);
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.offset) searchParams.set('offset', params.offset.toString());

  const res = await fetch(`${API_BASE_URL}/api/projects?${searchParams}`);
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.statusText}`);
  
  const data = await res.json();
  return PortfolioProjectSchema.array().parse(data);
}

export async function fetchProject(slug: string): Promise<PortfolioProject> {
  const res = await fetch(`${API_BASE_URL}/api/projects/${slug}`);
  if (!res.ok) throw new Error(`Failed to fetch project: ${res.statusText}`);
  
  const data = await res.json();
  return PortfolioProjectSchema.parse(data);
}

export async function createProject(project: CreateProjectInput): Promise<PortfolioProject> {
  CreateProjectInputSchema.parse(project);
  
  const res = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  
  if (!res.ok) throw new Error(`Failed to create project: ${res.statusText}`);
  
  const data = await res.json();
  return PortfolioProjectSchema.parse(data);
}

export async function updateProject(project: UpdateProjectInput): Promise<PortfolioProject> {
  UpdateProjectInputSchema.parse(project);
  
  const res = await fetch(`${API_BASE_URL}/api/projects/${project.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  
  if (!res.ok) throw new Error(`Failed to update project: ${res.statusText}`);
  
  const data = await res.json();
  return PortfolioProjectSchema.parse(data);
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) throw new Error(`Failed to delete project: ${res.statusText}`);
}

// Image Upload API
export async function uploadImage(file: File): Promise<ImageUploadResponse> {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE_URL}/api/images/upload`, {
    method: 'POST',
    body: formData,
  });
  
  if (!res.ok) throw new Error(`Failed to upload image: ${res.statusText}`);
  
  const data = await res.json();
  return ImageUploadResponseSchema.parse(data);
}

// Authentication API
export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!res.ok) throw new Error(`Failed to login: ${res.statusText}`);
  
  const data = await res.json();
  return AuthResponseSchema.parse(data);
}

export async function logout(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
  });
  
  if (!res.ok) throw new Error(`Failed to logout: ${res.statusText}`);
}

export async function getCurrentUser(): Promise<AuthResponse['user']> {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`);
  
  if (!res.ok) throw new Error(`Failed to get current user: ${res.statusText}`);
  
  const data = await res.json();
  return AuthResponseSchema.shape.user.parse(data);
}
