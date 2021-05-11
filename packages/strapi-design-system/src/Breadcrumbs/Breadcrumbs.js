import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { After } from '@strapi/icons';
import { Text } from '../Text';
import { Box } from '../Box';
import { useId } from '../helpers/useId';

const CrumbWrapper = styled.li`
  display: inline-flex;
  align-items: center;
  svg {
    height: 10px;
    width: 10px;
  }
  svg path {
    fill: ${({ theme }) => theme.colors.neutral300};
  }
`;

export const Crumb = React.forwardRef(({ children, isLastChild }, ref) => {
  return (
    <CrumbWrapper ref={ref}>
      <Text highlighted color="neutral800">
        {children}
      </Text>
      {!isLastChild && (
        <Box paddingLeft={3} paddingRight={3}>
          <After />
        </Box>
      )}
    </CrumbWrapper>
  );
});
Crumb.displayName = 'Crumb';
Crumb.defaultProps = {
  isLastChild: false,
};
Crumb.propTypes = {
  children: PropTypes.string.isRequired,
  isLastChild: PropTypes.bool,
};

export const Breadcrumbs = React.forwardRef(({ children, ...props }, ref) => {
  const breadCrumbsId = useId('breadcrumbs');
  const validChildren = React.Children.toArray(children).filter((child) => React.isValidElement(child));
  const elements = validChildren.map((child, index) =>
    React.cloneElement(child, {
      isLastChild: validChildren.length === index + 1,
    }),
  );

  return (
    <nav id={breadCrumbsId} ref={ref} {...props}>
      <ol>{elements}</ol>
    </nav>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};
