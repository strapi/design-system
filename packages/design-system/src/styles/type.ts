import { DefaultTheme, css } from 'styled-components';

/* -------------------------------------------------------------------------------------------------
 * Text Variants
 * -----------------------------------------------------------------------------------------------*/

const ALPHA = 'alpha';
const BETA = 'beta';
const DELTA = 'delta';
const EPSILON = 'epsilon';
const OMEGA = 'omega';
const PI = 'pi';
const SIGMA = 'sigma';

const TEXT_VARIANTS = [ALPHA, BETA, DELTA, EPSILON, OMEGA, PI, SIGMA] as const;

/* -------------------------------------------------------------------------------------------------
 * Ellipsis Style
 * -----------------------------------------------------------------------------------------------*/

const ellipsis = css`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* -------------------------------------------------------------------------------------------------
 * Variant Style
 * -----------------------------------------------------------------------------------------------*/

interface VariantProps {
  $variant?: (typeof TEXT_VARIANTS)[number];
  theme: DefaultTheme;
}

const variant = ({ $variant = OMEGA, theme }: VariantProps) => {
  switch ($variant) {
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

export { TEXT_VARIANTS, ellipsis, variant };
export type { VariantProps };
