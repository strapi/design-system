import React, { useState, useRef, useEffect } from 'react';

import { Search } from '@strapi/icons';
import styled from 'styled-components';

import { Box } from '../../Box';
import { Divider } from '../../Divider';
import { Flex } from '../../Flex';
import { KeyboardKeys } from '../../helpers/keyboardKeys';
import { useId } from '../../hooks/useId';
import { usePrevious } from '../../hooks/usePrevious';
import { IconButton } from '../../IconButton';
import { Searchbar, SearchForm } from '../../Searchbar';
import { Typography } from '../../Typography';

const CustomDivider = styled(Divider)`
  width: ${24 / 16}rem;
  background-color: ${({ theme }) => theme.colors.neutral200};
`;

export interface SubNavHeaderProps {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: React.MouseEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLInputElement>;
  searchLabel?: string;
  searchable?: boolean;
  value?: string;
}

export const SubNavHeader = ({
  as = 'h2',
  label,
  searchLabel = '',
  searchable = false,
  onChange = () => {},
  value = '',
  onClear = () => {},
  onSubmit = () => {},
  id,
}: SubNavHeaderProps) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const previousSearchOpenValue = usePrevious(isSearchOpen);
  const clearButtonId = useId(id);
  const searchRef = useRef<HTMLInputElement>(undefined!);
  const searchButtonRef = useRef<HTMLButtonElement>(undefined!);

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
