import { DefaultTheme, css } from 'styled-components';

import { ALPHA, BETA, DELTA, EPSILON, OMEGA, PI, SIGMA, TEXT_VARIANTS } from './constants';

export const ellipsisStyle = ({ $ellipsis = false }: { $ellipsis?: boolean }) =>
  $ellipsis &&
  css`
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

export const variantStyle = ({
  $variant = OMEGA,
  theme,
}: {
  $variant?: (typeof TEXT_VARIANTS)[number];
  theme: DefaultTheme;
}) => {
  switch ($variant) {
    case ALPHA: {
      return css`
        font-weight: ${theme.fontWeights.bold};
        font-size: ${theme.fontSizes[5]};
        line-height: ${theme.lineHeights[2]};
      `;
    }
    case BETA: {
      return css`
        font-weight: ${theme.fontWeights.bold};
        font-size: ${theme.fontSizes[4]};
        line-height: ${theme.lineHeights[1]};
      `;
    }
    case DELTA: {
      return css`
        font-weight: ${theme.fontWeights.semiBold};
        font-size: ${theme.fontSizes[3]};
        line-height: ${theme.lineHeights[2]};
      `;
    }
    case EPSILON: {
      return css`
        font-size: ${theme.fontSizes[3]};
        line-height: ${theme.lineHeights[6]};
      `;
    }
    case OMEGA: {
      return css`
        font-size: ${theme.fontSizes[2]};
        line-height: ${theme.lineHeights[4]};
      `;
    }
    case PI: {
      return css`
        font-size: ${theme.fontSizes[1]};
        line-height: ${theme.lineHeights[3]};
      `;
    }
    case SIGMA: {
      return css`
        font-weight: ${theme.fontWeights.bold};
        font-size: ${theme.fontSizes[0]};
        line-height: ${theme.lineHeights[5]};
        text-transform: uppercase;
      `;
    }
    default: {
      return css`
        font-size: ${theme.fontSizes[2]};
      `;
    }
  }
};
