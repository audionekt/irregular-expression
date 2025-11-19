'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useListNavigation,
  FloatingFocusManager,
  Placement,
} from '@floating-ui/react';
import { cn } from '../../styles';
import { lightTheme } from '../../styles/theme.css';
import * as styles from './dropdown.css';

export interface DropdownProps<T> {
  // Core props
  options: T[];
  value?: T | T[];
  onChange?: (value: T | T[] | undefined) => void;
  multiple?: boolean;

  // Render callbacks
  renderItem?: (item: T, index: number, selected: boolean) => React.ReactNode;
  renderSelected?: (item: T | T[] | undefined) => React.ReactNode;
  getItemLabel?: (item: T) => string;

  // Search functionality
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  filterOptions?: (options: T[], query: string) => T[];

  // Existing form props (maintained for consistency)
  label?: string;
  error?: string;
  helper?: string;
  state?: 'default' | 'error' | 'success';
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  id?: string;

  // Custom trigger
  children?: React.ReactNode;

  // Floating UI options
  placement?: Placement;
  offset?: number;
  maxHeight?: number;
}

function defaultGetItemLabel<T>(item: T): string {
  if (typeof item === 'string') return item;
  if (typeof item === 'object' && item !== null && 'label' in item) {
    return String((item as { label: unknown }).label);
  }
  return String(item);
}

function defaultFilterOptions<T>(
  options: T[],
  query: string,
  getItemLabel: (item: T) => string
): T[] {
  if (!query.trim()) return options;
  const lowerQuery = query.toLowerCase();
  return options.filter((item) =>
    getItemLabel(item).toLowerCase().includes(lowerQuery)
  );
}

export function Dropdown<T>({
  options,
  value,
  onChange,
  multiple = false,
  renderItem,
  renderSelected,
  getItemLabel = defaultGetItemLabel,
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearchChange,
  filterOptions: customFilterOptions,
  label,
  error,
  helper,
  state,
  fullWidth,
  disabled = false,
  required,
  placeholder,
  id,
  children,
  placement = 'bottom-start',
  offset: offsetValue = 4,
  maxHeight = 300,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);

  const dropdownId = id || `dropdown-${React.useId()}`;
  const dropdownState = error ? 'error' : state || 'default';

  const selectedValues = useMemo(() => {
    if (value === undefined) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const isSelected = (item: T): boolean => {
    return selectedValues.some((selected) => selected === item);
  };

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return options;
    const filterFn = customFilterOptions || ((opts, q) => defaultFilterOptions(opts, q, getItemLabel));
    return filterFn(options, searchQuery);
  }, [options, searchQuery, searchable, customFilterOptions, getItemLabel]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(offsetValue), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    focusItemOnOpen: false,
    openOnArrowKeyDown: false,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
  ]);

  useEffect(() => {
    if (isOpen && searchable) {
      setSearchQuery('');
      setActiveIndex(null);
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    if (activeIndex !== null && listRef.current[activeIndex]) {
      listRef.current[activeIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  const handleSelect = (item: T) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const isCurrentlySelected = isSelected(item);
      const newValues = isCurrentlySelected
        ? currentValues.filter((v) => v !== item)
        : [...currentValues, item];
      onChange?.(newValues.length > 0 ? (newValues as T[]) : undefined);
    } else {
      onChange?.(item as T | T[] | undefined);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (activeIndex !== null && activeIndex < filteredOptions.length) {
        const item = filteredOptions[activeIndex];
        if (item !== undefined) {
          handleSelect(item);
        }
      } else if (!isOpen) {
        setIsOpen(true);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
    setActiveIndex(null);
  };

  const defaultRenderItem = (item: T, index: number, selected: boolean) => {
    const label = getItemLabel(item);
    const isActive = activeIndex === index;
    return (
      <button
        key={index}
        type="button"
        ref={(node) => {
          listRef.current[index] = node;
        }}
        className={cn(
          styles.menuItem,
          isActive && styles.menuItemActive,
          selected && styles.menuItemSelected,
          disabled && styles.menuItemDisabled
        )}
        {...getItemProps({
          onClick: () => !disabled && handleSelect(item),
        })}
        role="option"
        aria-selected={selected}
        tabIndex={isActive ? 0 : -1}
      >
        {multiple && (
          <input
            type="checkbox"
            checked={selected}
            readOnly
            className={styles.checkbox}
            tabIndex={-1}
            aria-hidden="true"
          />
        )}
        <span>{label}</span>
      </button>
    );
  };

  const defaultRenderSelected = () => {
    if (multiple) {
      if (selectedValues.length === 0) {
        return <span className={styles.triggerPlaceholder}>{placeholder || 'Select...'}</span>;
      }
      if (selectedValues.length === 1) {
        return <span>{getItemLabel(selectedValues[0]!)}</span>;
      }
      return <span>{selectedValues.length} selected</span>;
    } else {
      if (!value) {
        return <span className={styles.triggerPlaceholder}>{placeholder || 'Select...'}</span>;
      }
      return <span>{getItemLabel(value as T)}</span>;
    }
  };

  const renderTriggerContent = () => {
    if (children) {
      if (React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
          ref: refs.setReference,
          ...getReferenceProps({
            onClick: () => !disabled && setIsOpen(!isOpen),
            onKeyDown: handleKeyDown,
            'aria-expanded': isOpen,
            'aria-haspopup': 'listbox',
            'aria-controls': `${dropdownId}-menu`,
            disabled,
          }),
        });
      }
      // If children is not a valid element, wrap it
      return (
        <div
          ref={refs.setReference}
          {...getReferenceProps({
            onClick: () => !disabled && setIsOpen(!isOpen),
            onKeyDown: handleKeyDown,
            'aria-expanded': isOpen,
            'aria-haspopup': 'listbox',
            'aria-controls': `${dropdownId}-menu`,
          })}
        >
          {children}
        </div>
      );
    }

    return (
      <button
        ref={refs.setReference}
        type="button"
        className={cn(
          styles.trigger,
          styles.inputStates[dropdownState],
          disabled && styles.menuItemDisabled
        )}
        {...getReferenceProps({
          onClick: () => !disabled && setIsOpen(!isOpen),
          onKeyDown: handleKeyDown,
          'aria-expanded': isOpen,
          'aria-haspopup': 'listbox',
          'aria-controls': `${dropdownId}-menu`,
          'aria-invalid': error ? 'true' : 'false',
          'aria-describedby':
            error ? `${dropdownId}-error` : helper ? `${dropdownId}-helper` : undefined,
          disabled,
        })}
      >
        {renderSelected
          ? renderSelected(multiple ? (value as T[] | undefined) : (value as T | undefined))
          : defaultRenderSelected()}
        <svg
          className={cn(styles.dropdownIcon, isOpen && styles.dropdownIconOpen)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    );
  };

  return (
    <div className={cn(styles.wrapper, fullWidth && styles.fullWidth)}>
      {label && (
        <label htmlFor={dropdownId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.triggerWrapper}>{renderTriggerContent()}</div>

      {error && (
        <p id={`${dropdownId}-error`} className={cn(styles.message, styles.errorMessage)}>
          <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {helper && !error && (
        <p id={`${dropdownId}-helper`} className={cn(styles.message, styles.helperMessage)}>
          {helper}
        </p>
      )}

      {isOpen &&
        createPortal(
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                maxHeight: `${maxHeight}px`,
                width: refs.reference.current && 'offsetWidth' in refs.reference.current 
                  ? `${(refs.reference.current as HTMLElement).offsetWidth}px` 
                  : 'auto',
                minWidth: '200px',
              }}
              {...getFloatingProps()}
              className={cn(styles.menu, lightTheme)}
              id={`${dropdownId}-menu`}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  if (activeIndex === null || activeIndex >= filteredOptions.length - 1) {
                    setActiveIndex(0);
                  } else {
                    setActiveIndex(activeIndex + 1);
                  }
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  if (activeIndex === null || activeIndex <= 0) {
                    setActiveIndex(filteredOptions.length - 1);
                  } else {
                    setActiveIndex(activeIndex - 1);
                  }
                } else if (e.key === 'Enter' && activeIndex !== null) {
                  e.preventDefault();
                  const item = filteredOptions[activeIndex];
                  if (item !== undefined) {
                    handleSelect(item);
                  }
                } else if (e.key === 'Escape') {
                  setIsOpen(false);
                }
              }}
            >
              {searchable && (
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      const firstIndex = filteredOptions.length > 0 ? 0 : null;
                      setActiveIndex(firstIndex);
                      if (firstIndex !== null) {
                        listRef.current[firstIndex]?.focus();
                      }
                    }
                  }}
                  autoFocus
                />
              )}
              <div className={styles.menuList}>
                {filteredOptions.length === 0 ? (
                  <div className={styles.emptyState}>No options found</div>
                ) : (
                  filteredOptions.map((item, index) => {
                    const selected = isSelected(item);
                    const isActive = activeIndex === index;
                    if (renderItem) {
                      const customItem = renderItem(item, index, selected);
                      return (
                        <button
                          key={index}
                          type="button"
                          ref={(node) => {
                            listRef.current[index] = node;
                          }}
                          className={cn(
                            styles.menuItem,
                            isActive && styles.menuItemActive,
                            selected && styles.menuItemSelected
                          )}
                          {...getItemProps({
                            onClick: () => !disabled && handleSelect(item),
                          })}
                          role="option"
                          aria-selected={selected}
                          tabIndex={isActive ? 0 : -1}
                        >
                          {customItem}
                        </button>
                      );
                    }
                    return defaultRenderItem(item, index, selected);
                  })
                )}
              </div>
            </div>
          </FloatingFocusManager>,
          document.body
        )}
    </div>
  );
}

Dropdown.displayName = 'Dropdown';

