import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps = {
  size: true,
};

export const Stack = styled.div.withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  & > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > * + * {
    margin-top: ${({ theme, size }) => theme.spaces[size]};
  }
`;

Stack.propTypes = {
  size: PropTypes.number.isRequired,
};
