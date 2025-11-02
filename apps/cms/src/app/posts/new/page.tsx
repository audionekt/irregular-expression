'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Button,
  Input,
  TextArea,
  Select,
  Form,
  FormSection,
  FormGrid,
  FormActions,
  Card,
  Chip,
} from 'aurigami';
import { useCreateBlogPost, useTags, PostStatus } from '@repo/api';
import type { CreateBlogPostRequest } from '@repo/api';

export default function NewPostPage() {
  const router = useRouter();
  const createPost = useCreateBlogPost();
  const { data: tagsData } = useTags({ page: 0, size: 100 });

  const [formData, setFormData] = useState<Partial<CreateBlogPostRequest>>({
    title: '',
    slug: '',
    mdxContent: '',
    excerpt: '',
    status: PostStatus.DRAFT,
    featured: false,
    tagIds: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.slug) newErrors.slug = 'Slug is required';
    if (!formData.mdxContent) newErrors.mdxContent = 'Content is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createPost.mutateAsync(formData as CreateBlogPostRequest);
      router.push('/');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleInputChange = (field: keyof CreateBlogPostRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="md"
                onClick={() => router.back()}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                Back
              </Button>
              <div>
                <Typography variant="h2">Create New Post</Typography>
                <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
                  Fill in the details below to publish your blog post
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Chip variant={formData.status === PostStatus.PUBLISHED ? 'default' : 'outlined'}>
                {formData.status === PostStatus.PUBLISHED ? '✅ Published' : '📄 Draft'}
              </Chip>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <FormSection
                  title="Post Content"
                  description="Write your blog post content here"
                >
                  <Input
                    label="Title"
                    placeholder="Enter an engaging title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    error={errors.title}
                    required
                    fullWidth
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    }
                  />

                  <Input
                    label="Slug"
                    placeholder="post-url-slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    helper="URL-friendly version of the title (auto-generated if left empty)"
                    fullWidth
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    }
                  />

                  <TextArea
                    label="Excerpt"
                    placeholder="A brief summary of your post..."
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    helper="Short description shown in post previews (150-200 characters recommended)"
                    fullWidth
                  />

                  <TextArea
                    label="Content"
                    placeholder="Write your post content here. Supports MDX..."
                    rows={16}
                    value={formData.mdxContent}
                    onChange={(e) => handleInputChange('mdxContent', e.target.value)}
                    error={errors.mdxContent}
                    required
                    fullWidth
                    resize="vertical"
                  />
                </FormSection>
              </Card>

              <Card>
                <FormSection title="SEO & Metadata" description="Optimize your post for search engines">
                  <FormGrid columns={2}>
                    <Input
                      label="Meta Title"
                      placeholder="SEO title..."
                      value={formData.metaTitle}
                      onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                      helper="Shown in search results"
                      fullWidth
                    />

                    <Input
                      label="Reading Time (minutes)"
                      type="number"
                      placeholder="5"
                      value={formData.readingTimeMinutes}
                      onChange={(e) => handleInputChange('readingTimeMinutes', parseInt(e.target.value))}
                      helper="Estimated reading time"
                      fullWidth
                    />
                  </FormGrid>

                  <TextArea
                    label="Meta Description"
                    placeholder="Description for search engines..."
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                    helper="Shown in search engine results (150-160 characters)"
                    fullWidth
                  />
                </FormSection>
              </Card>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="space-y-6">
              <Card>
                <FormSection title="Publish Settings">
                  <Select
                    label="Status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    options={[
                      { value: PostStatus.DRAFT, label: '📄 Draft' },
                      { value: PostStatus.PUBLISHED, label: '✅ Published' },
                      { value: PostStatus.ARCHIVED, label: '📦 Archived' },
                    ]}
                    fullWidth
                  />

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div>
                      <Typography variant="p" className="font-medium mb-1">
                        Featured Post
                      </Typography>
                      <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
                        Show on homepage
                      </Typography>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </FormSection>
              </Card>

              <Card>
                <FormSection title="Tags" description="Categorize your post">
                  <Select
                    label="Select Tags"
                    value=""
                    onChange={(e) => {
                      const tagId = parseInt(e.target.value);
                      if (tagId && !formData.tagIds?.includes(tagId)) {
                        handleInputChange('tagIds', [...(formData.tagIds || []), tagId]);
                      }
                    }}
                    options={[
                      { value: '', label: 'Choose a tag...' },
                      ...(tagsData?.content || []).map((tag) => ({
                        value: tag.id.toString(),
                        label: tag.name,
                      })),
                    ]}
                    fullWidth
                  />

                  {formData.tagIds && formData.tagIds.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tagIds.map((tagId) => {
                        const tag = tagsData?.content.find((t) => t.id === tagId);
                        return tag ? (
                          <Chip
                            key={tagId}
                            variant="default"
                            className="cursor-pointer"
                            onClick={() => {
                              handleInputChange(
                                'tagIds',
                                formData.tagIds?.filter((id) => id !== tagId)
                              );
                            }}
                          >
                            {tag.name} ×
                          </Chip>
                        ) : null;
                      })}
                    </div>
                  )}
                </FormSection>
              </Card>

              <Card>
                <FormSection title="Featured Image">
                  <div className="space-y-4">
                    <Input
                      label="Image URL"
                      placeholder="https://..."
                      value={formData.featuredImageUrl}
                      onChange={(e) => handleInputChange('featuredImageUrl', e.target.value)}
                      helper="URL of the featured image"
                      fullWidth
                      leftIcon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      }
                    />

                    {formData.featuredImageUrl && (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={formData.featuredImageUrl}
                          alt="Featured preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </FormSection>
              </Card>
            </div>
          </div>

          {/* Form Actions */}
          <Card className="sticky bottom-4 shadow-lg">
            <FormActions align="between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    handleInputChange('status', PostStatus.DRAFT);
                    setTimeout(handleSubmit, 0);
                  }}
                  isLoading={createPost.isPending}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  }
                >
                  Save as Draft
                </Button>
                
                <Button
                  type="submit"
                  variant="success"
                  isLoading={createPost.isPending}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  }
                >
                  Publish Post
                </Button>
              </div>
            </FormActions>
          </Card>
        </Form>
      </div>
    </div>
  );
}

