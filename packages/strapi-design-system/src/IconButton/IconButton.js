import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ContentIcon } from '@strapi/icons';

import { Tooltip } from '../Tooltip';
import { BaseButton } from '../BaseButton';

const IconButtonWrapper = styled(BaseButton)`
  svg {
    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
  &:hover {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
  &:active {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral400};
      }
    }
  }
`;

export const IconButton = React.forwardRef(({ children, title, ...props }, ref) => {
  return (
    <Tooltip content={title}>
      <IconButtonWrapper {...props} ref={ref}>
        {children}
      </IconButtonWrapper>
    </Tooltip>
  );
});

IconButton.displayName = 'IconButton';

IconButton.defaultProps = {
  title: undefined,
};
IconButton.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};
