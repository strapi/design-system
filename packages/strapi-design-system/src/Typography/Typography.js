import styled from 'styled-components';
import PropTypes from 'prop-types';

import { TEXT_VARIANTS, OMEGA } from './constants';
import { ellipsisStyle, variantStyle, handleColor } from './utils';

const transientProps = {
  fontSize: true,
  fontWeight: true,
};

export const Typography = styled.span.withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  ${variantStyle}
  ${ellipsisStyle}

  // These properties need to come after {variantStyle}, because they might
  // overwrite a variant attribute
  font-weight: ${({ theme, fontWeight }) => theme.fontWeights[fontWeight]};
  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize]};
  line-height: ${({ theme, lineHeight }) => theme.lineHeights[lineHeight]};
  color: ${handleColor};
  text-align: ${({ textAlign }) => textAlign};
  text-transform: ${({ textTransform }) => textTransform};
`;

Typography.defaultProps = {
  ellipsis: false,
  fontWeight: undefined,
  fontSize: undefined,
  lineHeight: undefined,
  textColor: undefined,
  textAlign: undefined,
  textTransform: undefined,
  variant: OMEGA,
};
Typography.propTypes = {
  ellipsis: PropTypes.bool,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontWeight: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  textAlign: PropTypes.string,
  textColor: PropTypes.string,
  textTransform: PropTypes.string,
  variant: PropTypes.oneOf(TEXT_VARIANTS),
};
