import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Divider } from '../Divider';
import { Text } from '../Text';
import { Row } from '../Row';
import styled from 'styled-components';

const IconBox = styled(Box)`
  height: ${24 / 16}rem;
  width: ${24 / 16}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${10 / 16}rem;
    width: ${10 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;

// TODO: remove when the reset css button is merged
const ButtonBox = styled(Box)`
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
  display: block;
  width: 100%;
  border: none;
`;

export const TFooter = ({ children, icon, ...props }) => {
  return (
    <div>
      <Divider />
      <ButtonBox as="button" background="primary100" padding={5} {...props}>
        <Row>
          <IconBox aria-hidden background="primary200">
            {icon}
          </IconBox>
          <Box paddingLeft={3}>
            <Text small={true} bold={true} textColor="primary600">
              {children}
            </Text>
          </Box>
        </Row>
      </ButtonBox>
    </div>
  );
};

TFooter.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
