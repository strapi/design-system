import React, { useEffect, useState, useRef, useLayoutEffect, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../helpers/useId';
import DropdownIcon from '@strapi/icons/FilterDropdownIcon';
import { getActionFromKey, getUpdatedIndex, maintainScrollVisibility, MenuActions, filterOptions } from './utils';

import { Row } from '../Row';
import { CaretBox } from '../Select/components';
import { Popover } from '../Popover';
import { Box } from '../Box';
import { Text } from '../Text';
import { Loader } from '../Loader/Loader';
import { Input, MainRow, OptionBox } from './components';

export const Combobox = ({
  createMessage,
  disabled,
  label,
  value,
  onChange,
  placeholder,
  creatable,
  loading,
  loadingMessage,
  onCreateOption,
  onLoadMore,
  noOptionsMessage,
  hasMoreItems,
  children: nodes,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filteredNodes, setFilteredNodes] = useState(nodes);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value ? nodes.find((v) => v.value === value)?.name : '');

  useEffect(() => {
    setFilteredNodes(filterOptions(nodes, inputValue));
  }, [inputValue, nodes]);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const index = filteredNodes.findIndex((node) => node.props.value === value);
    if (index !== -1) {
      const selected = filteredNodes[index];
      setInputValue(selected.props.children);
      setActiveIndex(0);
      setSelectedIndex(0);
      setFilteredNodes(filterOptions(nodes, inputValue));
    }
  }, [value]);

  const activeOptionRef = useRef();
  const htmlId = useId('combobox');
  const ignoreBlur = useRef(false);
  const inputRef = useRef();
  const containerRef = useRef();
  const listboxRef = useRef();

  useEffect(() => {
    if (open && activeOptionRef.current) {
      maintainScrollVisibility(activeOptionRef.current);
    }
  }, [activeIndex]);

  const activeId = open ? `${htmlId}-${activeIndex}` : '';

  const onInput = () => {
    const curValue = inputRef.current.value;
    setFilteredNodes(filterOptions(nodes, curValue));
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
    const max = filteredNodes.length - 1;
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
    const selected = filteredNodes[index];
    if (selected) {
      onChange(selected.props.value);
      return updateMenuState(false);
    }

    if (creatable) {
      onCreateOption(inputValue);
      updateMenuState(false);
    }
  };

  const updateMenuState = (open, callFocus = true) => {
    setOpen(open);
    callFocus && inputRef.current.focus();
  };

  const filteredNodesClone = Children.toArray(filteredNodes).map((node, i) => {
    const isActive = activeIndex === i;
    return cloneElement(node, {
      id: `${htmlId}-${i}`,
      'aria-selected': selectedIndex === i ? 'true' : false,
      ref: (r) => {
        if (isActive) activeOptionRef.current = r;
      },
      onClick: () => onOptionClick(i),
      onMouseDown: onOptionMouseDown,
      isSelected: isActive,
    });
  });

  return (
    <>
      <MainRow ref={containerRef} $disabled={disabled}>
        <Input
          aria-activedescendant={activeId}
          aria-autocomplete="list"
          aria-controls={`${htmlId}-listbox`}
          aria-expanded={`${open}`}
          aria-haspopup="listbox"
          aria-label={label}
          aria-disabled={disabled}
          readOnly={disabled}
          ref={inputRef}
          role="combobox"
          type="text"
          value={inputValue}
          onBlur={disabled ? undefined : onInputBlur}
          onClick={disabled ? undefined : () => updateMenuState(true)}
          onInput={disabled ? undefined : onInput}
          onKeyDown={disabled ? undefined : onInputKeyDown}
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
          onReachEnd={hasMoreItems && !loading ? onLoadMore : undefined}
        >
          <div role="listbox" ref={listboxRef} id={`${htmlId}-listbox`}>
            {Boolean(filteredNodes.length) ? (
              filteredNodesClone
            ) : creatable ? (
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
              !loading && (
                <Box paddingLeft={4} paddingRight={4} paddingTop={2} paddingBottom={2} ref={activeOptionRef}>
                  <Text textColor="neutral800">{noOptionsMessage(inputValue)}</Text>
                </Box>
              )
            )}
            {loading && (
              <Row justifyContent="center" alignItems="center" paddingTop={2} paddingBottom={2}>
                <Loader small>{loadingMessage}</Loader>
              </Row>
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
  loading: false,
  loadingMessage: 'Loading content...',
  hasMoreItems: false,
  creatable: false,
  noOptionsMessage: () => 'No results found',
  onCreateOption: undefined,
  onLoadMore: undefined,
  placeholder: 'Select or enter a value',
};

Combobox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  creatable: PropTypes.bool,
  createMessage: PropTypes.func,
  disabled: PropTypes.bool,
  hasMoreItems: PropTypes.bool,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onCreateOption: PropTypes.func,
  onLoadMore: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default Combobox;
