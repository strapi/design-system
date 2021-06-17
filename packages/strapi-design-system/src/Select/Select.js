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
import { useButtonRef } from './hooks/useButtonRef';

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
  const [expanded, setExpanded] = useState(undefined);
  const buttonRef = useButtonRef(expanded);
  const containerRef = useRef(null);

  const labelId = `label-${idRef.current}`;
  const contentId = `content-${idRef.current}`;

  const handleTrigger = (direction = 'down') => {
    setExpanded(direction);
  };

  const handleEscape = () => {
    setExpanded(undefined);
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

    handleTrigger('down');
  };

  const handleSelectItem = (value) => {
    onChange(value);
    setExpanded(undefined);
  };

  let selectOptionLabel;

  const childrenClone = Children.toArray(children).map((node) => {
    const optionId = `option-${idRef.current}-${node.props.value}`;

    const selected = node.props.value === value;

    if (selected) {
      selectOptionLabel = node.props.children;
    }

    return cloneElement(node, {
      id: optionId,
      onClick: () => handleSelectItem(node.props.value),
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
              expanded={Boolean(expanded)}
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
            labelledBy={labelId}
            onEscape={handleEscape}
            expanded={expanded}
            onSelectItem={onChange}
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
