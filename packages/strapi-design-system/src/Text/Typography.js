import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ellipsisStyle, handleColor } from './utils';

const transientProps = {
  fontSize: true,
  fontWeight: true,
};

export const Typography = styled.span.withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  font-weight: ${({ theme, fontWeight }) => theme.fontWeights[fontWeight]};
  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize]};
  line-height: ${({ theme, lineHeight }) => theme.lineHeights[lineHeight]};
  color: ${handleColor};
  text-transform: ${({ textTransform }) => textTransform};
  ${ellipsisStyle}
`;

Typography.defaultProps = {
  fontWeight: undefined,
  fontSize: undefined,
  lineHeight: undefined,
  textColor: undefined,
  textTransform: undefined,
};

Typography.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontWeight: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  textColor: PropTypes.string,
  textTransform: PropTypes.string,
};
