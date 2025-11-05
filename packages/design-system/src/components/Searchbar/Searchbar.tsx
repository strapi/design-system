import * as React from 'react';

import { Search, Cross } from '@strapi/icons';
import { styled } from 'styled-components';

import { composeRefs } from '../../hooks/useComposeRefs';
import { inputFocusStyle } from '../../themes/utils';
import { VisuallyHidden } from '../../utilities/VisuallyHidden';
import { Field } from '../Field';
import { IconButton } from '../IconButton';

const CloseIcon = styled(Cross)`
  font-size: 0.5rem;
  path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

const SearchIcon = styled(Search)`
  font-size: 1rem;
  path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

const SearchbarWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};

  &:focus-within {
    ${SearchIcon} {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;

const SearchbarInput = styled(Field.Input)`
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  padding: 0 0 0 8px;
  color: ${({ theme }) => theme.colors.neutral800};

  &:hover {
    button {
      cursor: pointer;
    }
  }

  ${inputFocusStyle()}

  > input::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }

  > input::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }

  > input::-webkit-search-decoration,
  > input::-webkit-search-cancel-button,
  > input::-webkit-search-results-button,
  > input::-webkit-search-results-decoration {
    display: none;
  }
`;

export interface SearchbarProps extends Field.InputProps {
  children: React.ReactNode;
  name: string;
  value?: string;
  onClear: React.MouseEventHandler<HTMLButtonElement>;
  clearLabel: string;
}

export const Searchbar = React.forwardRef<HTMLInputElement, SearchbarProps>(
  ({ name, children, value = '', onClear, clearLabel = 'Clear', ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null!);
    const isCompleting = value.length > 0;

    const handleClear = (e) => {
      onClear(e);
      inputRef.current.focus();
    };

    const actualRef = composeRefs(ref, inputRef);

    return (
      <SearchbarWrapper>
        <Field.Root name={name}>
          <VisuallyHidden>
            <Field.Label>{children}</Field.Label>
          </VisuallyHidden>

          <SearchbarInput
            size="S"
            type="search"
            ref={actualRef}
            value={value}
            startAction={<SearchIcon aria-hidden />}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === 'Escape' && isCompleting) {
                handleClear(e);
              }
            }}
            endAction={
              isCompleting ? (
                <IconButton
                  onClick={handleClear}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  label={clearLabel}
                  size="XS"
                  variant="ghost"
                  type="button"
                >
                  <CloseIcon />
                </IconButton>
              ) : undefined
            }
            {...props}
          />
        </Field.Root>
      </SearchbarWrapper>
    );
  },
);
