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
import { genId } from '../helpers/genId';
import { SelectList } from './SelectList';
import { SelectButtonWrapper, IconBox, CaretBox } from './components';
import { useButtonRef } from './hooks/useButtonRef';
import { VisuallyHidden } from '../VisuallyHidden';
import { DownState } from './constants';
import { escapeSelector } from '../helpers/escapeSelector';
import { SelectTags } from './SelectTags';
import styled from 'styled-components';

const MainRow = styled(Row)`
  min-height: ${40 / 16}rem;
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
  startIcon,
  withTags,
  ...props
}) => {
  const idRef = useRef(id || genId());
  const [expanded, setExpanded] = useState(undefined);
  const buttonRef = useButtonRef(expanded);
  const containerRef = useRef(null);

  const labelId = `label-${idRef.current}`;
  const contentId = `content-${idRef.current}`;
  const ariaDescribedBy = error ? `field-error-${idRef.current}` : hint ? `field-hint-${idRef.current}` : undefined;

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

  const handleSelectItem = (value) => {
    onChange(value);

    if (!multi) {
      setExpanded(undefined);
    }
  };

  let selectOptionLabel;
  let tags = [];

  const childrenClone = Children.toArray(children).map((node) => {
    const optionId = `option-${idRef.current}-${node.props.value}`;

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
    });
  });

  return (
    <Field hint={hint} error={error} id={idRef.current}>
      <Stack size={1}>
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
            id={idRef.current}
            hasError={Boolean(error)}
            disabled={disabled}
            onMouseDown={handleMouseDown}
            {...props}
          />

          <MainRow justifyContent="space-between">
            <Row>
              {startIcon && (
                <Box paddingLeft={3} aria-hidden={true}>
                  {startIcon}
                </Box>
              )}

              {withTags && <SelectTags tags={tags} onRemoveTag={onChange} disabled={disabled} />}

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
          intersectionId={`select-list-intersection-${idRef.current}`}
          onReachEnd={onReachEnd}
        >
          <SelectList
            selectId={idRef.current}
            labelledBy={labelId}
            onEscape={handleEscape}
            expanded={expanded}
            onSelectItem={onChange}
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
  customizeContent: undefined,
  disabled: false,
  id: undefined,
  multi: false,
  onClear: undefined,
  onReachEnd: undefined,
  value: undefined,
  hint: undefined,
  error: undefined,
  startIcon: undefined,
  withTags: false,
};

Select.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  clearLabel: PropTypes.string.isRequired,
  customizeContent: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onReachEnd: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  startIcon: PropTypes.element,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    PropTypes.string,
    PropTypes.number,
  ]),
  withTags: PropTypes.bool,
};
