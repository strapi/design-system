import * as React from 'react';

import { styled } from 'styled-components';

import { Box, type BoxComponent } from '../Box';
import { Flex, FlexComponent, FlexProps } from '../Flex';
import { Typography, TypographyComponent } from '../Typography';

const ButtonBox = styled<BoxComponent<'button'>>(Box)<{ $iconAction: boolean }>`
  display: inline-flex;
  border: none;

  &:hover {
    cursor: ${({ $iconAction }) => ($iconAction ? 'pointer' : 'initial')};
  }
`;

export interface TagProps extends FlexProps<'button'> {
  icon: React.ReactNode;
  label?: string;
}

export const Tag = ({ children, icon, label, disabled = false, onClick, ...props }: TagProps) => {
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
      paddingRight={1}
      aria-disabled={disabled}
      disabled={disabled}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={disabled ? 'neutral300' : 'primary200'}
      hasRadius
      height="3.2rem"
      {...props}
    >
      <TagText $disabled={disabled} variant="pi" fontWeight="bold">
        {children}
      </TagText>
      <ButtonBox aria-label={label} padding={2} onClick={handleClick} $iconAction={!!onClick}>
        {icon}
      </ButtonBox>
    </TagWrapper>
  );
};

const TagWrapper = styled<FlexComponent<'button'>>(Flex)`
  & > div > svg {
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
