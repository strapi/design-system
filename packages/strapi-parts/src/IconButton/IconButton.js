import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tooltip } from '../Tooltip';
import { BaseButton } from '../BaseButton';
import { Row } from '../Row';

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

export const IconButtonGroup = styled(Row)`
  & span:first-child button {
    border-left: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-radius: ${({ theme }) => `${theme.borderRadius} 0 0 ${theme.borderRadius}`};
  }

  & span:last-child button {
    border-radius: ${({ theme }) => `0 ${theme.borderRadius} ${theme.borderRadius} 0`};
  }

  & ${IconButtonWrapper} {
    border-radius: 0;
    border-left: none;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.neutral800};
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral150};

      svg {
        path {
          fill: ${({ theme }) => theme.colors.neutral900};
        }
      }
    }

    &:active {
      svg {
        path {
          fill: ${({ theme }) => theme.colors.neutral700};
        }
      }
    }
  }
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
