import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { BaseLink } from '../BaseLink';

// TODO: make sure to use the link from the router library chosen
export const Link = ({ href, to, disabled, ...props }) => {
  const target = href ? '_blank' : undefined;
  const rel = href ? 'noreferrer noopener' : undefined;

  return (
    <BaseLink
      as={to && !disabled ? NavLink : 'a'}
      target={target}
      rel={rel}
      to={disabled ? undefined : to}
      href={disabled ? '#' : href}
      disabled={disabled}
      {...props}
    />
  );
};

Link.displayName = 'Link';

Link.defaultProps = {
  href: undefined,
  to: undefined,
  disabled: false,
};

Link.propTypes = {
  disabled: PropTypes.bool,
  href: (props) => {
    if (!props.disabled && !props.to && !props.href) {
      return new Error('href must be defined');
    }
  },
  to: (props) => {
    if (!props.disabled && !props.href && !props.to) {
      return new Error('to must be defined');
    }
  },
};
