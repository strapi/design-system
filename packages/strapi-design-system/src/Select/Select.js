import React, { Children, cloneElement, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import DropdownIcon from '@strapi/icons/FilterDropdownIcon';
import CloseAlertIcon from '@strapi/icons/CloseAlertIcon';
import { SelectButton } from './SelectButton';
import { Field, FieldHint, FieldLabel, FieldError } from '../Field';
import { Popover } from '../Popover';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Row } from '../Row';
import { genId } from '../helpers/genId';
import { SelectList } from './SelectList';
import { SelectButtonWrapper, IconBox, CaretBox } from './components';

export const Select = ({
  label,
  id,
  children,
  placeholder,
  onChange,
  value,
  hint,
  error,
  disabled,
  clearLabel,
  ...props
}) => {
  const idRef = useRef(id || genId());
  const listRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const labelId = `label-${idRef.current}`;
  const contentId = `content-${idRef.current}`;

  const handleTrigger = (direction = 'down') => {
    setExpanded((s) => !s);

    /**
     * Make sure the focus is sent when React has finished its rendering phase
     */
    setTimeout(() => {
      if (!listRef.current) return;

      const lastSelected = listRef.current.querySelector('[aria-selected="true"]');
      const options = listRef.current.querySelectorAll('[role="option"]');

      if (direction === 'up') {
        const lastOption = lastSelected || options[options.length - 1];

        if (lastOption) {
          lastOption.focus();
        }
      } else {
        const firstOption = lastSelected || options[0];

        if (firstOption) {
          firstOption.focus();
        }
      }
    }, 0);
  };

  const handleEscape = () => {
    setExpanded(false);

    buttonRef.current.focus();
  };

  const handleClear = () => {
    if (disabled) return;

    onChange(undefined);
    buttonRef.current.focus();
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    // Check if the right click has been clicked
    // "which" check is for webkit
    if (e.nativeEvent.which === 3 || e.nativeEvent.button === 2) {
      return;
    }

    handleTrigger();
  };

  let selectOptionLabel;
  let activeOptionId;

  const childrenClone = Children.toArray(children).map((node) => {
    const optionId = `option-${idRef.current}-${node.props.value}`;

    const handleChange = () => {
      onChange(node.props.value);
      setExpanded(false);
      buttonRef.current.focus();
    };

    const selected = node.props.value === value;

    if (selected) {
      selectOptionLabel = node.props.children;
      activeOptionId = optionId;
    }

    return cloneElement(node, {
      id: optionId,
      onSelect: handleChange,
      selected,
    });
  });

  return (
    <Field hint={hint} error={error} id={idRef.current}>
      <Stack size={1}>
        <FieldLabel as="span" id={labelId}>
          {label}
        </FieldLabel>

        <SelectButtonWrapper hasError={Boolean(error)} disabled={disabled} ref={containerRef}>
          <Row justifyContent="space-between" as="span">
            <SelectButton
              ref={buttonRef}
              labelledBy={selectOptionLabel ? `${labelId} ${contentId}` : labelId}
              expanded={expanded}
              onTrigger={handleTrigger}
              id={idRef.current}
              hasError={Boolean(error)}
              disabled={disabled}
              onMouseDown={handleMouseDown}
              {...props}
            >
              <Text id={contentId} as="span" aria-hidden={true} textColor={value ? 'neutral800' : 'neutral600'}>
                {selectOptionLabel || placeholder}
              </Text>
            </SelectButton>

            <Row>
              {value && (
                <IconBox as="button" onClick={handleClear} aria-label={clearLabel} aria-disabled={disabled}>
                  <CloseAlertIcon />
                </IconBox>
              )}

              <CaretBox paddingLeft={3} aria-hidden as="button" onMouseDown={handleMouseDown} tabIndex={-1}>
                <DropdownIcon />
              </CaretBox>
            </Row>
          </Row>
        </SelectButtonWrapper>

        <FieldHint />
        <FieldError />
      </Stack>

      {expanded && (
        <Popover source={containerRef} spacingTop={1} fullWidth>
          <SelectList
            selectId={idRef.current}
            selectedOptionId={activeOptionId}
            labelledBy={labelId}
            ref={listRef}
            onEscape={handleEscape}
          >
            {childrenClone}
          </SelectList>
        </Popover>
      )}
    </Field>
  );
};

Select.defaultProps = {
  children: [],
  disabled: false,
  id: undefined,
  placeholder: undefined,
  value: undefined,
  hint: undefined,
  error: undefined,
};

Select.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  clearLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
