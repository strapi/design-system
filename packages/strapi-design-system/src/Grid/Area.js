import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps = {
  name: true,
};

export const Area = styled(Box).withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  grid-area: ${(p) => p.name};
`;

Area.displayName = 'Area';

Area.propTypes = {
  name: PropTypes.string.isRequired,
};
