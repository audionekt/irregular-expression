import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  describe('basic rendering', () => {
    it('renders input element', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('shows required asterisk when required', () => {
      render(<Input label="Email" required />);
      const label = screen.getByText(/email/i).parentElement;
      expect(label?.textContent).toContain('*');
    });
  });

  describe('icons', () => {
    it('renders left icon', () => {
      render(<Input leftIcon={<span data-testid="left-icon">←</span>} />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      render(<Input rightIcon={<span data-testid="right-icon">→</span>} />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('applies correct padding with left icon', () => {
      const { container } = render(<Input leftIcon={<span>←</span>} />);
      const input = container.querySelector('input');
      expect(input?.className).toContain('pl-10');
    });

    it('applies correct padding with right icon', () => {
      const { container } = render(<Input rightIcon={<span>→</span>} />);
      const input = container.querySelector('input');
      expect(input?.className).toContain('pr-10');
    });
  });

  describe('error handling', () => {
    it('displays error message', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error styles', () => {
      const { container } = render(<Input error="Error" />);
      const input = container.querySelector('input');
      expect(input?.className).toContain('border-red-300');
    });

    it('sets aria-invalid when error exists', () => {
      const { container } = render(<Input error="Error" />);
      const input = container.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('error takes precedence over helper text', () => {
      render(<Input error="Error message" helper="Helper text" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('helper text', () => {
    it('displays helper text', () => {
      render(<Input helper="Enter your email address" />);
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('associates helper text with input', () => {
      const { container } = render(<Input helper="Helper" />);
      const input = container.querySelector('input');
      const helperId = input?.getAttribute('aria-describedby');
      expect(helperId).toContain('helper');
    });
  });

  describe('full width', () => {
    it('applies full width class', () => {
      const { container } = render(<Input fullWidth />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });
  });

  describe('disabled state', () => {
    it('renders disabled input', () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector('input');
      expect(input).toBeDisabled();
    });

    it('applies disabled styles', () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector('input');
      expect(input?.className).toContain('disabled:opacity-50');
    });
  });

  describe('user interaction', () => {
    it('handles text input', async () => {
      const user = userEvent.setup();
      const { container } = render(<Input />);
      const input = container.querySelector('input')!;
      
      await user.type(input, 'test value');
      expect(input.value).toBe('test value');
    });

    it('calls onChange handler', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const { container } = render(<Input onChange={handleChange} />);
      const input = container.querySelector('input')!;
      
      await user.type(input, 'a');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('generates unique id when not provided', () => {
      const { container: container1 } = render(<Input />);
      const { container: container2 } = render(<Input />);
      
      const input1 = container1.querySelector('input');
      const input2 = container2.querySelector('input');
      
      expect(input1?.id).toBeDefined();
      expect(input2?.id).toBeDefined();
      expect(input1?.id).not.toBe(input2?.id);
    });

    it('uses provided id', () => {
      const { container } = render(<Input id="custom-id" />);
      const input = container.querySelector('input');
      expect(input?.id).toBe('custom-id');
    });

    it('associates label with input via htmlFor', () => {
      render(<Input label="Email" id="email-input" />);
      const label = screen.getByText('Email');
      expect(label.getAttribute('for')).toBe('email-input');
    });
  });

  describe('className prop', () => {
    it('applies custom className', () => {
      const { container } = render(<Input className="custom-class" />);
      const input = container.querySelector('input');
      expect(input?.className).toContain('custom-class');
    });
  });
});

