import type { Meta, StoryObj } from '@storybook/react';
import { colors } from '../colors';

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Color Swatch Component
const ColorSwatch = ({ name, value, large = false }: { name: string; value: string; large?: boolean }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '0.5rem',
    minWidth: large ? '200px' : '150px',
  }}>
    <div
      style={{
        height: large ? '120px' : '80px',
        borderRadius: '8px',
        backgroundColor: value,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
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
      <span style={{ 
        fontFamily: 'monospace', 
        fontSize: '0.75rem',
        color: '#6b7280'
      }}>
        {value}
      </span>
    </div>
  </div>
);

const ColorScale = ({ title, scale }: { title: string; scale: Record<string, string> }) => (
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
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '1rem'
    }}>
      {Object.entries(scale).map(([key, value]) => (
        <ColorSwatch key={key} name={key} value={value} />
      ))}
    </div>
  </div>
);

const SemanticGroup = ({ title, group }: { title: string; group: Record<string, string> }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ 
      fontSize: '1.125rem', 
      fontWeight: 600, 
      marginBottom: '1rem',
      color: '#1a1816'
    }}>
      {title}
    </h3>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '1rem'
    }}>
      {Object.entries(group).map(([key, value]) => (
        <ColorSwatch key={key} name={key} value={value} large />
      ))}
    </div>
  </div>
);

export const PrimitiveCharcoal: Story = {
  render: () => <ColorScale title="Charcoal" scale={colors.primitive.charcoal} />,
};

export const PrimitiveGold: Story = {
  render: () => <ColorScale title="Gold" scale={colors.primitive.gold} />,
};

export const PrimitiveSage: Story = {
  render: () => <ColorScale title="Sage" scale={colors.primitive.sage} />,
};

export const PrimitiveTerracotta: Story = {
  render: () => <ColorScale title="Terracotta" scale={colors.primitive.terracotta} />,
};

export const AllPrimitives: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1816' }}>
        Primitive Color Scales
      </h2>
      <p style={{ marginBottom: '2rem', color: '#58534e', lineHeight: 1.6 }}>
        Foundational color scales that form the basis of the Aurigami design system.
      </p>
      <ColorScale title="Charcoal" scale={colors.primitive.charcoal} />
      <ColorScale title="Gold" scale={colors.primitive.gold} />
      <ColorScale title="Sage" scale={colors.primitive.sage} />
      <ColorScale title="Terracotta" scale={colors.primitive.terracotta} />
    </div>
  ),
};

export const SemanticBrand: Story = {
  render: () => <SemanticGroup title="Brand Colors" group={colors.semantic.brand} />,
};

export const SemanticBackground: Story = {
  render: () => <SemanticGroup title="Background Colors" group={colors.semantic.background} />,
};

export const SemanticForeground: Story = {
  render: () => <SemanticGroup title="Foreground Colors" group={colors.semantic.foreground} />,
};

export const SemanticBorder: Story = {
  render: () => <SemanticGroup title="Border Colors" group={colors.semantic.border} />,
};

export const SemanticStates: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1816' }}>
        Semantic State Colors
      </h2>
      <SemanticGroup title="Success" group={colors.semantic.success} />
      <SemanticGroup title="Error" group={colors.semantic.error} />
      <SemanticGroup title="Warning" group={colors.semantic.warning} />
      <SemanticGroup title="Info" group={colors.semantic.info} />
    </div>
  ),
};

export const AllSemanticColors: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1816' }}>
        Semantic Colors
      </h2>
      <p style={{ marginBottom: '2rem', color: '#58534e', lineHeight: 1.6 }}>
        Purpose-driven color mappings for consistent UI implementation. These colors adapt to light and dark themes.
      </p>
      <SemanticGroup title="Brand" group={colors.semantic.brand} />
      <SemanticGroup title="Background" group={colors.semantic.background} />
      <SemanticGroup title="Foreground" group={colors.semantic.foreground} />
      <SemanticGroup title="Border" group={colors.semantic.border} />
      <SemanticGroup title="Success" group={colors.semantic.success} />
      <SemanticGroup title="Error" group={colors.semantic.error} />
      <SemanticGroup title="Warning" group={colors.semantic.warning} />
      <SemanticGroup title="Info" group={colors.semantic.info} />
    </div>
  ),
};

export const ColorUsageExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1816' }}>
        Color Usage Examples
      </h2>
      
      {/* Primary Button */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#58534e' }}>
          Primary Button
        </h3>
        <button style={{
          backgroundColor: colors.semantic.brand.primary,
          color: colors.semantic.foreground.onBrand,
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}>
          Click Me
        </button>
      </div>

      {/* Card */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#58534e' }}>
          Card Component
        </h3>
        <div style={{
          backgroundColor: colors.semantic.background.base,
          border: `1px solid ${colors.semantic.border.default}`,
          borderRadius: '0.75rem',
          padding: '1.5rem',
          maxWidth: '400px',
        }}>
          <h4 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 600, 
            color: colors.semantic.foreground.primary,
            marginBottom: '0.5rem'
          }}>
            Card Title
          </h4>
          <p style={{ 
            color: colors.semantic.foreground.secondary,
            lineHeight: 1.6
          }}>
            This card uses semantic background and border colors for consistency.
          </p>
        </div>
      </div>

      {/* Alert States */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#58534e' }}>
          Alert States
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { type: 'Success', colors: colors.semantic.success },
            { type: 'Error', colors: colors.semantic.error },
            { type: 'Warning', colors: colors.semantic.warning },
            { type: 'Info', colors: colors.semantic.info },
          ].map(({ type, colors: stateColors }) => (
            <div
              key={type}
              style={{
                backgroundColor: stateColors.subtle,
                border: `1px solid ${stateColors.border}`,
                borderRadius: '0.5rem',
                padding: '1rem',
                maxWidth: '400px',
              }}
            >
              <strong style={{ color: stateColors.text }}>{type}:</strong>{' '}
              <span style={{ color: stateColors.text }}>
                This is a {type.toLowerCase()} message
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

