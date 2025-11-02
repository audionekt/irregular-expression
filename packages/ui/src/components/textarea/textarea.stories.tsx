import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './textarea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    helper: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    rows: { control: 'number' },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    rows: 4,
  },
};

export const Required: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description',
    required: true,
    rows: 6,
  },
};

export const WithError: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Write your comment',
    error: 'Comment must be at least 10 characters',
    value: 'Too short',
    rows: 4,
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Share your thoughts...',
    helper: 'Your feedback helps us improve our product',
    rows: 5,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Read Only',
    value: 'This content cannot be edited.\nIt is for display purposes only.',
    disabled: true,
    rows: 3,
  },
};

export const NoResize: Story = {
  args: {
    label: 'Fixed Size',
    placeholder: 'Cannot resize this textarea',
    resize: 'none',
    rows: 4,
  },
};

export const HorizontalResize: Story = {
  args: {
    label: 'Horizontal Resize',
    placeholder: 'Can resize horizontally',
    resize: 'horizontal',
    rows: 4,
  },
};

export const LargeTextArea: Story = {
  args: {
    label: 'Blog Post',
    placeholder: 'Write your blog post content here...',
    rows: 15,
    fullWidth: true,
  },
};

