"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  MessageSquare,
  Link as LinkIcon,
  Image,
  Check,
  Bell,
} from "lucide-react";
import {
  Typography,
  Button,
  Input,
  TextArea,
  Dropdown,
  Checkbox,
  Form,
  FormSection,
  FormGrid,
  FormActions,
  Card,
  Chip,
} from "aurigami";
import { useCreateBlogPost, useTags, PostStatus } from "@repo/api";
import type { CreateBlogPostRequest, TagResponse } from "@repo/api";
import * as styles from "./page.css";

// Constants
const INITIAL_FORM_DATA: Partial<CreateBlogPostRequest> = {
  title: "",
  slug: "",
  mdxContent: "",
  excerpt: "",
  status: PostStatus.DRAFT,
  featured: false,
  tagIds: [],
  authorId: 1, // TODO: Replace with actual logged-in user ID
};

const STATUS_LABELS: Record<PostStatus, string> = {
  [PostStatus.DRAFT]: "📄 Draft",
  [PostStatus.PUBLISHED]: "✅ Published",
  [PostStatus.ARCHIVED]: "📦 Archived",
  [PostStatus.SCHEDULED]: "📅 Scheduled",
};

// Helper functions
function validateForm(
  data: Partial<CreateBlogPostRequest>
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.title) errors.title = "Title is required";
  if (!data.slug) errors.slug = "Slug is required";
  if (!data.mdxContent) errors.mdxContent = "Content is required";
  return errors;
}

function cleanFormData(
  data: Partial<CreateBlogPostRequest>
): CreateBlogPostRequest {
  return Object.entries(data).reduce((acc, [key, value]) => {
    // Skip empty strings, undefined, and empty arrays
    if (
      value === "" ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return acc;
    }
    return { ...acc, [key]: value };
  }, {} as CreateBlogPostRequest);
}

function extractErrorMessage(error: any): string {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.details ||
    (typeof error?.response?.data === "string" ? error?.response?.data : "") ||
    error?.message ||
    "Failed to create post. Please try again."
  );
}

export default function NewPostPage() {
  const router = useRouter();
  const createPost = useCreateBlogPost();
  const { data: tagsData } = useTags({ page: 0, size: 100 });

  const [formData, setFormData] =
    useState<Partial<CreateBlogPostRequest>>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");

  const handleSubmit = async () => {
    setSubmitError("");

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const cleanedData = cleanFormData(formData);
      await createPost.mutateAsync(cleanedData);
      router.push("/");
    } catch (error: any) {
      console.error("Failed to create post:", error);
      setSubmitError(extractErrorMessage(error));
    }
  };

  const handleInputChange = (
    field: keyof CreateBlogPostRequest,
    value: any
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleTagAdd = (tag: TagResponse) => {
    if (!formData.tagIds?.includes(tag.id)) {
      handleInputChange("tagIds", [...(formData.tagIds || []), tag.id]);
    }
  };

  const handleTagRemove = (tagId: number) => {
    handleInputChange(
      "tagIds",
      formData.tagIds?.filter((id) => id !== tagId)
    );
  };

  const handleSaveAsDraft = () => {
    handleInputChange("status", PostStatus.DRAFT);
    setTimeout(handleSubmit, 0);
  };

  return (
    <div className={styles.container}>
      <PageHeader
        status={formData.status || PostStatus.DRAFT}
        onBack={() => router.back()}
      />

      <div className={styles.formContainer}>
        <Form onSubmit={handleSubmit}>
          {submitError && <ErrorAlert message={submitError} />}

          <div className={styles.formGrid}>
            <div className={styles.mainColumn}>
              <PostContentSection
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />
              <SEOMetadataSection
                formData={formData}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.sidebar}>
              <PublishSettingsSection
                formData={formData}
                onChange={handleInputChange}
              />
              <TagsSection
                formData={formData}
                tags={tagsData?.content || []}
                onTagAdd={handleTagAdd}
                onTagRemove={handleTagRemove}
              />
              <FeaturedImageSection
                formData={formData}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <FormActionsCard
            isLoading={createPost.isPending}
            onCancel={() => router.back()}
            onSaveAsDraft={handleSaveAsDraft}
          />
        </Form>
      </div>
    </div>
  );
}

// Component: Page Header
interface PageHeaderProps {
  status: PostStatus;
  onBack: () => void;
}

function PageHeader({ status, onBack }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <Button
              variant="ghost"
              size="md"
              onClick={onBack}
              leftIcon={<ChevronLeft className={styles.svgIcon} />}
            >
              Back
            </Button>
            <div className={styles.headerTitles}>
              <Typography variant="h2">Create New Post</Typography>
              <Typography variant="caption">
                Fill in the details below to publish your blog post
              </Typography>
            </div>
          </div>

          <div className={styles.headerRight}>
            <Chip
              variant={status === PostStatus.PUBLISHED ? "default" : "outlined"}
            >
              {STATUS_LABELS[status]}
            </Chip>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component: Error Alert
interface ErrorAlertProps {
  message: string;
}

function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Card
      padding="md"
      style={{
        backgroundColor: "#fef2f2",
        border: "1px solid #fca5a5",
        marginBottom: "1.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "1.25rem" }}>⚠️</span>
        <div>
          <Typography
            variant="p"
            style={{
              fontWeight: 600,
              color: "#991b1b",
              marginBottom: "0.25rem",
            }}
          >
            Error Creating Post
          </Typography>
          <Typography
            variant="p"
            style={{ color: "#7f1d1d", fontSize: "0.875rem" }}
          >
            {message}
          </Typography>
        </div>
      </div>
    </Card>
  );
}

// Component: Post Content Section
interface PostContentSectionProps {
  formData: Partial<CreateBlogPostRequest>;
  errors: Record<string, string>;
  onChange: (field: keyof CreateBlogPostRequest, value: any) => void;
}

function PostContentSection({
  formData,
  errors,
  onChange,
}: PostContentSectionProps) {
  return (
    <Card padding="md">
      <FormSection
        title="Post Content"
        description="Write your blog post content here"
      >
        <Input
          label="Title"
          placeholder="Enter an engaging title..."
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          error={errors.title}
          required
          fullWidth
          leftIcon={<MessageSquare className={styles.svgIcon} />}
        />

        <Input
          label="Slug"
          placeholder="post-url-slug"
          value={formData.slug}
          onChange={(e) => onChange("slug", e.target.value)}
          helper="URL-friendly version of the title (auto-generated if left empty)"
          fullWidth
          leftIcon={<LinkIcon className={styles.svgIcon} />}
        />

        <TextArea
          label="Excerpt"
          placeholder="A brief summary of your post..."
          rows={3}
          value={formData.excerpt}
          onChange={(e) => onChange("excerpt", e.target.value)}
          helper="Short description shown in post previews (150-200 characters recommended)"
          fullWidth
        />

        <TextArea
          label="Content"
          placeholder="Write your post content here. Supports MDX..."
          rows={16}
          value={formData.mdxContent}
          onChange={(e) => onChange("mdxContent", e.target.value)}
          error={errors.mdxContent}
          required
          fullWidth
          resize="vertical"
        />
      </FormSection>
    </Card>
  );
}

// Component: SEO Metadata Section
interface SEOMetadataSectionProps {
  formData: Partial<CreateBlogPostRequest>;
  onChange: (field: keyof CreateBlogPostRequest, value: any) => void;
}

function SEOMetadataSection({ formData, onChange }: SEOMetadataSectionProps) {
  return (
    <Card>
      <FormSection
        title="SEO & Metadata"
        description="Optimize your post for search engines"
      >
        <FormGrid columns={2}>
          <Input
            label="Meta Title"
            placeholder="SEO title..."
            value={formData.metaTitle}
            onChange={(e) => onChange("metaTitle", e.target.value)}
            helper="Shown in search results"
            fullWidth
          />

          <Input
            label="Reading Time (minutes)"
            type="number"
            placeholder="5"
            value={formData.readingTimeMinutes}
            onChange={(e) =>
              onChange("readingTimeMinutes", parseInt(e.target.value))
            }
            helper="Estimated reading time"
            fullWidth
          />
        </FormGrid>

        <TextArea
          label="Meta Description"
          placeholder="Description for search engines..."
          rows={2}
          value={formData.metaDescription}
          onChange={(e) => onChange("metaDescription", e.target.value)}
          helper="Shown in search engine results (150-160 characters)"
          fullWidth
        />
      </FormSection>
    </Card>
  );
}

// Component: Publish Settings Section
interface PublishSettingsSectionProps {
  formData: Partial<CreateBlogPostRequest>;
  onChange: (field: keyof CreateBlogPostRequest, value: any) => void;
}

function PublishSettingsSection({
  formData,
  onChange,
}: PublishSettingsSectionProps) {
  return (
    <Card padding="md">
      <FormSection title="Publish Settings">
        <Dropdown
          label="Status"
          value={formData.status}
          onChange={(value) => onChange("status", value)}
          options={[
            PostStatus.DRAFT,
            PostStatus.PUBLISHED,
            PostStatus.ARCHIVED,
          ]}
          getItemLabel={(status) => (status ? STATUS_LABELS[status] : "")}
          fullWidth
        />

        <div className={styles.featuredToggle}>
          <Checkbox
            label="Featured Post"
            checked={formData.featured}
            onChange={(e) => onChange("featured", e.target.checked)}
            helper="Show on homepage"
          />
        </div>
      </FormSection>
    </Card>
  );
}

// Component: Tags Section
interface TagsSectionProps {
  formData: Partial<CreateBlogPostRequest>;
  tags: TagResponse[];
  onTagAdd: (tag: TagResponse) => void;
  onTagRemove: (tagId: number) => void;
}

function TagsSection({
  formData,
  tags,
  onTagAdd,
  onTagRemove,
}: TagsSectionProps) {
  return (
    <Card padding="md">
      <FormSection title="Tags" description="Categorize your post">
        <Dropdown
          label="Select Tags"
          value={undefined}
          onChange={(tag) => {
            if (tag && !Array.isArray(tag) && "id" in tag) {
              onTagAdd(tag as TagResponse);
            }
          }}
          options={tags}
          getItemLabel={(tag) => (tag && "name" in tag ? tag.name : "")}
          placeholder="Choose a tag..."
          fullWidth
        />

        {formData.tagIds && formData.tagIds.length > 0 && (
          <div className={styles.tagsContainer}>
            {formData.tagIds.map((tagId) => {
              const tag = tags.find((t) => t.id === tagId);
              return tag ? (
                <Chip
                  key={tagId}
                  variant="default"
                  style={{ cursor: "pointer" }}
                  onClick={() => onTagRemove(tagId)}
                >
                  {tag.name} ×
                </Chip>
              ) : null;
            })}
          </div>
        )}
      </FormSection>
    </Card>
  );
}

// Component: Featured Image Section
interface FeaturedImageSectionProps {
  formData: Partial<CreateBlogPostRequest>;
  onChange: (field: keyof CreateBlogPostRequest, value: any) => void;
}

function FeaturedImageSection({
  formData,
  onChange,
}: FeaturedImageSectionProps) {
  return (
    <Card padding="md">
      <FormSection title="Featured Image">
        <div className={styles.imageSection}>
          <Input
            label="Image URL"
            placeholder="https://..."
            value={formData.featuredImageUrl}
            onChange={(e) => onChange("featuredImageUrl", e.target.value)}
            helper="URL of the featured image"
            fullWidth
            leftIcon={<Image className={styles.svgIcon} />}
          />

          {formData.featuredImageUrl && (
            <div className={styles.imagePreview}>
              <img
                src={formData.featuredImageUrl}
                alt="Featured preview"
                className={styles.previewImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      </FormSection>
    </Card>
  );
}

// Component: Form Actions Card
interface FormActionsCardProps {
  isLoading: boolean;
  onCancel: () => void;
  onSaveAsDraft: () => void;
}

function FormActionsCard({
  isLoading,
  onCancel,
  onSaveAsDraft,
}: FormActionsCardProps) {
  return (
    <Card padding="md" className={styles.formActionsCard}>
      <FormActions align="between">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>

        <div className={styles.formActionsButtons}>
          <Button
            type="button"
            variant="secondary"
            onClick={onSaveAsDraft}
            loading={isLoading}
            leftIcon={<Check className={styles.svgIcon} />}
          >
            Save as Draft
          </Button>

          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            leftIcon={<Bell className={styles.svgIcon} />}
          >
            Publish Post
          </Button>
        </div>
      </FormActions>
    </Card>
  );
}
