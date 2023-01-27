import React, { Children, cloneElement, useRef, useState } from 'react';

import { CarretDown, Cross } from '@strapi/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SelectButtonWrapper, IconBox, CaretBox } from './components';
import { DownState } from './constants';
import { useButtonRef } from './hooks/useButtonRef';
import { SelectButton } from './SelectButton';
import { SelectList } from './SelectList';
import { SelectTags } from './SelectTags';
import { Box } from '../Box';
import { Field, FieldHint, FieldLabel, FieldError } from '../Field';
import { Flex } from '../Flex';
import { escapeSelector } from '../helpers/escapeSelector';
import { useId } from '../hooks/useId';
import { Popover } from '../Popover';
import { sizes } from '../themes/sizes';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

import { SingleSelect } from './SingleSelect';

const MainRow = styled(Flex)`
  width: 100%;
`;

const SelectWithTags = ({
  label,
  labelAction,
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
  required,
  selectButtonTitle,
  size,
  startIcon,
  withTags,
  ...props
}) => {
  const generatedId = useId(id);
  const [expanded, setExpanded] = useState(undefined);
  const buttonRef = useButtonRef(expanded);
  const containerRef = useRef(null);

  const labelId = `${generatedId}-label`;
  const contentId = `${generatedId}-content`;
  const hasStringError = typeof error === 'string';

  let ariaDescribedBy;

  if (error) {
    ariaDescribedBy = `${generatedId}-error`;
  } else if (hint) {
    ariaDescribedBy = `${generatedId}-hint`;
  }

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
    e.preventDefault();

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
        ? value.filter((value, _, arr) => {
            return arr.indexOf(value) < 0;
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
    }

    return cloneOption(node);
  });

  return (
    <Field hint={hint} error={error} id={generatedId} required={required}>
      <Flex direction="column" alignItems="stretch" gap={label || hint || hasStringError ? 1 : 0}>
        {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}

        <SelectButtonWrapper size={size} hasError={Boolean(error)} disabled={disabled} ref={containerRef}>
          <SelectButton
            ref={buttonRef}
            labelledBy={`${generatedId} ${labelId} ${contentId}`}
            aria-describedby={ariaDescribedBy}
            expanded={Boolean(expanded)}
            onTrigger={setExpanded}
            id={generatedId}
            hasError={Boolean(error)}
            disabled={disabled}
            onMouseDown={handleMouseDown}
            {...props}
          />

          <MainRow justifyContent="space-between">
            <Flex>
              {startIcon && (
                <Box paddingLeft={3} aria-hidden>
                  {startIcon}
                </Box>
              )}

              {withTags && <SelectTags tags={tags} onRemoveTag={handleSelectItem} disabled={disabled} />}

              <Box paddingLeft={4} paddingRight={4}>
                {withTags ? (
                  <>
                    {!value || value.length === 0 ? (
                      <Typography ellipsis id={contentId} textColor="neutral600">
                        {placeholder}
                      </Typography>
                    ) : null}
                    <VisuallyHidden as="span" id={contentId}>
                      {customizeContent ? customizeContent(value) : selectOptionLabel || placeholder}
                      {value.join(', ')}
                    </VisuallyHidden>
                  </>
                ) : (
                  <Typography ellipsis id={contentId} textColor={value ? 'neutral800' : 'neutral600'}>
                    {customizeContent ? customizeContent(value) : selectOptionLabel || placeholder}
                    {multi && <VisuallyHidden as="span">{value.join(', ')}</VisuallyHidden>}
                  </Typography>
                )}
              </Box>
            </Flex>

            <Flex>
              {((multi && value && value.length) || (!multi && value)) && onClear && (
                <IconBox
                  as="button"
                  type="button"
                  onClick={handleClear}
                  aria-label={clearLabel}
                  aria-disabled={disabled}
                  title={clearLabel}
                >
                  <Cross />
                </IconBox>
              )}

              <CaretBox
                paddingLeft={3}
                aria-hidden
                as="button"
                type="button"
                onMouseDown={handleMouseDown}
                tabIndex={-1}
                disabled={disabled}
                title={selectButtonTitle}
              >
                <CarretDown />
              </CaretBox>
            </Flex>
          </MainRow>
        </SelectButtonWrapper>

        <FieldHint />
        <FieldError />
      </Flex>

      {expanded && (
        <Popover
          source={containerRef}
          spacing={4}
          fullWidth
          intersectionId={`select-list-intersection-${generatedId}`}
          onReachEnd={onReachEnd}
        >
          <SelectList
            selectId={generatedId}
            labelledBy={label ? labelId : undefined}
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

export const Select = ({ withTags, multi, ...restProps }) =>
  withTags || multi ? (
    <SelectWithTags multi={multi} withTags={withTags} {...restProps} />
  ) : (
    <SingleSelect {...restProps} />
  );

Select.defaultProps = {
  'aria-label': undefined,
  children: [],
  clearLabel: 'Clear',
  customizeContent: undefined,
  disabled: false,
  id: undefined,
  label: undefined,
  labelAction: undefined,
  multi: false,
  onChange() {},
  onClear: undefined,
  onReachEnd: undefined,
  value: undefined,
  hint: undefined,
  error: undefined,
  placeholder: 'Select...',
  required: false,
  selectButtonTitle: 'Carret Down Button',
  size: 'M',
  startIcon: undefined,
  withTags: false,
};

Select.propTypes = {
  'aria-label': PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  clearLabel: PropTypes.string,
  customizeContent: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  labelAction: PropTypes.element,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onReachEnd: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  selectButtonTitle: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
  startIcon: PropTypes.element,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    PropTypes.string,
    PropTypes.number,
  ]),
  withTags: PropTypes.bool,
};

SelectWithTags.defaultProps = Select.defaultProps;

SelectWithTags.propTypes = Select.propTypes;
