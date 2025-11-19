import type { Meta, StoryObj } from '@storybook/react';
import { Form, FormSection, FormGrid, FormActions } from './form';
import { Input } from '../input';
import { TextArea } from '../textarea';
import { Dropdown } from '../dropdown';
import { Button } from '../button';

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicForm: Story = {
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <Input label="Name" placeholder="Enter your name" required fullWidth />
      <Input label="Email" type="email" placeholder="email@example.com" required fullWidth />
      <TextArea label="Message" placeholder="Your message..." rows={4} fullWidth />
      <FormActions>
        <Button type="button" variant="ghost">Cancel</Button>
        <Button type="submit" variant="primary">Submit</Button>
      </FormActions>
    </Form>
  ),
};

export const WithSections: Story = {
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <FormSection
        title="Personal Information"
        description="Basic details about you"
      >
        <Input label="Full Name" placeholder="John Doe" required fullWidth />
        <Input label="Email" type="email" placeholder="john@example.com" required fullWidth />
        <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" fullWidth />
      </FormSection>

      <FormSection
        title="Address"
        description="Where do you live?"
      >
        <Input label="Street Address" placeholder="123 Main St" fullWidth />
        <FormGrid columns={2}>
          <Input label="City" placeholder="New York" />
          <Input label="State" placeholder="NY" />
        </FormGrid>
        <Input label="Zip Code" placeholder="10001" fullWidth />
      </FormSection>

      <FormActions>
        <Button type="button" variant="ghost">Cancel</Button>
        <Button type="submit" variant="primary">Save Changes</Button>
      </FormActions>
    </Form>
  ),
};

export const WithGrid: Story = {
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <FormSection title="Contact Form">
        <FormGrid columns={2}>
          <Input label="First Name" placeholder="John" required />
          <Input label="Last Name" placeholder="Doe" required />
        </FormGrid>
        <Input label="Email" type="email" placeholder="john@example.com" required fullWidth />
        <FormGrid columns={2}>
          <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
          <Dropdown
            label="Country"
            options={['United States', 'Canada', 'United Kingdom']}
            placeholder="Select country"
          />
        </FormGrid>
        <TextArea label="Message" placeholder="How can we help you?" rows={5} fullWidth />
      </FormSection>
      <FormActions align="right">
        <Button type="button" variant="secondary">Save Draft</Button>
        <Button type="submit" variant="primary">Send Message</Button>
      </FormActions>
    </Form>
  ),
};

export const MultiColumnLayout: Story = {
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <FormSection title="User Registration">
        <FormGrid columns={3}>
          <Input label="First Name" placeholder="John" required />
          <Input label="Middle Name" placeholder="M" />
          <Input label="Last Name" placeholder="Doe" required />
        </FormGrid>
        <FormGrid columns={2}>
          <Input label="Email" type="email" placeholder="john@example.com" required />
          <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
        </FormGrid>
        <FormGrid columns={4}>
          <Input label="Age" type="number" placeholder="25" />
          <Dropdown
            label="Gender"
            options={['Male', 'Female', 'Other']}
            placeholder="Select gender"
          />
          <Input label="City" placeholder="New York" />
          <Input label="Zip" placeholder="10001" />
        </FormGrid>
      </FormSection>
      <FormActions>
        <Button type="button" variant="ghost">Cancel</Button>
        <Button type="submit" variant="primary">Register</Button>
      </FormActions>
    </Form>
  ),
};

export const ActionsAlignment: Story = {
  render: () => (
    <div className="space-y-8">
      <Form onSubmit={(e) => { e.preventDefault(); }}>
        <FormSection title="Left Aligned Actions">
          <Input label="Name" placeholder="Enter name" fullWidth />
        </FormSection>
        <FormActions align="left">
          <Button variant="primary">Save</Button>
          <Button variant="ghost">Cancel</Button>
        </FormActions>
      </Form>

      <Form onSubmit={(e) => { e.preventDefault(); }}>
        <FormSection title="Center Aligned Actions">
          <Input label="Name" placeholder="Enter name" fullWidth />
        </FormSection>
        <FormActions align="center">
          <Button variant="primary">Submit</Button>
        </FormActions>
      </Form>

      <Form onSubmit={(e) => { e.preventDefault(); }}>
        <FormSection title="Right Aligned Actions (Default)">
          <Input label="Name" placeholder="Enter name" fullWidth />
        </FormSection>
        <FormActions>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save</Button>
        </FormActions>
      </Form>
    </div>
  ),
};

