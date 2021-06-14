import React, { Children, cloneElement, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import DropdownIcon from '@strapi/icons/FilterDropdownIcon';
import { SelectButton } from './SelectButton';
import { Field, FieldHint, FieldLabel, FieldError } from '../Field';
import { Popover } from '../Popover';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Row } from '../Row';
import { genId } from '../helpers/genId';
import { SelectList } from './SelectList';
import { SelectButtonWrapper, CaretBox } from './components';
import { SelectContext } from './SelectContext';
import { useListRef } from './hooks/useListRef';
import { useButtonRef } from './hooks/useButtonRef';
import { VisuallyHidden } from '../VisuallyHidden';

export const Select = ({
  label,
  id,
  children,
  customizedLabel,
  placeholder,
  onChange,
  value,
  hint,
  error,
  disabled,
  multi,
  action,
  ...props
}) => {
  const [expanded, setExpanded] = useState(undefined);
  const idRef = useRef(id || genId());
  const listRef = useListRef(expanded);
  const buttonRef = useButtonRef(expanded);
  const containerRef = useRef(null);

  const labelId = `label-${idRef.current}`;
  const contentId = `content-${idRef.current}`;

  const focusButton = () => {
    buttonRef.current.focus();
  };

  const handleEscape = () => {
    setExpanded(undefined);
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    // Check if the right click has been clicked
    // "which" check is for webkit
    if (e.nativeEvent.which === 3 || e.nativeEvent.button === 2) {
      return;
    }

    setExpanded('down');
  };

  let selectOptionLabel;
  let activeOptionId;

  const childrenClone = Children.toArray(children).map((node) => {
    const optionId = `option-${idRef.current}-${node.props.value}`;

    const handleChange = () => {
      if (multi) {
        onChange(node.props.value);
      } else {
        /**
         * We don't want to hide directly when the Select is a multi select so that the usr
         * can select multiple values and decide themselves to close the popover
         */
        onChange(node.props.value);
        setExpanded(undefined);
      }
    };

    const selected = multi ? value.includes(node.props.value) : node.props.value === value;

    if (selected) {
      selectOptionLabel = node.props.children;
      activeOptionId = optionId;
    }

    return cloneElement(node, {
      id: optionId,
      onSelect: handleChange,
      selected,
      multi,
    });
  });

  return (
    <SelectContext.Provider value={{ disabled, focusButton }}>
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
                onTrigger={setExpanded}
                id={idRef.current}
                hasError={Boolean(error)}
                disabled={disabled}
                onMouseDown={handleMouseDown}
                {...props}
              >
                <Text id={contentId} as="span" aria-hidden={true} textColor={value ? 'neutral800' : 'neutral600'}>
                  {customizedLabel ? customizedLabel(value) : selectOptionLabel || placeholder}
                  {multi && <VisuallyHidden as="span">{value.join(', ')}</VisuallyHidden>}
                </Text>
              </SelectButton>

              <Row>
                {(multi && value.length > 0) || (!multi && value) ? action : undefined}

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
    </SelectContext.Provider>
  );
};

Select.defaultProps = {
  action: undefined,
  children: [],
  customizedLabel: undefined,
  disabled: false,
  id: undefined,
  placeholder: undefined,
  value: undefined,
  hint: undefined,
  error: undefined,
  multi: false,
};

Select.propTypes = {
  action: PropTypes.node,
  children: PropTypes.arrayOf(PropTypes.node),
  customizedLabel: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    PropTypes.string,
    PropTypes.number,
  ]),
};
