import React, { useEffect, useState, useRef, useLayoutEffect, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { CarretDown, Cross } from '@strapi/icons';

import { useId } from '../helpers/useId';
import { getActionFromKey, getUpdatedIndex, maintainScrollVisibility, MenuActions, filterOptions } from './utils';

import { Flex } from '../Flex';
import { CaretBox, IconBox } from '../Select/components';
import { Popover } from '../Popover';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Loader } from '../Loader/Loader';
import { Input, MainRow, ValueContainer, InputContainer } from './components';
import { ComboboxOption } from './ComboboxOption';
import { Field, FieldError, FieldHint, FieldLabel } from '../Field';
import { Stack } from '../Stack';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { VisuallyHidden } from '../VisuallyHidden';

export const Combobox = ({
  children: nodes,
  clearLabel,
  creatable,
  createMessage,
  disabled,
  error,
  hasMoreItems,
  hint,
  id,
  label,
  labelAction,
  loading,
  loadingMessage,
  noOptionsMessage,
  onChange,
  onClear,
  onCreateOption,
  onInputChange,
  onLoadMore,
  placeholder,
  required,
  value,
  ...props
}) => {
  const getInputValueFromNodes = () =>
    nodes.find((node) => node.props?.value.toLowerCase() === value.toLowerCase()).props?.children;

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filteredNodes, setFilteredNodes] = useState(nodes);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const activeOptionRef = useRef();
  const ignoreBlur = useRef(false);
  const inputRef = useRef();
  const containerRef = useRef();
  const listboxRef = useRef();
  const firstUpdate = useRef(true);

  const generatedId = useId(id);
  const labelId = `${generatedId}-label`;

  if (!label && !props['aria-label']) {
    throw new Error('The Combobox component needs a "label" or an "aria-label" props');
  }

  // Filter the nodes on input changes.
  useEffect(() => {
    setFilteredNodes(filterOptions(nodes, inputValue));
  }, [inputValue, nodes]);

  // Maintain the scroll visibility
  useEffect(() => {
    if (open && activeOptionRef.current) {
      maintainScrollVisibility(activeOptionRef.current);
    }
  }, [activeIndex, open]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    }
  }, [value]);

  const activeId = open ? `${generatedId}-${activeIndex}` : '';

  const clearCombobox = () => {
    onChange(null);
    setInputValue('');
  };

  const onInput = (event) => {
    if (onInputChange) {
      onInputChange(event);
    }

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
    const max = creatable && inputValue ? filteredNodes.length : filteredNodes.length - 1;
    const action = getActionFromKey(key, open);

    if (value && !inputValue && key === KeyboardKeys.BACKSPACE) {
      clearCombobox();
    }

    switch (action) {
      case MenuActions.Next: {
        if (activeIndex === max) {
          onOptionChange(0);

          break;
        }

        onOptionChange(getUpdatedIndex(activeIndex, max, action));

        break;
      }
      case MenuActions.Previous: {
        if (activeIndex === 0) {
          onOptionChange(max);

          break;
        }

        onOptionChange(getUpdatedIndex(activeIndex, max, action));

        break;
      }
      case MenuActions.Last:
      case MenuActions.First: {
        if (activeIndex === max) {
          onOptionChange(0);

          break;
        }

        onOptionChange(getUpdatedIndex(activeIndex, max, action));

        break;
      }
      case MenuActions.CloseSelect:
        event.preventDefault();
        onOptionSelect(activeIndex);

        break;
      case MenuActions.Close:
        event.preventDefault();

        updateMenuState(false);

        break;
      case MenuActions.Open:
        updateMenuState(true);

        break;
      default:
    }
  };

  const onInputBlur = (e) => {
    e.preventDefault();

    if (value && !ignoreBlur.current) {
      setInputValue('');
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
    setInputValue('');

    if (selected) {
      onChange(selected.props.value);

      updateMenuState(false);

      return;
    }

    if (creatable) {
      onCreateOption(inputValue);
      updateMenuState(false);
    }
  };

  const updateMenuState = (open, callFocus = true) => {
    setOpen(open);

    if (callFocus) {
      inputRef.current.focus();
    }
  };

  const filteredNodesClone = Children.toArray(filteredNodes).map((node, i) => {
    const isActive = activeIndex === i;

    return cloneElement(node, {
      id: `${generatedId}-${i}`,
      'aria-selected': selectedIndex === i,
      'aria-posinset': i + 1,
      'aria-setsize': Children.toArray(filteredNodes).length,
      ref(r) {
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

  const hasOption = () => {
    const nodeIndex = filteredNodes.findIndex((node) => node.props?.children === inputValue);

    return inputValue && nodeIndex === -1;
  };

  const handleClick = (e) => {
    e.preventDefault();
    updateMenuState(e, true);
  };

  // Ensuring we pass the right aria-describedby attribute to the Input component as
  // Combobox is not using FieldInput which would allow us to pass on the error or hint with aria-describedby
  let ariaDescription;

  if (error) {
    ariaDescription = `${generatedId}-error`;
  } else if (hint) {
    ariaDescription = `${generatedId}-hint`;
  }

  return (
    <Field hint={hint} error={error} id={generatedId} required={required}>
      <VisuallyHidden aria-live="polite" aria-atomic="false" aria-relevant="additions text">
        {value}
      </VisuallyHidden>
      <Stack spacing={label || hint || error ? 1 : 0}>
        {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}
        <MainRow ref={containerRef} $disabled={disabled} hasError={error}>
          <InputContainer wrap="wrap">
            {!inputValue && value && (
              <ValueContainer id={`${generatedId}-selected-value`}>
                <Typography>{getInputValueFromNodes()}</Typography>
              </ValueContainer>
            )}
            <Input
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              aria-controls={`${generatedId}-listbox`}
              aria-disabled={disabled}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-describedby={ariaDescription}
              autoComplete="off"
              autoCorrect="off"
              id={generatedId}
              onBlur={disabled ? undefined : onInputBlur}
              onClick={disabled ? undefined : handleClick}
              onInput={disabled ? undefined : onInput}
              onKeyDown={disabled ? undefined : onInputKeyDown}
              placeholder={value ? '' : placeholder}
              readOnly={disabled}
              ref={inputRef}
              required={required}
              role="combobox"
              spellCheck="off"
              type="text"
              value={inputValue}
            />
          </InputContainer>
          <Flex>
            {(value || inputValue) && (
              <IconBox
                id={`${generatedId}-clear`}
                aria-label={clearLabel}
                disabled={disabled}
                paddingLeft={3}
                as="button"
                onClick={handleClear}
                type="button"
              >
                <Cross />
              </IconBox>
            )}
            <CaretBox
              disabled={disabled}
              paddingLeft={3}
              aria-hidden
              as="button"
              onClick={handleCaretClick}
              tabIndex={-1}
              type="button"
            >
              <CarretDown />
            </CaretBox>
          </Flex>
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
            {(Boolean(filteredNodes.length) || creatable) && (
              <>
                {filteredNodesClone}
                {hasOption(inputValue) && creatable && (
                  <ComboboxOption
                    isSelected={activeIndex === filteredNodes.length}
                    ref={(r) => {
                      if (activeIndex === filteredNodes.length) activeOptionRef.current = r;
                    }}
                    onMouseDown={onOptionMouseDown}
                    onClick={() => onOptionSelect()}
                    taindex={0}
                  >
                    {createMessage(inputValue)}
                  </ComboboxOption>
                )}
              </>
            )}
            {!filteredNodes.length && !creatable && !loading && (
              <Box paddingLeft={4} paddingRight={4} paddingTop={2} paddingBottom={2} ref={activeOptionRef}>
                <Typography textColor="neutral800">{noOptionsMessage(inputValue)}</Typography>
              </Box>
            )}
            {loading && (
              <Flex justifyContent="center" alignItems="center" paddingTop={2} paddingBottom={2}>
                <Loader small>{loadingMessage}</Loader>
              </Flex>
            )}
          </div>
        </Popover>
      )}
    </Field>
  );
};

export const CreatableCombobox = (props) => <Combobox {...props} creatable />;

Combobox.defaultProps = {
  'aria-label': undefined,
  clearLabel: 'clear',
  creatable: false,
  createMessage: (value) => `Create "${value}"`,
  disabled: false,
  error: undefined,
  hasMoreItems: false,
  hint: undefined,
  id: undefined,
  label: undefined,
  loading: false,
  loadingMessage: 'Loading content...',
  noOptionsMessage: () => 'No results found',
  onClear: undefined,
  onCreateOption: undefined,
  onInputChange: undefined,
  onLoadMore: undefined,
  placeholder: 'Select or enter a value',
  value: undefined,
};

CreatableCombobox.defaultProps = Combobox.defaultProps;

Combobox.propTypes = {
  'aria-label': PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  clearLabel: PropTypes.string,
  creatable: PropTypes.bool,
  createMessage: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hasMoreItems: PropTypes.bool,
  id: PropTypes.string,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  label: PropTypes.string,
  labelAction: PropTypes.element,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onCreateOption: PropTypes.func,
  onInputChange: PropTypes.func,
  onLoadMore: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

CreatableCombobox.propTypes = {
  ...Combobox.propTypes,
  onCreateOption: PropTypes.func.isRequired,
};
