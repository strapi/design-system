import { DefaultTheme, css } from 'styled-components';

import { handleResponsiveValues, type ResponsiveThemeProperty } from '../helpers/handleResponsiveValues';

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
  $fontSize?: ResponsiveThemeProperty<'fontSizes', 'fontSize'>;
  $lineHeight?: ResponsiveThemeProperty<'lineHeights', 'lineHeight'>;
}

const variant = ({ $variant = OMEGA, theme, $fontSize, $lineHeight }: VariantProps) => {
  const fontSizeStyles = $fontSize && handleResponsiveValues({ fontSize: $fontSize }, theme);
  const lineHeightStyles = $lineHeight && handleResponsiveValues({ lineHeight: $lineHeight }, theme);
  switch ($variant) {
    case ALPHA: {
      return css`
        font-weight: ${theme.fontWeights.bold};

        /* -------------------------------------------------------------
         * Font Size
         * -------------------------------------------------------------*/
        ${
          fontSizeStyles ||
          css`
          /* Mobile: 2.8rem */
          font-size: ${theme.fontSizes[6]};

          ${theme.breakpoints.medium} {
            /* Tablet + Desktop: 3.2rem */
            font-size: ${theme.fontSizes[7]};
          }
        `
        }

        /* -------------------------------------------------------------
         * Line Height
         * -------------------------------------------------------------*/
        ${
          lineHeightStyles ||
          css`
          /* Mobile: 3.2rem */
          line-height: ${theme.lineHeights[0]};

          ${theme.breakpoints.medium} {
            /* Tablet + Desktop: 4rem */
            line-height: ${theme.lineHeights[2]};
          }
        `
        }
      `;
    }
    case BETA: {
      return css`
        font-weight: ${theme.fontWeights.bold};

        /* -------------------------------------------------------------
         * Font Size
         * -------------------------------------------------------------*/
        ${
          fontSizeStyles ||
          css`
          /* Mobile: 2rem */
          font-size: ${theme.fontSizes[5]};

          ${theme.breakpoints.medium} {
            /* Tablet + Desktop: 1.8rem */
            font-size: ${theme.fontSizes[4]};
          }
        `
        }

        /* -------------------------------------------------------------
         * Line Height
         * -------------------------------------------------------------*/
        ${
          lineHeightStyles ||
          css`
          /* Mobile: 2.4rem */
          line-height: ${theme.lineHeights[1]};
        `
        }
      `;
    }
    case DELTA: {
      return css`
        font-weight: ${theme.fontWeights.semiBold};

        /* -------------------------------------------------------------
         * Font Size
         * -------------------------------------------------------------*/
        ${
          fontSizeStyles ||
          css`
          /* Mobile: 1.8rem */
          font-size: ${theme.fontSizes[4]};

          ${theme.breakpoints.medium} {
            /* Tablet + Desktop: 1.6rem */
            font-size: ${theme.fontSizes[3]};
          }
        `
        }

        /* -------------------------------------------------------------
         * Line Height
         * -------------------------------------------------------------*/
        ${
          lineHeightStyles ||
          css`
          /* Mobile: 2.4rem */
          line-height: ${theme.lineHeights[3]};

          ${theme.breakpoints.medium} {
            /* Tablet + Desktop: 2rem */
            line-height: ${theme.lineHeights[2]};
          }
        `
        }
      `;
    }
    case EPSILON: {
      return css`
        /* -------------------------------------------------------------
         * Font Size
         * -------------------------------------------------------------*/
        ${
          fontSizeStyles ||
          css`
          /* Mobile: 1.8rem */
          font-size: ${theme.fontSizes[4]};

          ${theme.breakpoints.medium} {
            /* Tablet + Desktop: 1.6rem */
            font-size: ${theme.fontSizes[3]};
          }
        `
        }

        /* -------------------------------------------------------------
         * Line Height
         * -------------------------------------------------------------*/
        ${
          lineHeightStyles ||
          css`
          /* Mobile: 2.4rem */
          line-height: ${theme.lineHeights[3]};

          ${theme.breakpoints.medium} {
            /* Tablet + Desktop: 2.4rem */
            line-height: ${theme.lineHeights[6]};
          }
        `
        }
      `;
    }
    case OMEGA: {
      return css`
        /* -------------------------------------------------------------
         * Font Size
         * -------------------------------------------------------------*/
        ${
          fontSizeStyles ||
          css`
          /* Mobile: 1.6rem */
          font-size: ${theme.fontSizes[3]};

          ${theme.breakpoints.medium} {
            /* Tablet + Desktop: 1.4rem */
            font-size: ${theme.fontSizes[2]};
          }
        `
        }

        /* -------------------------------------------------------------
         * Line Height
         * -------------------------------------------------------------*/
        ${
          lineHeightStyles ||
          css`
          /* Mobile: 2.4rem */
          line-height: ${theme.lineHeights[6]};

          ${theme.breakpoints.medium} {
            /* Tablet + Desktop: 2.0rem */
            line-height: ${theme.lineHeights[4]};
          }
        `
        }
      `;
    }
    case PI: {
      return css`
        /* -------------------------------------------------------------
         * Font Size
         * -------------------------------------------------------------*/
        ${
          fontSizeStyles ||
          css`
          /* All: 1.2rem */
          font-size: ${theme.fontSizes[1]};
        `
        }

        /* -------------------------------------------------------------
         * Line Height
         * -------------------------------------------------------------*/
        ${
          lineHeightStyles ||
          css`
          /* All: 1.6rem */
          line-height: ${theme.lineHeights[3]};
        `
        }
      `;
    }
    case SIGMA: {
      return css`
        font-weight: ${theme.fontWeights.bold};
        text-transform: uppercase;

        /* -------------------------------------------------------------
         * Font Size
         * -------------------------------------------------------------*/
        ${
          fontSizeStyles ||
          css`
          /* All: 1.1rem */
          font-size: ${theme.fontSizes[0]};
        `
        }

        /* -------------------------------------------------------------
         * Line Height
         * -------------------------------------------------------------*/
        ${
          lineHeightStyles ||
          css`
          /* All: 1.6rem */
          line-height: ${theme.lineHeights[5]};
        `
        }
      `;
    }
    default: {
      return css`
        /* -------------------------------------------------------------
         * Font Size
         * -------------------------------------------------------------*/
        ${
          fontSizeStyles ||
          css`
          /* Mobile: 1.6rem */
          font-size: ${theme.fontSizes[3]};

          ${theme.breakpoints.medium} {
            /* Tablet + Desktop: 1.4rem */
            font-size: ${theme.fontSizes[2]};
          }
        `
        }
      `;
    }
  }
};

export { TEXT_VARIANTS, ellipsis, variant };
export type { VariantProps };
