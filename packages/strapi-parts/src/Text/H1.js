import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ellipsisStyle, handleColor } from './utils';

const StyledH1 = styled.h1`
  font-weight: 600;
  font-size: ${32 / 16}rem;
  line-height: 1.25;
  color: ${handleColor};
  ${ellipsisStyle}
`;

export const H1 = ({ as, ...props }) => {
  let id;

  if (as === 'h1') {
    id = 'main-content-title';
  }

  return <StyledH1 id={id} as={as} {...props} />;
};

H1.defaultProps = {
  as: 'h1',
};

H1.propTypes = {
  as: PropTypes.string,
};
