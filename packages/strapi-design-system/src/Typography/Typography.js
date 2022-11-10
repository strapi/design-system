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

Typography.defaultProps = typographyDefaultProps;
Typography.propTypes = typographyPropTypes;
