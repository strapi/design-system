import * as React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as RadixSelect from '@radix-ui/react-select';

import { Box } from '../Box';
import { Typography } from '../Typography';
import checkmarkIcon from '../BaseCheckbox/assets/checkmark.svg';

export const Option = ({ selected, indeterminate, children, value, multi, isChild, startIcon }) => {
  return (
    <SelectItem data-strapi-value={value} $isChild={isChild} value={value}>
      {startIcon && (
        <Box as="span" paddingRight={2} aria-hidden>
          {startIcon}
        </Box>
      )}
      {multi && (
        <Box as="span" paddingRight={2} aria-hidden>
          <CheckMark selected={selected} indeterminate={indeterminate} />
        </Box>
      )}
      <Typography textColor={selected ? 'primary600' : 'neutral800'} fontWeight={selected ? 'bold' : null}>
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </Typography>
    </SelectItem>
  );
};

Option.defaultProps = {
  isChild: false,
  multi: false,
  selected: false,
  startIcon: undefined,
  indeterminate: false,
};

Option.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  indeterminate: PropTypes.bool,
  isChild: PropTypes.bool,
  multi: PropTypes.bool,
  selected: PropTypes.bool,
  startIcon: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Option.displayName = 'Option';

const SelectItem = styled(RadixSelect.Item)`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: ${(props) => `${props.theme.spaces[2]} ${props.theme.spaces[4]}`};
  padding-left: ${({ $isChild, theme }) => ($isChild ? theme.spaces[7] : theme.spaces[4])};
  background-color: ${({ theme }) => theme.colors.neutral0};
  display: flex;
  align-items: center;

  &.is-focused {
    background-color: ${({ theme }) => theme.colors.primary100};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary100};
  }
`;

const CheckMark = styled.span`
  border: 1px solid
    ${({ theme, selected, indeterminate }) =>
      selected || indeterminate ? theme.colors.primary600 : theme.colors.neutral300};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: 18px;
  width: 18px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: ${({ theme, selected, indeterminate }) =>
    selected || indeterminate ? theme.colors.primary600 : theme.colors.neutral0};

  ${({ theme, indeterminate }) =>
    indeterminate &&
    css`
      &::after {
        content: '';
        display: block;
        position: relative;
        color: white;
        height: 2px;
        width: 10px;
        background-color: ${theme.colors.neutral0};
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    `}

  ${({ selected }) =>
    selected &&
    css`
      &::after {
        content: '';
        background: url(${checkmarkIcon}) no-repeat no-repeat center center;
        width: 100%;
        height: 100%;
        position: absolute;
      }
    `}
`;
