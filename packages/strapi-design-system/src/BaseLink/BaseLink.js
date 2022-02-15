import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const A = styled.a`
  cursor: pointer;
`;

export const BaseLink = ({ href, rel, target, disabled, ...props }) => {
  return (
    <A
      target={href ? target : undefined}
      rel={href ? rel : undefined}
      href={disabled ? '#' : href}
      disabled={disabled}
      {...props}
    />
  );
};

BaseLink.displayName = 'BaseLink';

BaseLink.defaultProps = {
  disabled: false,
  href: undefined,
  rel: 'noreferrer noopener',
  target: '_blank',
};

BaseLink.propTypes = {
  disabled: PropTypes.bool,
  href: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
};
