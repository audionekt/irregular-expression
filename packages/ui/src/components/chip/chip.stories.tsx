import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'featured', 'outlined', 'success', 'warning', 'error'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Chip size',
    },
    color: {
      control: 'select',
      options: ['amethyst', 'sky', 'ruby', 'sage', 'gold', 'charcoal'],
      description: 'Color variant (overrides variant prop)',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Chip',
  },
};

export const Featured: Story = {
  args: {
    variant: 'featured',
    children: 'Featured',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip variant="default">Default</Chip>
      <Chip variant="featured">Featured</Chip>
      <Chip variant="outlined">Outlined</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="error">Error</Chip>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

export const TagsExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Chip>React</Chip>
      <Chip>TypeScript</Chip>
      <Chip>Next.js</Chip>
      <Chip>Vanilla Extract CSS</Chip>
      <Chip>Storybook</Chip>
      <Chip variant="featured">MSW</Chip>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip color="amethyst">Amethyst</Chip>
      <Chip color="sky">Sky</Chip>
      <Chip color="ruby">Ruby</Chip>
      <Chip color="sage">Sage</Chip>
      <Chip color="gold">Gold</Chip>
      <Chip color="charcoal">Charcoal</Chip>
    </div>
  ),
};

export const ColoredTagsExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Chip color="sky">React</Chip>
      <Chip color="amethyst">TypeScript</Chip>
      <Chip color="sage">Next.js</Chip>
      <Chip color="gold">Vanilla Extract</Chip>
      <Chip color="ruby">Storybook</Chip>
      <Chip color="charcoal">MSW</Chip>
    </div>
  ),
};

export const DismissibleChips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Chip color="sky" dismissible onDismiss={() => alert('Dismissed!')}>
        Dismissible Sky
      </Chip>
      <Chip color="sage" dismissible onDismiss={() => alert('Dismissed!')}>
        Dismissible Sage
      </Chip>
      <Chip color="ruby" dismissible onDismiss={() => alert('Dismissed!')}>
        Dismissible Ruby
      </Chip>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  args: {
    className: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    children: 'Custom Color',
  },
};

