import { MouseEventHandler } from 'react';

import styled from 'styled-components';

import { Flex, FlexProps } from '../Flex';
import { Typography } from '../Typography';

export interface TagProps extends FlexProps<HTMLButtonElement> {
  disabled?: boolean;
  icon: React.ReactNode;
}

export const Tag = ({ children, icon, disabled = false, onClick, ...props }: TagProps) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled || !onClick) return;
    onClick(e);
  };

  return (
    <TagWrapper
      as="button"
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
      height={`${32 / 16}rem`}
      gap={2}
      {...props}
    >
      <TagText $disabled={disabled} variant="pi" fontWeight="bold" as="span">
        {children}
      </TagText>
      {icon}
    </TagWrapper>
  );
};

const TagWrapper = styled(Flex)`
  & > svg {
    height: ${8 / 16}rem;
    width: ${8 / 16}rem;
  }

  & > svg path {
    fill: ${({ theme, ...p }) => (p['aria-disabled'] ? theme.colors.neutral600 : theme.colors.primary600)};
  }
`;

const TagText = styled(Typography)<{ $disabled: boolean }>`
  color: inherit;
  border-right: 1px solid ${({ theme, $disabled }) => ($disabled ? theme.colors.neutral300 : theme.colors.primary200)};
  padding-right: ${({ theme }) => theme.spaces[2]};
`;
