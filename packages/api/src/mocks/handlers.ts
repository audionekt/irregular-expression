import { http, HttpResponse } from 'msw';
import { mockBlogPosts, mockPortfolioProjects } from './data';

// Blog Posts Handlers
export const blogHandlers = [
  // Get all posts
  http.get('/api/posts', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const tag = url.searchParams.get('tag');
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    let filteredPosts = mockBlogPosts;

    if (status) {
      filteredPosts = filteredPosts.filter(post => post.status === status);
    }

    if (tag) {
      filteredPosts = filteredPosts.filter(post => post.tags.includes(tag));
    }

    const start = offset ? parseInt(offset) : 0;
    const end = limit ? start + parseInt(limit) : undefined;
    const paginatedPosts = filteredPosts.slice(start, end);

    return HttpResponse.json(paginatedPosts);
  }),

  // Get single post by slug
  http.get('/api/posts/:slug', ({ params }) => {
    const { slug } = params;
    const post = mockBlogPosts.find(p => p.slug === slug);
    
    if (!post) {
      return HttpResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(post);
  }),

  // Create new post
  http.post('/api/posts', async ({ request }) => {
    const newPost = await request.json();
    const post = {
      id: (mockBlogPosts.length + 1).toString(),
      slug: newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...newPost,
      publishedAt: new Date().toISOString(),
    };
    
    mockBlogPosts.unshift(post);
    return HttpResponse.json(post, { status: 201 });
  }),

  // Update post
  http.put('/api/posts/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json();
    const index = mockBlogPosts.findIndex(p => p.id === id);
    
    if (index === -1) {
      return HttpResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    mockBlogPosts[index] = { ...mockBlogPosts[index], ...updates };
    return HttpResponse.json(mockBlogPosts[index]);
  }),

  // Delete post
  http.delete('/api/posts/:id', ({ params }) => {
    const { id } = params;
    const index = mockBlogPosts.findIndex(p => p.id === id);
    
    if (index === -1) {
      return HttpResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    mockBlogPosts.splice(index, 1);
    return HttpResponse.json({ success: true });
  }),
];

// Portfolio Projects Handlers
export const projectHandlers = [
  // Get all projects
  http.get('/api/projects', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const technology = url.searchParams.get('technology');
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    let filteredProjects = mockPortfolioProjects;

    if (status) {
      filteredProjects = filteredProjects.filter(project => project.status === status);
    }

    if (technology) {
      filteredProjects = filteredProjects.filter(project => 
        project.technologies.includes(technology)
      );
    }

    const start = offset ? parseInt(offset) : 0;
    const end = limit ? start + parseInt(limit) : undefined;
    const paginatedProjects = filteredProjects.slice(start, end);

    return HttpResponse.json(paginatedProjects);
  }),

  // Get single project by slug
  http.get('/api/projects/:slug', ({ params }) => {
    const { slug } = params;
    const project = mockPortfolioProjects.find(p => p.slug === slug);
    
    if (!project) {
      return HttpResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(project);
  }),

  // Create new project
  http.post('/api/projects', async ({ request }) => {
    const newProject = await request.json();
    const project = {
      id: (mockPortfolioProjects.length + 1).toString(),
      slug: newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...newProject,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockPortfolioProjects.unshift(project);
    return HttpResponse.json(project, { status: 201 });
  }),

  // Update project
  http.put('/api/projects/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json();
    const index = mockPortfolioProjects.findIndex(p => p.id === id);
    
    if (index === -1) {
      return HttpResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    mockPortfolioProjects[index] = { 
      ...mockPortfolioProjects[index], 
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(mockPortfolioProjects[index]);
  }),

  // Delete project
  http.delete('/api/projects/:id', ({ params }) => {
    const { id } = params;
    const index = mockPortfolioProjects.findIndex(p => p.id === id);
    
    if (index === -1) {
      return HttpResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    mockPortfolioProjects.splice(index, 1);
    return HttpResponse.json({ success: true });
  }),
];

// Image Upload Handler
export const imageHandlers = [
  http.post('/api/images/upload', async ({ request }) => {
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock CDN URL
    const mockUrl = `https://cdn.example.com/images/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
    const mockKey = `images/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
    
    return HttpResponse.json({
      url: mockUrl,
      key: mockKey,
    });
  }),
];

// Authentication Handlers
export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    
    // Mock authentication - accept any email/password
    if (email && password) {
      return HttpResponse.json({
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '1',
          email,
          name: 'John Doe',
        },
      });
    }
    
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ success: true });
  }),

  http.get('/api/auth/me', () => {
    return HttpResponse.json({
      id: '1',
      email: 'john@example.com',
      name: 'John Doe',
    });
  }),
];

// Export all handlers
export const handlers = [
  ...blogHandlers,
  ...projectHandlers,
  ...imageHandlers,
  ...authHandlers,
];
