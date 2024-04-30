import * as React from 'react';

import { Search } from '@strapi/icons';
import { styled } from 'styled-components';

import { KeyboardKeys } from '../../helpers/keyboardKeys';
import { useId } from '../../hooks/useId';
import { usePrevious } from '../../hooks/usePrevious';
import { Box } from '../Box';
import { Divider } from '../Divider';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Searchbar, SearchbarProps, SearchForm } from '../Searchbar';
import { Typography, TypographyProps } from '../Typography';

const CustomDivider = styled(Divider)`
  width: 2.4rem;
  background-color: ${({ theme }) => theme.colors.neutral200};
`;

export interface SubNavHeaderProps
  extends Pick<TypographyProps<'h2'>, 'tag'>,
    Partial<Pick<SearchbarProps, 'onClear' | 'onChange' | 'onSubmit'>> {
  id?: string;
  label: string;
  searchLabel?: string;
  searchable?: boolean;
  value?: string;
}

export const SubNavHeader = ({
  tag = 'h2',
  label,
  searchLabel = '',
  searchable = false,
  onChange = () => {},
  value = '',
  onClear = () => {},
  onSubmit = () => {},
  id,
}: SubNavHeaderProps) => {
  const [isSearchOpen, setSearchOpen] = React.useState(false);
  const previousSearchOpenValue = usePrevious(isSearchOpen);
  const clearButtonId = useId(id);
  const searchRef = React.useRef<HTMLInputElement>(undefined!);
  const searchButtonRef = React.useRef<HTMLButtonElement>(undefined!);

  React.useEffect(() => {
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

  const handleClear: SearchbarProps['onClear'] = (e) => {
    onClear(e);
    searchRef.current.focus();
  };

  const handleBlur: SearchbarProps['onBlur'] = (e) => {
    if (e.relatedTarget?.id !== clearButtonId) {
      setSearchOpen(false);
    }
  };

  const handleKeyDown: SearchbarProps['onKeyDown'] = (e) => {
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
    <Flex direction="column" alignItems="flex-start" paddingLeft={6} paddingTop={6} paddingBottom={2} paddingRight={4}>
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Typography variant="beta" tag={tag}>
          {label}
        </Typography>
        {searchable && (
          <IconButton ref={searchButtonRef} onClick={toggleSearch} label={searchLabel} icon={<Search />} />
        )}
      </Flex>
      <Box paddingTop={4}>
        <CustomDivider />
      </Box>
    </Flex>
  );
};
