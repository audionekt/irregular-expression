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
      options: ['default', 'featured', 'outlined'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Chip size',
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
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
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

export const WithCustomClassName: Story = {
  args: {
    className: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    children: 'Custom Color',
  },
};

