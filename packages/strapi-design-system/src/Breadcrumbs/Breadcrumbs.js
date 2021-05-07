import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '../Text';
import { Box } from '../Box';
import { VisuallyHidden } from '../VisuallyHidden';
import { useId } from '../helpers/useId';

const BreadCrumbItemWrapper = styled.li`
  display: inline-flex;
`;

export const BreadCrumbItem = React.forwardRef(({ children, isLastChild, separator }, ref) => {
  return (
    <BreadCrumbItemWrapper ref={ref}>
      <Text>{children}</Text>
      {!isLastChild && (
        <Box paddingLeft={1} paddingRight={1}>
          {separator}
        </Box>
      )}
    </BreadCrumbItemWrapper>
  );
});
BreadCrumbItem.displayName = 'BreadCrumbItem';
BreadCrumbItem.defaultProps = {
  isLastChild: false,
  separator: '/',
};
BreadCrumbItem.propTypes = {
  children: PropTypes.string.isRequired,
  isLastChild: PropTypes.bool,
  separator: PropTypes.string,
};

export const Breadcrumbs = React.forwardRef(({ label, description, children, ...props }, ref) => {
  const breadCrumbsId = useId('breadcrumbs');
  const descriptionId = useId('description');
  const validChildren = React.Children.toArray(children).filter((child) => React.isValidElement(child));
  const elements = validChildren.map((child, index) =>
    React.cloneElement(child, {
      separator: '/',
      spacing: 1,
      isLastChild: validChildren.length === index + 1,
    }),
  );

  return (
    <nav id={breadCrumbsId} aria-describedby={descriptionId} aria-label={label} ref={ref} {...props}>
      <VisuallyHidden id={descriptionId}>{description}</VisuallyHidden>
      <ol>{elements}</ol>
    </nav>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.defaultProps = {
  description: undefined,
  label: undefined,
};
Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  description: PropTypes.string,
  label: PropTypes.string,
};
