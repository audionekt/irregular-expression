import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const testOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
];

describe('Select', () => {
  it('renders select element', () => {
    const { container } = render(<Select options={testOptions} />);
    const select = container.querySelector('select');
    expect(select).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select label="Country" options={testOptions} />);
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<Select label="City" options={testOptions} required />);
    const label = screen.getByText(/city/i).parentElement;
    expect(label?.textContent).toContain('*');
  });

  it('renders all options', () => {
    render(<Select options={testOptions} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('disables specific options', () => {
    const { container } = render(<Select options={testOptions} />);
    const option3 = container.querySelector('option[value="3"]');
    expect(option3).toHaveAttribute('disabled');
  });

  it('displays error message', () => {
    render(<Select label="Country" options={testOptions} error="Country is required" />);
    expect(screen.getByText('Country is required')).toBeInTheDocument();
  });

  it('sets aria-invalid when error exists', () => {
    render(<Select label="Country" options={testOptions} error="Invalid" />);
    const select = screen.getByLabelText('Country');
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays helper text', () => {
    render(<Select label="Country" options={testOptions} helper="Select your country" />);
    expect(screen.getByText('Select your country')).toBeInTheDocument();
  });

  it('renders disabled select', () => {
    render(<Select label="Country" options={testOptions} disabled />);
    const select = screen.getByLabelText('Country');
    expect(select).toBeDisabled();
  });

  it('handles option selection', async () => {
    const user = userEvent.setup();
    render(<Select label="Country" options={testOptions} />);
    const select = screen.getByLabelText('Country');
    
    await user.selectOptions(select, '2');
    expect(select).toHaveValue('2');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Select label="Country" options={testOptions} onChange={handleChange} />);
    
    const select = screen.getByLabelText('Country');
    await user.selectOptions(select, '2');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('generates unique id when not provided', () => {
    const { container } = render(
      <>
        <Select label="First" options={testOptions} />
        <Select label="Second" options={testOptions} />
      </>
    );
    
    const selects = container.querySelectorAll('select');
    expect(selects[0].id).not.toBe(selects[1].id);
  });

  it('uses provided id', () => {
    render(<Select label="Country" options={testOptions} id="custom-id" />);
    const select = screen.getByLabelText('Country');
    expect(select).toHaveAttribute('id', 'custom-id');
  });
});
