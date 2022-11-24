import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

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

export const Status = ({ variant, showBullet, size, children, ...props }) => {
  const backgroundColor = `${variant}100`;
  const borderColor = `${variant}200`;
  const bulletColor = `${variant}600`;
  const textColor = `${variant}600`;

  const paddingX = size === 'S' ? 2 : 5;
  const paddingY = size === 'S' ? 1 : 4;

  return (
    <StatusWrapper
      borderColor={borderColor}
      textColor={textColor}
      background={backgroundColor}
      hasRadius
      paddingTop={paddingY}
      paddingBottom={paddingY}
      paddingLeft={paddingX}
      paddingRight={paddingX}
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
  size: 'M',
  variant: 'primary',
};

Status.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * If `false`, the preceeding bullet of the status won't be displayed.
   * This prop and the bullet will be removed in the next major version.
   */
  showBullet: PropTypes.bool, // TODO V2: remove prop and bullet

  size: PropTypes.oneOf(['S', 'M']),

  /**
   * Color variation
   */
  variant: PropTypes.oneOf(['alternative', 'danger', 'neutral', 'primary', 'secondary', 'success', 'warning']),
};
