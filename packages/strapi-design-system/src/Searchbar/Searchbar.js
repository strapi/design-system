import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, FieldLabel, FieldAction, FieldInput, InputWrapper } from '../Field';
import { VisuallyHidden } from '../VisuallyHidden';
import { SearchIcon, CloseAlertIcon } from '@strapi/icons';
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
  // TODO: use the shadows from the theme when it's available
  box-shadow: 0px 1px 4px rgba(26, 26, 67, 0.1), inset 0px 0px 3px rgba(0, 0, 0, 0.1);

  ${InputWrapper} {
    border: none;
  }

  &:focus-within {
    ${SearchIconWrapper} {
      svg path {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }
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
          leftAction={
            <SearchIconWrapper>
              <SearchIcon aria-hidden={true} />
            </SearchIconWrapper>
          }
          rightAction={
            isCompleting ? (
              <FieldAction aria-label={clearLabel} onClick={handleClear}>
                <CloseIconWrapper aria-hidden={true}>
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
