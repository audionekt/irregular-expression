/**
 * API endpoint constants
 * Centralized location for all API routes to make updates easier
 */

// Base API paths
export const API_BASE = '/api/v1';

// Blog Post endpoints
export const BLOG_POSTS_ENDPOINTS = {
  BASE: `${API_BASE}/posts`,
  BY_ID: (id: number | string) => `${API_BASE}/posts/${id}`,
  BY_SLUG: (slug: string) => `${API_BASE}/posts/slug/${slug}`,
} as const;

// Tag endpoints
export const TAG_ENDPOINTS = {
  BASE: `${API_BASE}/tags`,
  BY_ID: (id: number | string) => `${API_BASE}/tags/${id}`,
  BY_SLUG: (slug: string) => `${API_BASE}/tags/slug/${slug}`,
} as const;

// User endpoints
export const USER_ENDPOINTS = {
  BASE: `${API_BASE}/users`,
  BY_ID: (id: number | string) => `${API_BASE}/users/${id}`,
  BY_USERNAME: (username: string) => `${API_BASE}/users/username/${username}`,
} as const;

// Media endpoints
export const MEDIA_ENDPOINTS = {
  BASE: `${API_BASE}/media`,
  BY_ID: (id: number | string) => `${API_BASE}/media/${id}`,
  UPLOAD: `${API_BASE}/media/upload`,
} as const;

// Export all endpoints
export const API_ENDPOINTS = {
  BLOG_POSTS: BLOG_POSTS_ENDPOINTS,
  TAGS: TAG_ENDPOINTS,
  USERS: USER_ENDPOINTS,
  MEDIA: MEDIA_ENDPOINTS,
} as const;

