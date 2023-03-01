import styled, { css } from 'styled-components';

import { SingleSelectOption, SingleSelectOptionProps } from './SingleSelect';
import checkmarkIcon from '../BaseCheckbox/assets/checkmark.svg';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

interface OptionProps extends SingleSelectOptionProps {
  indeterminate?: boolean;
  multi?: boolean;
  isChild?: boolean;
  selected?: boolean;
}

export const Option = ({
  indeterminate,
  multi,
  children,
  value,
  selected,
  isChild,
  startIcon,
  ...restProps
}: OptionProps) => {
  return multi ? (
    <OptionBox
      as="li"
      hasRadius
      paddingLeft={isChild ? 7 : 4}
      paddingRight={4}
      paddingTop={2}
      paddingBottom={2}
      role="option"
      aria-selected={selected}
      background="neutral0"
      data-strapi-value={value}
      {...restProps}
    >
      <Flex>
        {startIcon && (
          <Box paddingRight={2} aria-hidden>
            {startIcon}
          </Box>
        )}
        <Box paddingRight={2} aria-hidden>
          <CheckMark
            hasRadius
            overflow="hidden"
            position="relative"
            indeterminate={indeterminate}
            selected={selected}
            zIndex={1}
          />
        </Box>
        <Typography textColor={selected ? 'primary600' : 'neutral800'} fontWeight={selected ? 'bold' : undefined}>
          {children}
        </Typography>
      </Flex>
    </OptionBox>
  ) : (
    <SingleSelectOption {...{ children, value, selected, isChild, startIcon }} />
  );
};

interface CheckMarkProps {
  selected?: boolean;
  indeterminate?: boolean;
}

const CheckMark = styled(Box)<CheckMarkProps>`
  border: 1px solid
    ${({ theme, selected, indeterminate }) =>
      selected || indeterminate ? theme.colors.primary600 : theme.colors.neutral300};
  height: 18px;
  width: 18px;
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

const OptionBox = styled(Box)`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  &.is-focused {
    background: ${({ theme }) => theme.colors.primary100};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary100};
  }
`;
