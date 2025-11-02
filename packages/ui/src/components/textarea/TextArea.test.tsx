import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  describe('basic rendering', () => {
    it('renders textarea element', () => {
      render(<TextArea placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<TextArea label="Description" />);
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
    });

    it('shows required asterisk when required', () => {
      render(<TextArea label="Message" required />);
      const label = screen.getByText(/message/i).parentElement;
      expect(label?.textContent).toContain('*');
    });

    it('renders with default rows', () => {
      const { container } = render(<TextArea />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.getAttribute('rows')).toBe('4');
    });

    it('renders with custom rows', () => {
      const { container } = render(<TextArea rows={10} />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.getAttribute('rows')).toBe('10');
    });
  });

  describe('resize options', () => {
    it('applies resize-none class', () => {
      const { container } = render(<TextArea resize="none" />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.className).toContain('resize-none');
    });

    it('applies resize-y class by default', () => {
      const { container } = render(<TextArea />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.className).toContain('resize-y');
    });

    it('applies resize-x class', () => {
      const { container } = render(<TextArea resize="horizontal" />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.className).toContain('resize-x');
    });

    it('applies resize class for both', () => {
      const { container } = render(<TextArea resize="both" />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.className).toContain('resize');
    });
  });

  describe('error handling', () => {
    it('displays error message', () => {
      render(<TextArea error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error styles', () => {
      const { container } = render(<TextArea error="Error" />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.className).toContain('border-red-300');
    });

    it('sets aria-invalid when error exists', () => {
      const { container } = render(<TextArea error="Error" />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('helper text', () => {
    it('displays helper text', () => {
      render(<TextArea helper="Enter a detailed description" />);
      expect(screen.getByText('Enter a detailed description')).toBeInTheDocument();
    });

    it('associates helper text with textarea', () => {
      const { container } = render(<TextArea helper="Helper" />);
      const textarea = container.querySelector('textarea');
      const helperId = textarea?.getAttribute('aria-describedby');
      expect(helperId).toContain('helper');
    });
  });

  describe('full width', () => {
    it('applies full width class', () => {
      const { container } = render(<TextArea fullWidth />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });
  });

  describe('disabled state', () => {
    it('renders disabled textarea', () => {
      const { container } = render(<TextArea disabled />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toBeDisabled();
    });

    it('applies disabled styles', () => {
      const { container } = render(<TextArea disabled />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.className).toContain('disabled:opacity-50');
    });
  });

  describe('user interaction', () => {
    it('handles text input', async () => {
      const user = userEvent.setup();
      const { container } = render(<TextArea />);
      const textarea = container.querySelector('textarea')!;
      
      await user.type(textarea, 'multiline\ntext\nvalue');
      expect(textarea.value).toBe('multiline\ntext\nvalue');
    });

    it('calls onChange handler', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const { container } = render(<TextArea onChange={handleChange} />);
      const textarea = container.querySelector('textarea')!;
      
      await user.type(textarea, 'a');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('generates unique id when not provided', () => {
      const { container: container1 } = render(<TextArea />);
      const { container: container2 } = render(<TextArea />);
      
      const textarea1 = container1.querySelector('textarea');
      const textarea2 = container2.querySelector('textarea');
      
      expect(textarea1?.id).toBeDefined();
      expect(textarea2?.id).toBeDefined();
      expect(textarea1?.id).not.toBe(textarea2?.id);
    });

    it('uses provided id', () => {
      const { container } = render(<TextArea id="custom-id" />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.id).toBe('custom-id');
    });

    it('associates label with textarea via htmlFor', () => {
      render(<TextArea label="Bio" id="bio-textarea" />);
      const label = screen.getByText('Bio');
      expect(label.getAttribute('for')).toBe('bio-textarea');
    });
  });

  describe('className prop', () => {
    it('applies custom className', () => {
      const { container } = render(<TextArea className="custom-class" />);
      const textarea = container.querySelector('textarea');
      expect(textarea?.className).toContain('custom-class');
    });
  });
});

