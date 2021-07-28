import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
  ${({ noBorder }) => (noBorder ? `border: none;` : undefined)}
`;

export const IconButton = React.forwardRef(({ label, noBorder, icon, ...props }, ref) => {
  return (
    <Tooltip label={label}>
      <IconButtonWrapper {...props} ref={ref} noBorder={noBorder}>
        {icon}
      </IconButtonWrapper>
    </Tooltip>
  );
});

IconButton.displayName = 'IconButton';

IconButton.defaultProps = {
  title: undefined,
  noBorder: false,
  label: undefined,
};
IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string,
  noBorder: PropTypes.bool,
};
