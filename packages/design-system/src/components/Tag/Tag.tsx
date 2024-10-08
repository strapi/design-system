import * as React from 'react';

import { styled } from 'styled-components';

import { Box, type BoxComponent } from '../../primitives/Box';
import { Flex, FlexProps } from '../../primitives/Flex';
import { Typography, TypographyComponent } from '../../primitives/Typography';

const ButtonBox = styled<BoxComponent<'button'>>(Box)<{ $iconAction: boolean }>`
  display: inline-flex;
  border: none;

  & > svg {
    height: 1.2rem;
    width: 1.2rem;
  }

  & > svg path {
    fill: ${({ theme, ...p }) => (p['aria-disabled'] ? theme.colors.neutral600 : theme.colors.primary600)};
  }

  &:hover {
    cursor: ${({ $iconAction }) => ($iconAction ? 'pointer' : 'initial')};
  }
`;

export interface TagProps extends Omit<FlexProps, 'onClick'> {
  icon: React.ReactNode;
  label?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Tag = ({ children, icon, label, disabled = false, onClick, ...props }: TagProps) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled || !onClick) return;
    onClick(e);
  };

  return (
    <Flex
      inline
      background={disabled ? 'neutral200' : 'primary100'}
      color={disabled ? 'neutral700' : 'primary600'}
      paddingLeft={3}
      paddingRight={1}
      borderColor={disabled ? 'neutral300' : 'primary200'}
      hasRadius
      height="3.2rem"
      {...props}
    >
      <TagText $disabled={disabled} variant="pi" fontWeight="bold">
        {children}
      </TagText>
      <ButtonBox
        tag="button"
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={label}
        padding={2}
        onClick={handleClick}
        $iconAction={!!onClick}
      >
        {icon}
      </ButtonBox>
    </Flex>
  );
};

const TagText = styled<TypographyComponent>(Typography)<{ $disabled: boolean }>`
  color: inherit;
  border-right: 1px solid ${({ theme, $disabled }) => ($disabled ? theme.colors.neutral300 : theme.colors.primary200)};
  padding-right: ${({ theme }) => theme.spaces[2]};
`;
