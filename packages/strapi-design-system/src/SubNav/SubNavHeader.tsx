import React, { useState, useRef, useEffect, ChangeEventHandler } from 'react';

import { Search } from '@strapi/icons';
import styled from 'styled-components';

import { Box } from '../Box';
import { Divider } from '../Divider';
import { Flex } from '../Flex';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { useId } from '../hooks/useId';
import { usePrevious } from '../hooks/usePrevious';
import { IconButton } from '../IconButton';
import { Searchbar, SearchForm } from '../Searchbar';
import { Typography } from '../Typography';

export interface SubNavHeaderProps {
  as?: string | React.ComponentType<any>;
  id: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClear?: (event: Event) => void;
  onSubmit?: React.FormEventHandler;
  searchable: boolean;
  searchLabel?: string;
  value?: string;
}

const CustomDivider = styled(Divider)`
  width: 2.4rem;
  background-color: ${({ theme }) => theme.colors.neutral200};
`;

export const SubNavHeader = ({
  as = 'h2',
  label,
  searchLabel = '',
  searchable,
  onChange = () => {},
  value = '',
  onClear = () => {},
  onSubmit = () => {},
  id,
}: SubNavHeaderProps) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const previousSearchOpenValue = usePrevious(isSearchOpen);
  const clearButtonId = useId(id);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
    if (previousSearchOpenValue && !isSearchOpen && searchButtonRef.current) {
      searchButtonRef.current.focus();
    }
  }, [isSearchOpen, previousSearchOpenValue]);

  const toggleSearch = () => {
    setSearchOpen((isOpen) => !isOpen);
  };

  const handleClear = (e) => {
    onClear(e);

    if (searchRef?.current) {
      searchRef.current.focus();
    }
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
      <Box paddingLeft={4} paddingTop={5} paddingBottom={2} paddingRight={4}>
        <SearchForm>
          <Searchbar
            name="searchbar"
            value={value}
            onChange={onChange}
            placeholder="e.g: strapi-plugin-abcd"
            onKeyDown={handleKeyDown}
            ref={searchRef}
            onBlur={handleBlur}
            onClear={handleClear}
            onSubmit={onSubmit}
            clearLabel="Clear"
            size="S"
          >
            {searchLabel}
          </Searchbar>
        </SearchForm>
        <Box paddingLeft={2} paddingTop={4}>
          <CustomDivider />
        </Box>
      </Box>
    );
  }

  return (
    <Box paddingLeft={6} paddingTop={6} paddingBottom={2} paddingRight={4}>
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Typography variant="beta" as={as}>
          {label}
        </Typography>
        {searchable && (
          <IconButton ref={searchButtonRef} onClick={toggleSearch} label={searchLabel} icon={<Search />} />
        )}
      </Flex>
      <Box paddingTop={4}>
        <CustomDivider />
      </Box>
    </Box>
  );
};
