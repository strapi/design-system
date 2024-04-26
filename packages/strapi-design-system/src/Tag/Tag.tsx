import * as React from 'react';

import styled from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../Flex';
import { Typography, TypographyComponent } from '../Typography';

export interface TagProps extends FlexProps<'button'> {
  icon: React.ReactNode;
}

export const Tag = ({ children, icon, disabled = false, onClick, ...props }: TagProps) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled || !onClick) return;
    onClick(e);
  };

  return (
    <TagWrapper
      tag="button"
      background={disabled ? 'neutral200' : 'primary100'}
      color={disabled ? 'neutral700' : 'primary600'}
      paddingLeft={3}
      paddingRight={3}
      onClick={handleClick}
      aria-disabled={disabled}
      disabled={disabled}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={disabled ? 'neutral300' : 'primary200'}
      hasRadius
      height="3.2rem"
      gap={2}
      {...props}
    >
      <TagText $disabled={disabled} variant="pi" fontWeight="bold">
        {children}
      </TagText>
      {icon}
    </TagWrapper>
  );
};

const TagWrapper = styled<FlexComponent<'button'>>(Flex)`
  & > svg {
    height: 0.8rem;
    width: 0.8rem;
  }

  & > svg path {
    fill: ${({ theme, ...p }) => (p['aria-disabled'] ? theme.colors.neutral600 : theme.colors.primary600)};
  }
`;

const TagText = styled<TypographyComponent>(Typography)<{ $disabled: boolean }>`
  color: inherit;
  border-right: 1px solid ${({ theme, $disabled }) => ($disabled ? theme.colors.neutral300 : theme.colors.primary200)};
  padding-right: ${({ theme }) => theme.spaces[2]};
`;
