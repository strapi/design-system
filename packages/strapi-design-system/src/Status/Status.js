import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Row } from '../Row';
import { Text } from '../Text';
import styled from 'styled-components';

const Bullet = styled.div`
  margin-right: ${({ theme }) => theme.spaces[3]};
  width: ${6 / 16}rem;
  height: ${6 / 16}rem;
  border-radius: 50%;
  background: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
`;

const StatusWrapper = styled(Box)`
  ${Text} {
    color: ${({ theme, textColor }) => theme.colors[textColor]};
  }
`;

export const Status = ({ variant, children, ...props }) => {
  const backgroundColor = `${variant}100`;
  const borderColor = `${variant}200`;
  const bulletColor = `${variant}600`;
  const textColor = `${variant}600`;

  return (
    <StatusWrapper
      borderColor={borderColor}
      textColor={textColor}
      background={backgroundColor}
      hasRadius
      paddingTop={4}
      paddingBottom={4}
      paddingLeft={5}
      paddingRight={5}
      {...props}
    >
      <Row>
        <Bullet backgroundColor={bulletColor} />
        {children}
      </Row>
    </StatusWrapper>
  );
};

Status.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['alternative', 'danger', 'neutral', 'primary', 'secondary', 'success', 'warning']),
};
