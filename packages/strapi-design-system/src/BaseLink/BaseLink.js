import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const A = styled.a`
  cursor: pointer;
`;

export const BaseLink = React.forwardRef(({ href, rel, target, disabled, isExternal, ...props }, ref) => {
  return (
    <A
      ref={ref}
      target={isExternal ? '_blank' : target}
      rel={isExternal ? rel : undefined}
      href={disabled ? '#' : href}
      disabled={disabled}
      {...props}
    />
  );
});

BaseLink.displayName = 'BaseLink';

BaseLink.defaultProps = {
  disabled: false,
  href: undefined,
  isExternal: false,
  rel: 'noreferrer noopener',
  target: '_self',
};

BaseLink.propTypes = {
  disabled: PropTypes.bool,
  href: PropTypes.string,
  isExternal: PropTypes.bool,
  rel: PropTypes.string,
  target: PropTypes.string,
};
