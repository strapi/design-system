import { DefaultTheme } from 'styled-components';

import { ALPHA, BETA, DELTA, EPSILON, OMEGA, PI, SIGMA, TEXT_VARIANTS } from './constants';

export const ellipsisStyle = ({ ellipsis = false }: { ellipsis?: boolean }) =>
  ellipsis &&
  `
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

export const variantStyle = ({
  variant = OMEGA,
  theme,
}: {
  variant?: (typeof TEXT_VARIANTS)[number];
  theme: DefaultTheme;
}) => {
  switch (variant) {
    case ALPHA: {
      return `
        font-weight: ${theme.fontWeights.bold};
        font-size: ${theme.fontSizes[5]};
        line-height: ${theme.lineHeights[2]};
      `;
    }
    case BETA: {
      return `
        font-weight: ${theme.fontWeights.bold};
        font-size: ${theme.fontSizes[4]};
        line-height: ${theme.lineHeights[1]};
      `;
    }
    case DELTA: {
      return `
        font-weight: ${theme.fontWeights.semiBold};
        font-size: ${theme.fontSizes[3]};
        line-height: ${theme.lineHeights[2]};
      `;
    }
    case EPSILON: {
      return `
        font-size: ${theme.fontSizes[3]};
        line-height: ${theme.lineHeights[6]};
      `;
    }
    case OMEGA: {
      return `
        font-size: ${theme.fontSizes[2]};
        line-height: ${theme.lineHeights[4]};
      `;
    }
    case PI: {
      return `
        font-size: ${theme.fontSizes[1]};
        line-height: ${theme.lineHeights[3]};
      `;
    }
    case SIGMA: {
      return `
        font-weight: ${theme.fontWeights.bold};
        font-size: ${theme.fontSizes[0]};
        line-height: ${theme.lineHeights[5]};
        text-transform: uppercase;
      `;
    }
    default: {
      return `
        font-size: ${theme.fontSizes[2]};
      `;
    }
  }
};
