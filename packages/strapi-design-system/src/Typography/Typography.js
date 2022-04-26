import styled from 'styled-components';
import { ellipsisStyle, variantStyle, handleColor } from './utils';
import { typographyDefaultProps, typographyPropTypes } from './TypographyProps';

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

Typography.defaultProps = typographyDefaultProps;
Typography.propTypes = typographyPropTypes;
