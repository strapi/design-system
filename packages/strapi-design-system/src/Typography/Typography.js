import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ellipsisStyle, variantStyle, handleColor } from './utils';
import { TEXT_VARIANTS, OMEGA } from './constants';

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
  ${variantStyle}
`;

Typography.defaultProps = {
  ellipsis: false,
  fontWeight: undefined,
  fontSize: undefined,
  lineHeight: undefined,
  textColor: undefined,
  textTransform: undefined,
  variant: OMEGA,
};

Typography.propTypes = {
  ellipsis: PropTypes.bool,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontWeight: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  textColor: PropTypes.string,
  textTransform: PropTypes.string,
  variant: PropTypes.oneOf(TEXT_VARIANTS),
};
