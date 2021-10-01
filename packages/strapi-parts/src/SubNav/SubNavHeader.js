import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Search from '@strapi/icons/Search';
import CloseAlertIcon from '@strapi/icons/CloseAlertIcon';
import SearchIcon from '@strapi/icons/SearchIcon';
import { Row } from '../Row';
import { H2 } from '../Text';
import { IconButton } from '../IconButton';
import { Box } from '../Box';
import { FieldInput, FieldAction, Field, InputWrapper } from '../Field';
import { Divider } from '../Divider';
import { useId } from '../helpers/useId';
import { usePrevious } from '../helpers/usePrevious';
import { KeyboardKeys } from '../helpers/keyboardKeys';

const Searchbar = styled(FieldInput)`
  height: ${32 / 16}rem;
`;
const CloseIconWrapper = styled(Row)`
  font-size: 0.5rem;
  svg path {
    fill: ${({ theme }) => theme.colors.neutral400};
  }
`;
const SearchIconWrapper = styled(Row)`
  svg {
    width: ${11 / 16}rem;
    height: ${11 / 16}rem;
    path {
      fill: ${({ theme, focused }) => (focused ? theme.colors.primary600 : theme.colors.neutral800)};
    }
  }
`;
const CustomDivider = styled(Divider)`
  width: ${24 / 16}rem;
  background-color: ${({ theme }) => theme.colors.neutral200};
`;
const SearchWrapper = styled(Box)`
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
    outline: 2px solid ${({ theme }) => theme.colors.primary600};
    outline-offset: 2px;
  }

  /**
Focused is managed at the wrapper level */
  input {
    outline: none;
  }
`;

export const SubNavHeader = ({ as, label, searchLabel, searchable, onChange, value, onClear, id }) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const previousSearchOpenValue = usePrevious(isSearchOpen);
  const clearButtonId = useId('subnav-searchbar-clear', id);
  const searchRef = useRef();
  const searchButtonRef = useRef();
  const isCompleting = value.length > 0;

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
    if (previousSearchOpenValue && !isSearchOpen && searchButtonRef.current) {
      searchButtonRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleSearch = () => {
    setSearchOpen((isOpen) => !isOpen);
  };

  const handleClear = (e) => {
    onClear(e);
    searchRef.current.focus();
  };

  const handleBlur = (e) => {
    if (e.relatedTarget?.id !== clearButtonId) {
      setSearchOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === KeyboardKeys.ESCAPE) {
      setSearchOpen(false);
    }
  };

  if (isSearchOpen) {
    return (
      <SearchWrapper paddingLeft={4} paddingTop={5} paddingBottom={2} paddingRight={4}>
        <Field name="subnav-search">
          <Searchbar
            onKeyDown={handleKeyDown}
            ref={searchRef}
            onBlur={handleBlur}
            value={value}
            onChange={onChange}
            startAction={
              <SearchIconWrapper focused={isSearchOpen}>
                <SearchIcon aria-hidden={true} />
              </SearchIconWrapper>
            }
            endAction={
              isCompleting ? (
                <FieldAction id={clearButtonId} label="Clear label" onClick={handleClear}>
                  <CloseIconWrapper>
                    <CloseAlertIcon />
                  </CloseIconWrapper>
                </FieldAction>
              ) : undefined
            }
          />
        </Field>
        <Box paddingLeft={2} paddingTop={4}>
          <CustomDivider />
        </Box>
      </SearchWrapper>
    );
  }

  return (
    <Box paddingLeft={6} paddingTop={6} paddingBottom={2} paddingRight={4}>
      <Row justifyContent="space-between">
        <H2 as={as}>{label}</H2>
        {searchable && (
          <IconButton ref={searchButtonRef} onClick={toggleSearch} label={searchLabel} icon={<Search />} />
        )}
      </Row>
      <Box paddingTop={4}>
        <CustomDivider />
      </Box>
    </Box>
  );
};

SubNavHeader.defaultProps = {
  as: 'h2',
  searchable: false,
  onChange: () => {},
  onClear: () => {},
  value: '',
  searchLabel: '',
  id: undefined,
};

SubNavHeader.propTypes = {
  as: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  searchLabel: PropTypes.string,
  searchable: PropTypes.bool,
  value: PropTypes.string,
};
