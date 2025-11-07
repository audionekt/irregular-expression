import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { lightTheme, darkTheme } from '../../styles';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Input } from '../../components/input';
import { Typography } from '../../components/typography';

const meta = {
  title: 'Design System/Theme',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ThemeShowcase = () => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <div className={theme} style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Theme Toggle */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <Typography variant="h2">
            {isDark ? '🌙 Dark' : '☀️ Light'} Theme
          </Typography>
          <Button onClick={() => setIsDark(!isDark)}>
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </Button>
        </div>

        {/* Component Showcase */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <Card padding="lg">
            <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
              Primary Card
            </Typography>
            <Typography variant="p" style={{ marginBottom: '1rem' }}>
              Cards automatically adapt to the current theme, adjusting backgrounds and borders.
            </Typography>
            <Button variant="primary" fullWidth>
              Primary Action
            </Button>
          </Card>

          <Card variant="elevated" padding="lg">
            <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
              Elevated Card
            </Typography>
            <Typography variant="p" style={{ marginBottom: '1rem' }}>
              Elevated variant uses shadows for depth in both light and dark modes.
            </Typography>
            <Button variant="secondary" fullWidth>
              Secondary Action
            </Button>
          </Card>

          <Card variant="outlined" padding="lg">
            <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
              Outlined Card
            </Typography>
            <Typography variant="p" style={{ marginBottom: '1rem' }}>
              Outlined cards provide a lighter visual weight with border emphasis.
            </Typography>
            <Button variant="ghost" fullWidth>
              Ghost Action
            </Button>
          </Card>
        </div>

        {/* Form Components */}
        <Card padding="lg" style={{ marginBottom: '2rem' }}>
          <Typography variant="h3" style={{ marginBottom: '1.5rem' }}>
            Form Components
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              helperText="Must be at least 8 characters"
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button variant="primary">Submit</Button>
              <Button variant="secondary">Cancel</Button>
            </div>
          </div>
        </Card>

        {/* State Colors */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <Button variant="success" fullWidth>
            Success State
          </Button>
          <Button variant="danger" fullWidth>
            Error State
          </Button>
          <Input
            state="success"
            value="Valid input"
            helperText="Looks good!"
          />
          <Input
            state="error"
            value="Invalid input"
            errorMessage="Please check this field"
          />
        </div>

        {/* Typography Scale */}
        <Card padding="lg">
          <Typography variant="h1" style={{ marginBottom: '0.5rem' }}>
            Heading 1
          </Typography>
          <Typography variant="h2" style={{ marginBottom: '0.5rem' }}>
            Heading 2
          </Typography>
          <Typography variant="h3" style={{ marginBottom: '0.5rem' }}>
            Heading 3
          </Typography>
          <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
            Heading 4
          </Typography>
          <Typography variant="p" style={{ marginBottom: '0.5rem' }}>
            Body text that adapts to the theme with proper foreground colors.
          </Typography>
          <Typography variant="caption">
            Caption text • Smaller and muted
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export const InteractiveThemeSwitch: Story = {
  render: () => <ThemeShowcase />,
};

const SideBySide = () => (
  <div style={{ display: 'flex', minHeight: '100vh' }}>
    {/* Light Theme */}
    <div className={lightTheme} style={{ flex: 1, padding: '2rem' }}>
      <Typography variant="h2" style={{ marginBottom: '1.5rem' }}>
        ☀️ Light Theme
      </Typography>
      
      <Card padding="lg" style={{ marginBottom: '1rem' }}>
        <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
          Card Component
        </Typography>
        <Typography variant="p">
          Default card in light theme with subtle background and borders.
        </Typography>
      </Card>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <Input
        label="Email"
        placeholder="Enter your email"
        style={{ marginBottom: '1rem' }}
      />
    </div>

    {/* Dark Theme */}
    <div className={darkTheme} style={{ flex: 1, padding: '2rem' }}>
      <Typography variant="h2" style={{ marginBottom: '1.5rem' }}>
        🌙 Dark Theme
      </Typography>
      
      <Card padding="lg" style={{ marginBottom: '1rem' }}>
        <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
          Card Component
        </Typography>
        <Typography variant="p">
          Same card in dark theme with inverted charcoal scale.
        </Typography>
      </Card>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <Input
        label="Email"
        placeholder="Enter your email"
        style={{ marginBottom: '1rem' }}
      />
    </div>
  </div>
);

export const SideBySideComparison: Story = {
  render: () => <SideBySide />,
};

const ColorAdaptation = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    {[
      { name: 'Light Theme', theme: lightTheme },
      { name: 'Dark Theme', theme: darkTheme },
    ].map(({ name, theme }) => (
      <div key={name} className={theme} style={{ padding: '2rem' }}>
        <Typography variant="h3" style={{ marginBottom: '1rem' }}>
          {name}
        </Typography>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-semantic-background-base)' }}>
            <strong>background.base</strong>
          </div>
          <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-semantic-background-subtle)' }}>
            <strong>background.subtle</strong>
          </div>
          <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-semantic-background-muted)' }}>
            <strong>background.muted</strong>
          </div>
        </div>

        <div style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '2px solid var(--color-semantic-border-default)',
          marginBottom: '1rem'
        }}>
          <Typography variant="p" style={{ color: 'var(--color-semantic-foreground-primary)' }}>
            <strong>foreground.primary</strong> - Main text content
          </Typography>
          <Typography variant="p" style={{ color: 'var(--color-semantic-foreground-secondary)' }}>
            <strong>foreground.secondary</strong> - Secondary text
          </Typography>
          <Typography variant="p" style={{ color: 'var(--color-semantic-foreground-tertiary)' }}>
            <strong>foreground.tertiary</strong> - Tertiary text
          </Typography>
          <Typography variant="p" style={{ color: 'var(--color-semantic-foreground-muted)' }}>
            <strong>foreground.muted</strong> - Muted text
          </Typography>
        </div>
      </div>
    ))}
  </div>
);

export const SemanticColorAdaptation: Story = {
  render: () => <ColorAdaptation />,
};

