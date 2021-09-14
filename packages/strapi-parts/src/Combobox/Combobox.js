import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useId } from '../helpers/useId';
import DropdownIcon from '@strapi/icons/FilterDropdownIcon';
import {
  getActionFromKey,
  getUpdatedIndex,
  isScrollable,
  maintainScrollVisibility,
  MenuActions,
  filterOptions,
} from './utils';

import { Row } from '../Row';
import { CaretBox } from '../Select/components';
import { Popover } from '../Popover';
import { Box } from '../Box';
import { Text } from '../Text';

const MainRow = styled(Row)`
  position: relative;
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-right: ${({ theme }) => theme.spaces[3]};
  padding-left: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};

  ${({ theme, disabled }) =>
    disabled
      ? `
    color: ${theme.colors.neutral600};
    background: ${theme.colors.neutral150};
  `
      : undefined}

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.primary600};
  }
`;

const Input = styled.input`
  min-height: ${40 / 16}rem;
  border: none;
  flex: 1;
  font-size: ${14 / 16}rem;
  color: ${({ theme }) => theme.colors.neutral800};
  &:focus-visible {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }
`;

const OptionBox = styled(Box)`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  ${({ isSelected, theme }) => isSelected && `background: ${theme.colors.primary100};`}

  &:hover {
    background: ${({ theme }) => theme.colors.primary100};
  }
`;

export const Combobox = ({
  createMessage,
  disabled,
  label,
  options,
  value,
  onChange,
  placeholder,
  isCreatable,
  onCreateOption,
  onLoadMore,
  noOptionsMessage,
  hasMoreItems,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value ? options.find((v) => v.value === value)?.name : '');

  useEffect(() => {
    setFilteredOptions(filterOptions(options, inputValue));
  }, [inputValue, options]);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const index = filteredOptions.findIndex((v) => v.value === value);
    if (index !== -1) {
      const selected = filteredOptions[index];
      setInputValue(selected.name);
      setActiveIndex(0);
      setSelectedIndex(0);
      setFilteredOptions(filterOptions(options, inputValue));
    }
  }, [value]);

  const activeOptionRef = useRef();
  const htmlId = useId('combobox');
  const ignoreBlur = useRef(false);
  const inputRef = useRef();
  const containerRef = useRef();
  const listboxRef = useRef();

  useEffect(() => {
    if (open && isScrollable(listboxRef.current)) {
      maintainScrollVisibility(activeOptionRef.current, listboxRef.current);
    }
  });

  const activeId = open ? `${htmlId}-${activeIndex}` : '';

  const onInput = () => {
    const curValue = inputRef.current.value;
    setFilteredOptions(filterOptions(options, curValue));
    setActiveIndex(0);
    setSelectedIndex(null);

    if (inputValue !== curValue) {
      setInputValue(curValue);
    }

    if (!open) {
      updateMenuState(true, false);
    }
  };

  const onInputKeyDown = (event) => {
    const { key } = event;
    const max = filteredOptions.length - 1;
    const action = getActionFromKey(key, open);

    switch (action) {
      case MenuActions.Next:
      case MenuActions.Last:
      case MenuActions.First:
      case MenuActions.Previous:
        event.preventDefault();
        return onOptionChange(getUpdatedIndex(activeIndex, max, action));
      case MenuActions.CloseSelect:
        event.preventDefault();
        onOptionSelect(activeIndex);
        return;
      case MenuActions.Close:
        event.preventDefault();
        return updateMenuState(false);
      case MenuActions.Open:
        return updateMenuState(true);
      default:
        return;
    }
  };

  const onInputBlur = () => {
    if (ignoreBlur.current) {
      ignoreBlur.current = false;
      return;
    }

    updateMenuState(false, false);
  };

  const onOptionChange = (index) => {
    setActiveIndex(index);
  };

  const onOptionClick = (index) => {
    onOptionChange(index);
    onOptionSelect(index);
  };

  const onOptionMouseDown = () => {
    ignoreBlur.current = true;
  };

  const onOptionSelect = (index) => {
    const selected = filteredOptions[index];
    if (selected) {
      onChange(selected.value);
      return updateMenuState(false);
    }

    if (isCreatable) {
      onCreateOption(inputValue);
      updateMenuState(false);
    }
  };

  const updateMenuState = (open, callFocus = true) => {
    setOpen(open);
    callFocus && inputRef.current.focus();
  };

  return (
    <>
      <MainRow ref={containerRef} disabled={disabled}>
        <Input
          aria-activedescendant={activeId}
          aria-autocomplete="list"
          aria-controls={`${htmlId}-listbox`}
          aria-expanded={`${open}`}
          aria-haspopup="listbox"
          aria-label={label}
          disabled={disabled}
          ref={inputRef}
          role="combobox"
          type="text"
          value={inputValue}
          onBlur={onInputBlur}
          onClick={() => updateMenuState(true)}
          onInput={onInput}
          onKeyDown={onInputKeyDown}
          placeholder={placeholder}
        />
        <Row>
          <CaretBox
            disabled={disabled}
            paddingLeft={3}
            aria-hidden
            as="button"
            onClick={() => {
              inputRef.current.focus();
              updateMenuState(true);
            }}
            tabIndex={-1}
          >
            <DropdownIcon />
          </CaretBox>
        </Row>
      </MainRow>
      {open && (
        <Popover
          source={containerRef}
          spacingTop={1}
          fullWidth
          intersectionId={`${htmlId}-listbox-popover-intersection`}
          onReachEnd={hasMoreItems ? onLoadMore : undefined}
        >
          <div role="listbox" ref={listboxRef} id={`${htmlId}-listbox`}>
            {Boolean(filteredOptions.length) ? (
              filteredOptions.map((option, i) => {
                const isActive = activeIndex === i;
                return (
                  <OptionBox
                    hasRadius
                    paddingLeft={4}
                    paddingRight={4}
                    paddingTop={2}
                    paddingBottom={2}
                    role="option"
                    background={'neutral0'}
                    key={`${htmlId}-${i}`}
                    id={`${htmlId}-${i}`}
                    aria-selected={selectedIndex === i ? 'true' : false}
                    ref={(r) => {
                      if (isActive) activeOptionRef.current = r;
                    }}
                    onClick={() => onOptionClick(i)}
                    onMouseDown={onOptionMouseDown}
                    isSelected={isActive}
                  >
                    <Text textColor={isActive ? 'primary600' : 'neutral800'} bold={isActive}>
                      {option.name}
                    </Text>
                  </OptionBox>
                );
              })
            ) : isCreatable ? (
              <OptionBox
                paddingLeft={4}
                paddingRight={4}
                paddingTop={2}
                paddingBottom={2}
                ref={activeOptionRef}
                onMouseDown={onOptionMouseDown}
                role="option"
                onClick={() => onOptionSelect()}
              >
                <Text textColor="neutral800">{createMessage(inputValue)}</Text>
              </OptionBox>
            ) : (
              <Box paddingLeft={4} paddingRight={4} paddingTop={2} paddingBottom={2} ref={activeOptionRef}>
                <Text textColor="neutral800">{noOptionsMessage(inputValue)}</Text>
              </Box>
            )}
          </div>
        </Popover>
      )}
    </>
  );
};

Combobox.defaultProps = {
  createMessage: (value) => `Create "${value}"`,
  disabled: false,
  hasMoreItems: false,
  isCreatable: false,
  noOptionsMessage: () => 'No results found',
  onCreateOption: undefined,
  onLoadMore: undefined,
  placeholder: 'Select or enter a value',
};

Combobox.propTypes = {
  createMessage: PropTypes.func,
  disabled: PropTypes.bool,
  hasMoreItems: PropTypes.bool,
  isCreatable: PropTypes.bool,
  label: PropTypes.string.isRequired,
  noOptionsMessage: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onCreateOption: PropTypes.func,
  onLoadMore: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default Combobox;
