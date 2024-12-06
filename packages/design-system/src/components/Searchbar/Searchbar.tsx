import * as React from 'react';

import { Search, Cross } from '@strapi/icons';
import { styled } from 'styled-components';

import { composeRefs } from '../../hooks/useComposeRefs';
import { inputFocusStyle } from '../../themes/utils';
import { VisuallyHidden } from '../../utilities/VisuallyHidden';
import { Field } from '../Field';

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
  border: 1px solid ${({ theme }) => theme.colors.neutral150}

  &:focus-within {
    ${SearchIcon} {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;

const SearchbarInput = styled(Field.Input)`
  border: 1px solid ${({ theme }) => theme.colors.neutral150}
  height: 32px;
  padding: 0 8px;
  color: ${({ theme }) => theme.colors.neutral800};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
  }

  &:hover {
    button {
      cursor: pointer;
    }
  }

  ${inputFocusStyle()}
`;

export interface SearchbarProps extends Field.InputProps {
  children: React.ReactNode;
  name: string;
  value?: string;
  onClear: React.MouseEventHandler<any>;
  clearLabel: string;
}

export const Searchbar = React.forwardRef<HTMLInputElement, SearchbarProps>(
  ({ name, children, value = '', onClear, clearLabel, ...props }, ref) => {
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
            ref={actualRef}
            value={value}
            startAction={<SearchIcon aria-hidden />}
            endAction={
              isCompleting ? (
                <Field.Action
                  label={clearLabel}
                  onClick={handleClear}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  <CloseIcon />
                </Field.Action>
              ) : undefined
            }
            {...props}
          />
        </Field.Root>
      </SearchbarWrapper>
    );
  },
);
