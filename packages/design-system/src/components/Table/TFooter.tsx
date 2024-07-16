import * as React from 'react';

import { styled } from 'styled-components';

import { Box, BoxComponent, BoxProps } from '../../primitives/Box';
import { Flex } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';
import { Divider } from '../Divider';

const IconBox = styled<BoxComponent>(Box)`
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 1rem;
    width: 1rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;

// TODO: remove when the reset css button is merged
const ButtonBox = styled<BoxComponent<'button'>>(Box)`
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
  display: block;
  width: 100%;
  border: none;
`;

export interface TFooterProps extends BoxProps<'button'> {
  children: React.ReactNode;
  icon: React.ReactNode;
}

export const TFooter = ({ children, icon, ...props }: TFooterProps) => {
  return (
    <div>
      <Divider />
      <ButtonBox tag="button" background="primary100" padding={5} {...props}>
        <Flex>
          <IconBox aria-hidden background="primary200">
            {icon}
          </IconBox>
          <Box paddingLeft={3}>
            <Typography variant="pi" fontWeight="bold" textColor="primary600">
              {children}
            </Typography>
          </Box>
        </Flex>
      </ButtonBox>
    </div>
  );
};
