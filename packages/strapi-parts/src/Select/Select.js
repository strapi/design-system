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
import { Box } from '../Box';
import { useId } from '../helpers/useId';
import { SelectList } from './SelectList';
import { SelectButtonWrapper, IconBox, CaretBox } from './components';
import { useButtonRef } from './hooks/useButtonRef';
import { VisuallyHidden } from '../VisuallyHidden';
import { DownState } from './constants';
import { escapeSelector } from '../helpers/escapeSelector';
import { SelectTags } from './SelectTags';
import styled from 'styled-components';

const MainRow = styled(Row)`
  min-height: ${({ size }) => (size === 'S' ? 34 / 16 : 40 / 16)}rem;
`;

export const Select = ({
  label,
  id,
  children,
  customizeContent,
  placeholder,
  onChange,
  value,
  hint,
  error,
  disabled,
  clearLabel,
  onClear,
  onReachEnd,
  multi,
  size,
  startIcon,
  withTags,
  ...props
}) => {
  const generatedId = useId('select', id);
  const [expanded, setExpanded] = useState(undefined);
  const buttonRef = useButtonRef(expanded);
  const containerRef = useRef(null);

  const labelId = `${generatedId}-label`;
  const contentId = `${generatedId}-content`;
  const ariaDescribedBy = error ? `${generatedId}-error` : hint ? `${generatedId}-hint` : undefined;

  if (withTags && !multi) {
    throw new Error('The "withTags" props can only be used when the "multi" prop is present');
  }

  const handleEscape = () => {
    setExpanded(undefined);
  };

  const handleClear = () => {
    if (disabled) return;

    onClear();
    buttonRef.current.focus();
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    // Check if the right click has been clicked
    // "which" check is for webkit
    if (e.nativeEvent.which === 3 || e.nativeEvent.button === 2) {
      return;
    }

    setExpanded(DownState.Mouse);
  };

  const handleSelectItem = (newValue, closeMenu = true) => {
    if (multi) {
      onChange(value.includes(newValue) ? value.filter((x) => x !== newValue) : [...value, newValue]);
    } else {
      onChange(newValue);
      if (closeMenu) setExpanded(undefined);
    }
  };

  const handleSelectGroupItem = (newValue) => {
    onChange(
      value.includes(newValue[0])
        ? value.filter(function (e) {
            return this.indexOf(e) < 0;
          }, newValue)
        : [...value, ...newValue],
    );
  };

  let selectOptionLabel;
  let tags = [];

  const cloneOption = (node, isChild) => {
    const optionId = `${generatedId}-option-${node.props.value}`;

    const selected = multi ? value.includes(node.props.value) : node.props.value === value;

    if (selected) {
      if (withTags) {
        tags.push({ label: node.props.children, value: node.props.value });
      } else {
        selectOptionLabel = node.props.children;
      }
    }

    return cloneElement(node, {
      id: escapeSelector(optionId),
      onClick: () => handleSelectItem(node.props.value),
      selected,
      multi,
      isChild,
    });
  };

  const childrenClone = Children.toArray(children).map((node) => {
    if (node.type.displayName === 'OptGroup') {
      const optionId = `${generatedId}-option-${node.props.label}`;

      const selected = node.props.children.every((child) => value.includes(child.props.value));
      const indeterminate = !selected && node.props.children.some((child) => value.includes(child.props.value));

      return cloneElement(node, {
        id: escapeSelector(optionId),
        onClick: () => handleSelectGroupItem(node.props.children.map((child) => child.props.value)),
        selected,
        indeterminate,
        multi,
        children: Children.toArray(node.props.children).map((node) => cloneOption(node, true)),
        value: node.props.label,
      });
    } else {
      return cloneOption(node);
    }
  });

  return (
    <Field hint={hint} error={error} id={generatedId}>
      <Stack size={label || hint || error ? 1 : 0}>
        <FieldLabel as="span" id={labelId}>
          {label}
        </FieldLabel>

        <SelectButtonWrapper hasError={Boolean(error)} disabled={disabled} ref={containerRef}>
          <SelectButton
            ref={buttonRef}
            labelledBy={`${labelId} ${contentId}`}
            aria-describedby={ariaDescribedBy}
            expanded={Boolean(expanded)}
            onTrigger={setExpanded}
            id={generatedId}
            hasError={Boolean(error)}
            disabled={disabled}
            onMouseDown={handleMouseDown}
            {...props}
          />

          <MainRow size={size} justifyContent="space-between">
            <Row>
              {startIcon && (
                <Box paddingLeft={3} aria-hidden={true}>
                  {startIcon}
                </Box>
              )}

              {withTags && <SelectTags tags={tags} onRemoveTag={handleSelectItem} disabled={disabled} />}

              <Box paddingLeft={4} paddingRight={4}>
                {withTags ? (
                  <>
                    {!value || value.length === 0 ? (
                      <Text id={contentId} textColor={'neutral600'}>
                        {placeholder}
                      </Text>
                    ) : null}
                    <VisuallyHidden as="span" id={contentId}>
                      {customizeContent ? customizeContent(value) : selectOptionLabel || placeholder}
                      {value.join(', ')}
                    </VisuallyHidden>
                  </>
                ) : (
                  <Text id={contentId} textColor={value ? 'neutral800' : 'neutral600'}>
                    {customizeContent ? customizeContent(value) : selectOptionLabel || placeholder}
                    {multi && <VisuallyHidden as="span">{value.join(', ')}</VisuallyHidden>}
                  </Text>
                )}
              </Box>
            </Row>

            <Row>
              {((multi && value && value.length) || (!multi && value)) && onClear && (
                <IconBox as="button" onClick={handleClear} aria-label={clearLabel} aria-disabled={disabled}>
                  <CloseAlertIcon />
                </IconBox>
              )}

              <CaretBox paddingLeft={3} aria-hidden as="button" onMouseDown={handleMouseDown} tabIndex={-1}>
                <DropdownIcon />
              </CaretBox>
            </Row>
          </MainRow>
        </SelectButtonWrapper>

        <FieldHint />
        <FieldError />
      </Stack>

      {expanded && (
        <Popover
          source={containerRef}
          spacingTop={1}
          fullWidth
          intersectionId={`select-list-intersection-${generatedId}`}
          onReachEnd={onReachEnd}
        >
          <SelectList
            selectId={generatedId}
            labelledBy={labelId}
            onEscape={handleEscape}
            expanded={expanded}
            onSelectItem={(value, isGroup) => (isGroup ? handleSelectGroupItem(value) : handleSelectItem(value, false))}
            multi={multi}
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
  clearLabel: 'Clear',
  customizeContent: undefined,
  disabled: false,
  id: undefined,
  multi: false,
  onChange: () => {},
  onClear: undefined,
  onReachEnd: undefined,
  value: undefined,
  hint: undefined,
  error: undefined,
  placeholder: 'Select...',
  size: 'M',
  startIcon: undefined,
  withTags: false,
};

Select.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  clearLabel: PropTypes.string,
  customizeContent: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onReachEnd: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['S', 'M']),
  startIcon: PropTypes.element,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    PropTypes.string,
    PropTypes.number,
  ]),
  withTags: PropTypes.bool,
};
