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
  describe('basic rendering', () => {
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

    it('renders placeholder option when provided', () => {
      render(<Select options={testOptions} placeholder="Select an option" />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('disables placeholder option', () => {
      const { container } = render(<Select options={testOptions} placeholder="Choose" />);
      const placeholderOption = container.querySelector('option[value=""]');
      expect(placeholderOption).toHaveAttribute('disabled');
    });
  });

  describe('dropdown arrow', () => {
    it('renders dropdown arrow icon', () => {
      const { container } = render(<Select options={testOptions} />);
      const arrow = container.querySelector('svg');
      expect(arrow).toBeInTheDocument();
    });
  });

  describe('disabled options', () => {
    it('disables specific options', () => {
      const { container } = render(<Select options={testOptions} />);
      const disabledOption = container.querySelector('option[value="3"]');
      expect(disabledOption).toHaveAttribute('disabled');
    });

    it('does not disable enabled options', () => {
      const { container } = render(<Select options={testOptions} />);
      const enabledOption = container.querySelector('option[value="1"]');
      expect(enabledOption).not.toHaveAttribute('disabled');
    });
  });

  describe('error handling', () => {
    it('displays error message', () => {
      render(<Select options={testOptions} error="Please select an option" />);
      expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });

    it('applies error styles', () => {
      const { container } = render(<Select options={testOptions} error="Error" />);
      const select = container.querySelector('select');
      expect(select?.className).toContain('border-red-300');
    });

    it('sets aria-invalid when error exists', () => {
      const { container } = render(<Select options={testOptions} error="Error" />);
      const select = container.querySelector('select');
      expect(select?.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('helper text', () => {
    it('displays helper text', () => {
      render(<Select options={testOptions} helper="Choose your preferred option" />);
      expect(screen.getByText('Choose your preferred option')).toBeInTheDocument();
    });

    it('associates helper text with select', () => {
      const { container } = render(<Select options={testOptions} helper="Helper" />);
      const select = container.querySelector('select');
      const helperId = select?.getAttribute('aria-describedby');
      expect(helperId).toContain('helper');
    });
  });

  describe('full width', () => {
    it('applies full width class', () => {
      const { container } = render(<Select options={testOptions} fullWidth />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });
  });

  describe('disabled state', () => {
    it('renders disabled select', () => {
      const { container } = render(<Select options={testOptions} disabled />);
      const select = container.querySelector('select');
      expect(select).toBeDisabled();
    });

    it('applies disabled styles', () => {
      const { container } = render(<Select options={testOptions} disabled />);
      const select = container.querySelector('select');
      expect(select?.className).toContain('disabled:opacity-50');
    });
  });

  describe('user interaction', () => {
    it('handles option selection', async () => {
      const user = userEvent.setup();
      const { container } = render(<Select options={testOptions} />);
      const select = container.querySelector('select')!;
      
      await user.selectOptions(select, '2');
      expect(select.value).toBe('2');
    });

    it('calls onChange handler', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const { container } = render(<Select options={testOptions} onChange={handleChange} />);
      const select = container.querySelector('select')!;
      
      await user.selectOptions(select, '1');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('generates unique id when not provided', () => {
      const { container: container1 } = render(<Select options={testOptions} />);
      const { container: container2 } = render(<Select options={testOptions} />);
      
      const select1 = container1.querySelector('select');
      const select2 = container2.querySelector('select');
      
      expect(select1?.id).toBeDefined();
      expect(select2?.id).toBeDefined();
      expect(select1?.id).not.toBe(select2?.id);
    });

    it('uses provided id', () => {
      const { container } = render(<Select options={testOptions} id="custom-id" />);
      const select = container.querySelector('select');
      expect(select?.id).toBe('custom-id');
    });

    it('associates label with select via htmlFor', () => {
      render(<Select options={testOptions} label="Region" id="region-select" />);
      const label = screen.getByText('Region');
      expect(label.getAttribute('for')).toBe('region-select');
    });
  });

  describe('className prop', () => {
    it('applies custom className', () => {
      const { container } = render(<Select options={testOptions} className="custom-class" />);
      const select = container.querySelector('select');
      expect(select?.className).toContain('custom-class');
    });
  });
});

