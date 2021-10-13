import React, { useEffect, useState, useRef, useLayoutEffect, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../helpers/useId';
import DropdownIcon from '@strapi/icons/FilterDropdownIcon';
import CloseAlertIcon from '@strapi/icons/CloseAlertIcon';
import { getActionFromKey, getUpdatedIndex, maintainScrollVisibility, MenuActions, filterOptions } from './utils';

import { Row } from '../Row';
import { CaretBox, IconBox } from '../Select/components';
import { Popover } from '../Popover';
import { Box } from '../Box';
import { Text } from '../Text';
import { Loader } from '../Loader/Loader';
import { Input, MainRow, OptionBox } from './components';
import { Field, FieldError, FieldHint, FieldLabel } from '../Field';
import { Stack } from '../Stack';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export const Combobox = ({
  backspaceToClear,
  clearLabel,
  createMessage,
  disabled,
  hint,
  error,
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
  onClear,
  ...props
}) => {
  const getInputValueFromNodes = () =>
    nodes.find((node) => node.props?.value.toLowerCase() === value.toLowerCase()).props?.children;

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filteredNodes, setFilteredNodes] = useState(nodes);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value ? getInputValueFromNodes() : '');

  if (!label && !props['aria-label']) {
    throw new Error('The Combobox component needs a "label" or an "aria-label" props');
  }

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
  const ignoreBlur = useRef(false);
  const inputRef = useRef();
  const containerRef = useRef();
  const listboxRef = useRef();

  const generatedId = useId('combobox');
  const labelId = `${generatedId}-label`;

  useEffect(() => {
    if (open && activeOptionRef.current) {
      maintainScrollVisibility(activeOptionRef.current);
    }
  }, [activeIndex]);

  const activeId = open ? `${generatedId}-${activeIndex}` : '';

  const clearCombobox = () => {
    onChange(null);
    setInputValue('');
  };

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

    if (value && key === KeyboardKeys.BACKSPACE && backspaceToClear) {
      clearCombobox();
    }

    switch (action) {
      case MenuActions.Next:
      case MenuActions.Last:
      case MenuActions.First:
      case MenuActions.Previous:
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
    if (value && !ignoreBlur.current) {
      const valueToSet = getInputValueFromNodes();
      setInputValue(valueToSet);
    }

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
      setInputValue(selected.props.children);
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
      id: `${generatedId}-${i}`,
      'aria-selected': selectedIndex === i ? true : false,
      'aria-posinset': i + 1,
      'aria-setsize': Children.toArray(filteredNodes).length,
      ref: (r) => {
        if (isActive) activeOptionRef.current = r;
      },
      onClick: () => onOptionClick(i),
      onMouseDown: onOptionMouseDown,
      isSelected: isActive,
    });
  });

  const handleClear = () => {
    inputRef.current.focus();

    if (onClear) {
      onClear();
    }

    clearCombobox();
  };

  const handleCaretClick = () => {
    inputRef.current.focus();
    updateMenuState(true);
  };

  return (
    <Field hint={hint} error={error} id={generatedId}>
      <Stack size={label || hint || error ? 1 : 0}>
        {label && <FieldLabel id={labelId}>{label}</FieldLabel>}
        <MainRow ref={containerRef} $disabled={disabled} hasError={error}>
          <Input
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-controls={`${generatedId}-listbox`}
            aria-disabled={disabled}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-labelledby={label ? labelId : undefined}
            id={generatedId}
            onBlur={disabled ? undefined : onInputBlur}
            onClick={disabled ? undefined : () => updateMenuState(true)}
            onInput={disabled ? undefined : onInput}
            onKeyDown={disabled ? undefined : onInputKeyDown}
            placeholder={placeholder}
            readOnly={disabled}
            ref={inputRef}
            role="combobox"
            autocomplete="nope"
            type="text"
            value={inputValue}
          />
          <Row>
            {inputValue && (
              <IconBox
                id={`${generatedId}-clear`}
                aria-label={clearLabel}
                disabled={disabled}
                paddingLeft={3}
                as="button"
                onClick={handleClear}
              >
                <CloseAlertIcon />
              </IconBox>
            )}
            <CaretBox
              disabled={disabled}
              paddingLeft={3}
              aria-hidden
              as="button"
              onClick={handleCaretClick}
              tabIndex={-1}
            >
              <DropdownIcon />
            </CaretBox>
          </Row>
        </MainRow>
        <FieldHint />
        <FieldError />
      </Stack>
      {open && (
        <Popover
          id={`${generatedId}-popover`}
          source={containerRef}
          spacing={4}
          fullWidth
          intersectionId={`${generatedId}-listbox-popover-intersection`}
          onReachEnd={hasMoreItems && !loading ? onLoadMore : undefined}
        >
          <div
            role="listbox"
            ref={listboxRef}
            id={`${generatedId}-listbox`}
            aria-labelledby={label ? labelId : undefined}
          >
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
    </Field>
  );
};

export const CreatableCombobox = (props) => <Combobox {...props} creatable />;

Combobox.defaultProps = CreatableCombobox.defaultProps = {
  'aria-label': undefined,
  backspaceToClear: true,
  clearLabel: 'clear',
  creatable: false,
  createMessage: (value) => `Create "${value}"`,
  disabled: false,
  error: undefined,
  hasMoreItems: false,
  hint: undefined,
  label: undefined,
  loading: false,
  loadingMessage: 'Loading content...',
  noOptionsMessage: () => 'No results found',
  onClear: undefined,
  onCreateOption: undefined,
  onLoadMore: undefined,
  placeholder: 'Select or enter a value',
  value: undefined,
};

Combobox.propTypes = {
  'aria-label': PropTypes.string,
  backspaceToClear: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  clearLabel: PropTypes.string,
  creatable: PropTypes.bool,
  createMessage: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hasMoreItems: PropTypes.bool,
  hint: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onCreateOption: PropTypes.func,
  onLoadMore: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

CreatableCombobox.propTypes = {
  ...Combobox.propTypes,
  onCreateOption: PropTypes.func.isRequired,
};
