import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormSection, FormGrid, FormActions } from './Form';

describe('Form', () => {
  it('renders children', () => {
    render(
      <Form>
        <div>Form content</div>
      </Form>
    );
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('prevents default form submission', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn((e) => {
      expect(e.defaultPrevented).toBe(true);
    });

    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('calls onSubmit handler', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Form className="custom-form-class">
        <div>Content</div>
      </Form>
    );
    expect(container.querySelector('form')).toHaveClass('custom-form-class');
  });

  it('applies default spacing classes', () => {
    const { container } = render(
      <Form>
        <div>Content</div>
      </Form>
    );
    expect(container.querySelector('form')).toHaveClass('space-y-6');
  });
});

describe('FormSection', () => {
  it('renders children', () => {
    render(
      <FormSection>
        <div>Section content</div>
      </FormSection>
    );
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <FormSection title="Personal Information">
        <div>Fields</div>
      </FormSection>
    );
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <FormSection description="Enter your basic details">
        <div>Fields</div>
      </FormSection>
    );
    expect(screen.getByText('Enter your basic details')).toBeInTheDocument();
  });

  it('renders title as h3 element', () => {
    render(
      <FormSection title="Contact Details">
        <div>Fields</div>
      </FormSection>
    );
    const title = screen.getByText('Contact Details');
    expect(title.tagName).toBe('H3');
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormSection className="custom-section">
        <div>Content</div>
      </FormSection>
    );
    expect(container.querySelector('.custom-section')).toBeInTheDocument();
  });

  it('applies default spacing', () => {
    const { container } = render(
      <FormSection>
        <div>Content</div>
      </FormSection>
    );
    expect(container.querySelector('.space-y-4')).toBeInTheDocument();
  });
});

describe('FormGrid', () => {
  it('renders children', () => {
    render(
      <FormGrid>
        <div>Grid item 1</div>
        <div>Grid item 2</div>
      </FormGrid>
    );
    expect(screen.getByText('Grid item 1')).toBeInTheDocument();
    expect(screen.getByText('Grid item 2')).toBeInTheDocument();
  });

  it('applies 2 column grid by default', () => {
    const { container } = render(
      <FormGrid>
        <div>Item</div>
      </FormGrid>
    );
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('md:grid-cols-2');
  });

  it('applies 1 column grid', () => {
    const { container } = render(
      <FormGrid columns={1}>
        <div>Item</div>
      </FormGrid>
    );
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('grid-cols-1');
    expect(grid?.className).not.toContain('md:grid-cols-2');
  });

  it('applies 3 column grid', () => {
    const { container } = render(
      <FormGrid columns={3}>
        <div>Item</div>
      </FormGrid>
    );
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('lg:grid-cols-3');
  });

  it('applies 4 column grid', () => {
    const { container } = render(
      <FormGrid columns={4}>
        <div>Item</div>
      </FormGrid>
    );
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('lg:grid-cols-4');
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormGrid className="custom-grid">
        <div>Item</div>
      </FormGrid>
    );
    expect(container.querySelector('.custom-grid')).toBeInTheDocument();
  });

  it('applies gap spacing', () => {
    const { container } = render(
      <FormGrid>
        <div>Item</div>
      </FormGrid>
    );
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('gap-4');
  });
});

describe('FormActions', () => {
  it('renders children', () => {
    render(
      <FormActions>
        <button>Submit</button>
        <button>Cancel</button>
      </FormActions>
    );
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('applies right alignment by default', () => {
    const { container } = render(
      <FormActions>
        <button>Submit</button>
      </FormActions>
    );
    const actions = container.querySelector('.flex');
    expect(actions?.className).toContain('justify-end');
  });

  it('applies left alignment', () => {
    const { container } = render(
      <FormActions align="left">
        <button>Submit</button>
      </FormActions>
    );
    const actions = container.querySelector('.flex');
    expect(actions?.className).toContain('justify-start');
  });

  it('applies center alignment', () => {
    const { container } = render(
      <FormActions align="center">
        <button>Submit</button>
      </FormActions>
    );
    const actions = container.querySelector('.flex');
    expect(actions?.className).toContain('justify-center');
  });

  it('applies space-between alignment', () => {
    const { container } = render(
      <FormActions align="between">
        <button>Cancel</button>
        <button>Submit</button>
      </FormActions>
    );
    const actions = container.querySelector('.flex');
    expect(actions?.className).toContain('justify-between');
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormActions className="custom-actions">
        <button>Submit</button>
      </FormActions>
    );
    expect(container.querySelector('.custom-actions')).toBeInTheDocument();
  });

  it('applies border-top styling', () => {
    const { container } = render(
      <FormActions>
        <button>Submit</button>
      </FormActions>
    );
    const actions = container.querySelector('.flex');
    expect(actions?.className).toContain('border-t');
  });

  it('applies gap spacing between buttons', () => {
    const { container } = render(
      <FormActions>
        <button>Submit</button>
      </FormActions>
    );
    const actions = container.querySelector('.flex');
    expect(actions?.className).toContain('gap-3');
  });
});

