import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Avatar size',
    },
    src: {
      control: 'text',
      description: 'Image URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
    },
    fallback: {
      control: 'text',
      description: 'Fallback text when image fails to load',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    alt: 'Felix Anderson',
    size: 'md',
  },
};

export const WithoutImage: Story = {
  args: {
    alt: 'John Doe',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Small',
    alt: 'Small Avatar',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Medium',
    alt: 'Medium Avatar',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Large',
    alt: 'Large Avatar',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Small"
        alt="Small"
        size="sm"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Medium"
        alt="Medium"
        size="md"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Large"
        alt="Large"
        size="lg"
      />
    </div>
  ),
};

export const Fallbacks: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar alt="Mike Johnson" size="md" />
      <Avatar alt="Sarah Williams" size="md" />
      <Avatar alt="Alex Chen" size="md" />
      <Avatar alt="Emma Davis" size="md" fallback="ED" />
    </div>
  ),
};

export const BrokenImageFallback: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    alt: 'User Name',
    size: 'md',
  },
};

export const TeamExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Avatar
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
          alt="Mike Johnson"
          size="sm"
        />
        <span style={{ fontSize: '14px' }}>Mike Johnson</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Avatar
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
          alt="Sarah Williams"
          size="sm"
        />
        <span style={{ fontSize: '14px' }}>Sarah Williams</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Avatar
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
          alt="Alex Chen"
          size="sm"
        />
        <span style={{ fontSize: '14px' }}>Alex Chen</span>
      </div>
    </div>
  ),
};

