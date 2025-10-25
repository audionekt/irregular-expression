import React from "react";
import Image, { type ImageProps } from "next/image";

interface BlogImageProps extends ImageProps {
  src: string;
  alt: string;
  caption?: string;
}

interface CodeBlockProps extends React.ComponentPropsWithoutRef<"pre"> {
  children: React.ReactNode;
  language?: string;
}

interface CalloutProps extends React.ComponentPropsWithoutRef<"div"> {
  type?: "info" | "warning" | "error" | "success";
  children: React.ReactNode;
}

// Custom MDX Components
export const mdxComponents = {
  // Custom image component with Next.js Image optimization
  BlogImage: ({ src, alt, caption, ...props }: BlogImageProps) => (
    <figure style={{ margin: "2rem 0" }}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "0.5rem",
        }}
        {...props}
      />
      {caption && (
        <figcaption
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#6b7280",
            marginTop: "0.5rem",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  ),

  // Code block with syntax highlighting
  CodeBlock: ({ children, language, ...props }: CodeBlockProps) => (
    <pre
      style={{
        backgroundColor: "#1f2937",
        color: "#f9fafb",
        padding: "1.5rem",
        borderRadius: "0.5rem",
        overflow: "auto",
        margin: "1.5rem 0",
        fontSize: "0.875rem",
        lineHeight: "1.5",
      }}
      {...props}
    >
      <code className={language ? `language-${language}` : ""}>{children}</code>
    </pre>
  ),

  // Callout component for info/warning boxes
  Callout: ({ type = "info", children, ...props }: CalloutProps) => {
    const colors = {
      info: { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
      warning: { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" },
      error: { bg: "#fee2e2", border: "#ef4444", text: "#991b1b" },
      success: { bg: "#d1fae5", border: "#10b981", text: "#065f46" },
    };

    const colorScheme = colors[type];

    return (
      <div
        style={{
          backgroundColor: colorScheme.bg,
          borderLeft: `4px solid ${colorScheme.border}`,
          padding: "1rem",
          margin: "1.5rem 0",
          borderRadius: "0 0.5rem 0.5rem 0",
        }}
        {...props}
      >
        <div style={{ color: colorScheme.text }}>{children}</div>
      </div>
    );
  },

  // Custom heading with anchor links
  h1: ({ children, ...props }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1
      style={{
        fontSize: "2.25rem",
        fontWeight: 800,
        lineHeight: 1.2,
        marginBottom: "1.5rem",
        marginTop: "2rem",
        color: "#111827",
      }}
      {...props}
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      style={{
        fontSize: "1.875rem",
        fontWeight: 700,
        lineHeight: 1.3,
        marginBottom: "1rem",
        marginTop: "2rem",
        color: "#111827",
      }}
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      style={{
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: "0.75rem",
        marginTop: "1.5rem",
        color: "#111827",
      }}
      {...props}
    >
      {children}
    </h3>
  ),

  // Custom paragraph with better spacing
  p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p
      style={{
        marginBottom: "1.5rem",
        lineHeight: 1.7,
        color: "#374151",
      }}
      {...props}
    >
      {children}
    </p>
  ),

  // Custom link styling
  a: ({ children, href, ...props }: React.ComponentPropsWithoutRef<"a">) => (
    <a
      href={href}
      style={{
        color: "#2563eb",
        textDecoration: "underline",
        textDecorationColor: "#93c5fd",
        textUnderlineOffset: "2px",
      }}
      {...props}
    >
      {children}
    </a>
  ),

  // Custom blockquote
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      style={{
        borderLeft: "4px solid #e5e7eb",
        paddingLeft: "1rem",
        margin: "1.5rem 0",
        fontStyle: "italic",
        color: "#6b7280",
        backgroundColor: "#f9fafb",
        padding: "1rem",
        borderRadius: "0 0.5rem 0.5rem 0",
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Custom code inline
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      style={{
        backgroundColor: "#f3f4f6",
        padding: "0.125rem 0.25rem",
        borderRadius: "0.25rem",
        fontSize: "0.875em",
        fontFamily: "JetBrains Mono, monospace",
        color: "#dc2626",
      }}
      {...props}
    >
      {children}
    </code>
  ),
};

// Prose wrapper for MDX content
export const MDXProse = ({ children }: { children: React.ReactNode }) => (
  <div className="prose prose-gray max-w-none">{children}</div>
);
