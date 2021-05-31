import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Avatar = styled.img`
  border-radius: 50%;
  display: block;
  height: ${26 / 16}rem;
  width: ${26 / 16}rem;
`;

Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
};
