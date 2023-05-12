import React, { forwardRef, MouseEventHandler, useRef } from 'react';

import { Search, Cross } from '@strapi/icons';
import styled from 'styled-components';

import { Field, FieldLabel, FieldAction, FieldInput, InputWrapper, FieldInputProps, FieldProps } from '../Field';
import { composeRefs } from '../hooks/useComposeRefs';
import { inputFocusStyle } from '../themes/utils';
import { VisuallyHidden } from '../VisuallyHidden';

const CloseIcon = styled(Cross)`
  font-size: 0.5rem;
  path {
    fill: ${({ theme }) => theme.colors.neutral400};
  }
`;

const SearchIcon = styled(Search)`
  font-size: 0.8rem;
  path {
    fill: ${({ theme }) => theme.colors.neutral800};
  }
`;

const SearchbarWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};

  &:focus-within {
    ${SearchIcon} {
      path {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }
  }

  ${InputWrapper} {
    border: 1px solid transparent;
  }

  ${inputFocusStyle(InputWrapper)}
`;

export interface SearchbarProps extends Omit<FieldInputProps, 'id' | 'name'>, Pick<FieldProps, 'id' | 'name'> {
  name: string;
  value?: string;
  onClear: MouseEventHandler<any>;
  clearLabel: string;
}

export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  ({ name, size = 'M', children, value = '', onClear, clearLabel, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null!);
    const isCompleting = value.length > 0;

    const handleClear = (e) => {
      onClear(e);
      inputRef.current.focus();
    };

    const actualRef = composeRefs(ref, inputRef);

    return (
      <SearchbarWrapper>
        <Field name={name}>
          <VisuallyHidden>
            <FieldLabel>{children}</FieldLabel>
          </VisuallyHidden>

          <FieldInput
            ref={actualRef}
            value={value}
            startAction={<SearchIcon aria-hidden />}
            size={size}
            endAction={
              isCompleting ? (
                <FieldAction label={clearLabel} onClick={handleClear}>
                  <CloseIcon />
                </FieldAction>
              ) : undefined
            }
            {...props}
          />
        </Field>
      </SearchbarWrapper>
    );
  },
);
