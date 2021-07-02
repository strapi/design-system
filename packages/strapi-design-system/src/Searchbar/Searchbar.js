import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchIcon from '@strapi/icons/SearchIcon';
import CloseAlertIcon from '@strapi/icons/CloseAlertIcon';
import { Field, FieldLabel, FieldAction, FieldInput, InputWrapper } from '../Field';
import { VisuallyHidden } from '../VisuallyHidden';
import { Row } from '../Row';

const CloseIconWrapper = styled(Row)`
  font-size: 0.5rem;
  svg path {
    fill: ${({ theme }) => theme.colors.neutral400};
  }
`;

const SearchIconWrapper = styled(Row)`
  font-size: 0.8rem;

  svg path {
    fill: ${({ theme }) => theme.colors.neutral800};
  }
`;

const SearchbarWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};

  &:focus-within {
    ${SearchIconWrapper} {
      svg path {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }
  }

  ${InputWrapper} {
    border: 1px solid transparent;
  }

  ${InputWrapper}:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.primary600};
  }
`;

export const Searchbar = ({ name, children, value, onClear, clearLabel, ...props }) => {
  const inputRef = useRef(null);
  const isCompleting = value.length > 0;

  const handleClear = (e) => {
    onClear(e);
    inputRef.current.focus();
  };

  return (
    <SearchbarWrapper>
      <Field name={name}>
        <VisuallyHidden>
          <FieldLabel>{children}</FieldLabel>
        </VisuallyHidden>

        <FieldInput
          ref={inputRef}
          value={value}
          startAction={
            <SearchIconWrapper>
              <SearchIcon aria-hidden={true} />
            </SearchIconWrapper>
          }
          endAction={
            isCompleting ? (
              <FieldAction label={clearLabel} onClick={handleClear}>
                <CloseIconWrapper>
                  <CloseAlertIcon />
                </CloseIconWrapper>
              </FieldAction>
            ) : undefined
          }
          {...props}
        />
      </Field>
    </SearchbarWrapper>
  );
};

Searchbar.displayName = 'Searchbar';

Searchbar.defaultProps = {
  value: '',
};

Searchbar.propTypes = {
  children: PropTypes.string.isRequired,
  clearLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  value: PropTypes.string,
};
