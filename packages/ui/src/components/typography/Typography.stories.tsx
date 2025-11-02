import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'p', 'caption'],
      description: 'Typography variant',
    },
    as: {
      control: 'text',
      description: 'HTML element to render',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
};

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children: 'This is a paragraph of text. It uses the default paragraph styling with proper color and spacing.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is caption text, typically used for metadata or secondary information.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <Typography variant="h1">Heading 1 - Main Title</Typography>
      <Typography variant="h2">Heading 2 - Section Title</Typography>
      <Typography variant="h3">Heading 3 - Subsection</Typography>
      <Typography variant="h4">Heading 4 - Minor Heading</Typography>
      <Typography variant="p">
        This is a paragraph with regular body text. It's perfect for longer content that needs good readability.
      </Typography>
      <Typography variant="caption">
        Caption text • 5 min read • Jan 15, 2024
      </Typography>
    </div>
  ),
};

export const CustomElement: Story = {
  args: {
    variant: 'p',
    as: 'div',
    children: 'This is a div element with paragraph styling',
  },
};

export const WithCustomClassName: Story = {
  args: {
    variant: 'h2',
    className: 'text-blue-600 underline',
    children: 'Custom Styled Heading',
  },
};

