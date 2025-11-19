import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '../dropdown';

const testOptions = ['Option 1', 'Option 2', 'Option 3'];

describe('Dropdown', () => {
  beforeEach(() => {
    // Mock createPortal to render in the same container
    jest.spyOn(React, 'createPortal').mockImplementation((element) => element as React.ReactElement);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders dropdown trigger', () => {
    render(<Dropdown options={testOptions} />);
    const trigger = screen.getByRole('button', { name: /select/i });
    expect(trigger).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Dropdown label="Country" options={testOptions} />);
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<Dropdown label="City" options={testOptions} required />);
    const label = screen.getByText(/city/i).parentElement;
    expect(label?.textContent).toContain('*');
  });

  it('displays placeholder when no value selected', () => {
    render(<Dropdown options={testOptions} placeholder="Choose an option" />);
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('displays selected value', () => {
    render(<Dropdown options={testOptions} value="Option 1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('opens dropdown menu on click', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} />);
    const trigger = screen.getByRole('button');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  it('displays all options when opened', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} />);
    const trigger = screen.getByRole('button');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Dropdown options={testOptions} onChange={handleChange} />);
    const trigger = screen.getByRole('button');
    
    await user.click(trigger);
    
    await waitFor(() => {
      const option = screen.getByText('Option 2');
      expect(option).toBeInTheDocument();
    });
    
    const option = screen.getByText('Option 2');
    await user.click(option);
    
    expect(handleChange).toHaveBeenCalledWith('Option 2');
  });

  it('closes dropdown after selecting option in single select mode', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} />);
    const trigger = screen.getByRole('button');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    const option = screen.getByText('Option 1');
    await user.click(option);
    
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('supports multi-select mode', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Dropdown options={testOptions} multiple onChange={handleChange} />);
    const trigger = screen.getByRole('button');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    const option1 = screen.getByText('Option 1');
    await user.click(option1);
    
    expect(handleChange).toHaveBeenCalledWith(['Option 1']);
    
    const option2 = screen.getByText('Option 2');
    await user.click(option2);
    
    expect(handleChange).toHaveBeenCalledWith(['Option 1', 'Option 2']);
  });

  it('keeps dropdown open in multi-select mode', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} multiple />);
    const trigger = screen.getByRole('button');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    const option = screen.getByText('Option 1');
    await user.click(option);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  it('displays search input when searchable', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} searchable />);
    const trigger = screen.getByRole('button');
    
    await user.click(trigger);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/search/i);
      expect(searchInput).toBeInTheDocument();
    });
  });

  it('filters options based on search query', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} searchable searchPlaceholder="Search..." />);
    const trigger = screen.getByRole('button');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'Option 1');
    
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    });
  });

  it('displays error message', () => {
    render(<Dropdown options={testOptions} error="Country is required" />);
    expect(screen.getByText('Country is required')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Dropdown options={testOptions} helper="Select your country" />);
    expect(screen.getByText('Select your country')).toBeInTheDocument();
  });

  it('renders disabled dropdown', () => {
    render(<Dropdown options={testOptions} disabled value="Option 1" />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
  });

  it('uses custom getItemLabel', () => {
    interface Item {
      name: string;
      id: number;
    }
    const items: Item[] = [
      { name: 'Item 1', id: 1 },
      { name: 'Item 2', id: 2 },
    ];
    
    render(
      <Dropdown
        options={items}
        value={items[0]}
        getItemLabel={(item) => item.name}
      />
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('uses custom renderSelected', () => {
    render(
      <Dropdown
        options={testOptions}
        value="Option 1"
        renderSelected={() => <span>Custom Selected</span>}
      />
    );
    
    expect(screen.getByText('Custom Selected')).toBeInTheDocument();
  });

  it('generates unique id when not provided', () => {
    const { container } = render(
      <>
        <Dropdown label="First" options={testOptions} />
        <Dropdown label="Second" options={testOptions} />
      </>
    );
    
    const triggers = container.querySelectorAll('button');
    expect(triggers[0].getAttribute('aria-controls')).not.toBe(
      triggers[1].getAttribute('aria-controls')
    );
  });

  it('uses provided id', () => {
    render(<Dropdown label="Country" options={testOptions} id="custom-id" />);
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-controls', 'custom-id-menu');
  });
});

