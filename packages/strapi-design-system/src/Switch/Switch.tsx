import React from 'react';

import styled from 'styled-components';

import { Box } from '../Box';
import { Flex } from '../Flex';

interface SwitchButtonProps {
  visibleLabels?: boolean;
}

const SwitchContent = styled.div<SwitchButtonProps>`
  background: ${({ theme }) => theme.colors.danger500};
  border: none;
  border-radius: 16px;
  position: relative;
  height: ${24 / 16}rem;
  width: ${40 / 16}rem;

  & span {
    font-size: ${({ visibleLabels }) => (visibleLabels ? '1rem' : 0)};
  }

  &:before {
    content: '';
    background: ${({ theme }) => theme.colors.neutral0};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: absolute;
    transition: all 0.5s;
    left: ${({ theme }) => theme.spaces[1]};
    top: ${({ theme }) => theme.spaces[1]};
  }

  @media (prefers-reduced-motion: reduce) {
    &:before {
      transition: none;
    }
  }
`;

const SwitchButton = styled.button<SwitchButtonProps>`
  background: transparent;
  padding: 0;
  border: none;

  &[aria-checked='true'] ${SwitchContent} {
    background: ${({ theme }) => theme.colors.success500};
  }

  &[aria-checked='true'] ${SwitchContent}:before {
    transform: translateX(1rem);
  }
`;

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    SwitchButtonProps {
  label: string;
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  onLabel?: string;
  offLabel?: string;
  selected?: boolean;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ label, onChange, onLabel = 'On', offLabel = 'Off', selected, visibleLabels = false, ...props }, ref) => {
    return (
      <SwitchButton
        ref={ref}
        role="switch"
        aria-checked={selected}
        aria-label={label}
        onClick={onChange}
        visibleLabels={visibleLabels}
        type="button"
        {...props}
      >
        <Flex>
          <SwitchContent>
            <span>{onLabel}</span>
            <span>{offLabel}</span>
          </SwitchContent>

          {visibleLabels && (
            <Box as="span" aria-hidden paddingLeft={2} color={selected ? 'success600' : 'danger600'}>
              {selected ? onLabel : offLabel}
            </Box>
          )}
        </Flex>
      </SwitchButton>
    );
  },
);
