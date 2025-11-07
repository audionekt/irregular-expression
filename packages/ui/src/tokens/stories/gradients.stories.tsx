import type { Meta, StoryObj } from '@storybook/react';
import { gradients } from '../gradients';

const meta = {
  title: 'Design System/Gradients',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const GradientSwatch = ({ name, gradient }: { name: string; gradient: string }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '0.5rem',
    minWidth: '250px',
  }}>
    <div
      style={{
        height: '120px',
        borderRadius: '12px',
        background: gradient,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <span style={{ 
        fontFamily: 'monospace', 
        fontSize: '0.875rem',
        fontWeight: 600,
        color: '#374151'
      }}>
        {name}
      </span>
    </div>
  </div>
);

const GradientGroup = ({ title, group }: { title: string; group: Record<string, string> }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ 
      fontSize: '1.25rem', 
      fontWeight: 600, 
      marginBottom: '1rem',
      color: '#1a1816'
    }}>
      {title}
    </h3>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1.5rem'
    }}>
      {Object.entries(group).map(([key, value]) => (
        <GradientSwatch key={key} name={key} gradient={value} />
      ))}
    </div>
  </div>
);

export const BackgroundGradients: Story = {
  render: () => <GradientGroup title="Background Gradients" group={gradients.background} />,
};

export const BrandGradients: Story = {
  render: () => <GradientGroup title="Brand Gradients" group={gradients.brand} />,
};

export const OverlayGradients: Story = {
  render: () => (
    <div>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 600, 
        marginBottom: '1rem',
        color: '#1a1816'
      }}>
        Overlay Gradients
      </h3>
      <p style={{ marginBottom: '1rem', color: '#58534e' }}>
        Used for creating depth over images and content
      </p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {Object.entries(gradients.overlay).map(([key, value]) => (
          <div key={key} style={{ position: 'relative', height: '200px', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: value,
            }} />
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}>
              {key}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const MeshGradients: Story = {
  render: () => <GradientGroup title="Mesh Gradients" group={gradients.mesh} />,
};

export const ShimmerGradients: Story = {
  render: () => (
    <div>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 600, 
        marginBottom: '1rem',
        color: '#1a1816'
      }}>
        Shimmer Gradients
      </h3>
      <p style={{ marginBottom: '1rem', color: '#58534e' }}>
        Animated shimmer effects for loading states
      </p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {Object.entries(gradients.shimmer).map(([key, value]) => (
          <div key={key} style={{ 
            height: '120px',
            borderRadius: '12px',
            backgroundColor: key === 'gold' ? '#d4b568' : '#e5e7eb',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: value,
              animation: 'shimmer 2s infinite',
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
            }}>
              {key}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  ),
};

export const TextGradients: Story = {
  render: () => (
    <div>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 600, 
        marginBottom: '1rem',
        color: '#1a1816'
      }}>
        Text Gradients
      </h3>
      <p style={{ marginBottom: '1rem', color: '#58534e' }}>
        Apply to text using background-clip
      </p>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {Object.entries(gradients.text).map(([key, value]) => (
          <div key={key}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 700,
              background: value,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem',
            }}>
              Aurigami Design System
            </h2>
            <p style={{ 
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              text.{key}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const AllGradients: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1816' }}>
        Gradient System
      </h2>
      <p style={{ marginBottom: '2rem', color: '#58534e', lineHeight: 1.6 }}>
        Sophisticated gradients for backgrounds, overlays, and visual effects.
      </p>
      <GradientGroup title="Background" group={gradients.background} />
      <GradientGroup title="Brand" group={gradients.brand} />
      <GradientGroup title="Mesh" group={gradients.mesh} />
    </div>
  ),
};

export const GradientUsageExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1816' }}>
        Gradient Usage Examples
      </h2>

      {/* Hero Section */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#58534e' }}>
          Hero Section with Brand Gradient
        </h3>
        <div style={{
          background: gradients.brand.primary,
          borderRadius: '1rem',
          padding: '3rem 2rem',
          color: 'white',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Welcome to Aurigami
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
            A sophisticated design system with refined aesthetics
          </p>
        </div>
      </div>

      {/* Card with Mesh Background */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#58534e' }}>
          Card with Mesh Gradient Background
        </h3>
        <div style={{
          background: gradients.mesh.warm,
          borderRadius: '1rem',
          padding: '2rem',
          border: '1px solid #e5e7eb',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1816', marginBottom: '0.5rem' }}>
            Feature Card
          </h2>
          <p style={{ color: '#58534e', lineHeight: 1.6 }}>
            This card uses a subtle mesh gradient for added depth and visual interest without being overwhelming.
          </p>
        </div>
      </div>

      {/* Button with Accent Gradient */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#58534e' }}>
          Button with Accent Gradient
        </h3>
        <button style={{
          background: gradients.brand.accent,
          color: '#1a1816',
          padding: '1rem 2rem',
          borderRadius: '0.75rem',
          border: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}>
          Get Started
        </button>
      </div>

      {/* Hero Text Gradient */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#58534e' }}>
          Hero Text with Gradient
        </h3>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 700,
          background: gradients.text.hero,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.2,
        }}>
          Radular.
        </h1>
      </div>
    </div>
  ),
};

