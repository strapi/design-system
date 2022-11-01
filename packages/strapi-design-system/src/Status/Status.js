import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import styled from 'styled-components';

const Bullet = styled.div`
  margin-right: ${({ theme }) => theme.spaces[3]};
  width: ${6 / 16}rem;
  height: ${6 / 16}rem;
  border-radius: 50%;
  background: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
`;

const StatusWrapper = styled(Box)`
  ${Typography} {
    color: ${({ theme, textColor }) => theme.colors[textColor]};
  }
`;

export const Status = ({ variant, showBullet, children, ...props }) => {
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
      {showBullet ? (
        <Flex>
          <Bullet backgroundColor={bulletColor} />
          {children}
        </Flex>
      ) : (
        children
      )}
    </StatusWrapper>
  );
};

Status.defaultProps = {
  showBullet: true,
  variant: 'primary',
};

Status.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * If `false`, the preceeding bullet of the status won't be displayed.
   * This prop and the bullet will be removed in the next major version.
   */
  showBullet: PropTypes.bool, // TODO V2: remove prop and bullet

  /**
   * Color variation
   */
  variant: PropTypes.oneOf(['alternative', 'danger', 'neutral', 'primary', 'secondary', 'success', 'warning']),
};
