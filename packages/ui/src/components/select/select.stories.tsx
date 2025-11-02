import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './select';

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helper: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: countryOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
  },
};

export const Required: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    required: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Select Country',
    options: countryOptions,
    placeholder: 'Choose a country...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    error: 'Please select a country',
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    helper: 'Select your country of residence',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Region',
    options: [
      { value: 'na', label: 'North America' },
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico', disabled: true },
      { value: 'eu', label: 'Europe' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany', disabled: true },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'us',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    fullWidth: true,
  },
};

export const ManyOptions: Story = {
  args: {
    label: 'Choose a Number',
    options: Array.from({ length: 100 }, (_, i) => ({
      value: (i + 1).toString(),
      label: `Option ${i + 1}`,
    })),
  },
};

