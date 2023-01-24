import { DefaultTheme } from 'styled-components';
import { Typography } from '../Typography';
import {
  LIGHT_VARIANTS,
  VARIANTS,
  SECONDARY,
  TERTIARY,
  DEFAULT,
  GHOST,
  DANGER,
  SUCCESS,
  DANGER_LIGHT,
  SUCCESS_LIGHT,
  Variant,
} from './constants';

export const getVariantColorName = (variant: Variant): 'success' | 'danger' | 'neutral' | 'primary' => {
  if (variant === SUCCESS_LIGHT || variant === DANGER_LIGHT) {
    return `${variant.substring(0, variant.lastIndexOf('-'))}600` as 'success' | 'danger';
  } else if (variant === TERTIARY) {
    return 'neutral';
  } else if (variant === DEFAULT || variant === SECONDARY || VARIANTS.every((vari) => vari !== variant)) {
    return 'primary';
  }

  // @ts-expect-error ghost is a variant, but ghostXXX is not any color...
  return `${variant}`;
};

export const getDisabledStyle = ({ theme }: { theme: DefaultTheme }) => {
  return `
    border: 1px solid ${theme.colors.neutral200};
    background: ${theme.colors.neutral150};
    ${Typography} {
      color: ${theme.colors.neutral600};
    }
    svg {
      > g, path {
        fill: ${theme.colors.neutral600};
      }
    }
  `;
};

export const getHoverStyle = ({ theme, variant }: { theme: DefaultTheme; variant: Variant }) => {
  if ([...LIGHT_VARIANTS, SECONDARY].includes(variant)) {
    return `
      background-color: ${theme.colors.neutral0};
    `;
  }
  if (variant === TERTIARY) {
    return `
      background-color: ${theme.colors.neutral100};
    `;
  }

  if (variant === GHOST) {
    return `
      background-color: ${theme.colors.neutral100};
    `;
  }

  if (variant === DEFAULT) {
    return `
      border: 1px solid ${theme.colors.buttonPrimary500};
      background: ${theme.colors.buttonPrimary500};
    `;
  }

  return `
    border: 1px solid ${theme.colors[`${getVariantColorName(variant)}500`]};
    background: ${theme.colors[`${getVariantColorName(variant)}500`]};
  `;
};

export const getActiveStyle = ({ theme, variant }: { theme: DefaultTheme; variant: Variant }) => {
  if ([...LIGHT_VARIANTS, SECONDARY].includes(variant)) {
    return `
      background-color: ${theme.colors.neutral0};
      border: 1px solid ${theme.colors[`${getVariantColorName(variant)}600`]};
      ${Typography} {
        color: ${theme.colors[`${getVariantColorName(variant)}600`]};
      }
      svg {
        > g, path {
          fill: ${theme.colors[`${getVariantColorName(variant)}600`]};
        }
      }
    `;
  }
  if (variant === TERTIARY) {
    return `
      background-color: ${theme.colors.neutral150};
    `;
  }

  return `
    border: 1px solid ${theme.colors[`${getVariantColorName(variant)}600`]};
    background: ${theme.colors[`${getVariantColorName(variant)}600`]};
  `;
};

export const getVariantStyle = ({ theme, variant }: { theme: DefaultTheme; variant: Variant }) => {
  switch (variant) {
    case DANGER_LIGHT:
    case SUCCESS_LIGHT:
    case SECONDARY: {
      return `
          border: 1px solid ${theme.colors[`${getVariantColorName(variant)}200`]};
          background: ${theme.colors[`${getVariantColorName(variant)}100`]};
          ${Typography} {
            color: ${theme.colors[`${getVariantColorName(variant)}700`]};
          }
          svg {
            > g, path {
              fill: ${theme.colors[`${getVariantColorName(variant)}700`]};
            }
          }
        `;
    }
    case TERTIARY: {
      return `
          border: 1px solid ${theme.colors.neutral200};
          background: ${theme.colors.neutral0};
          ${Typography} {
            color: ${theme.colors.neutral800};
          }
          svg {
            > g, path {
              fill: ${theme.colors.neutral800};
            }
          }
        `;
    }
    case GHOST: {
      return `
        border: 1px solid transparent;
        background: transparent;

        ${Typography} {
          color: ${theme.colors.neutral800};
        }

        svg {
          > g, path {
            fill: ${theme.colors.neutral500};
          }
        }
      `;
    }
    case SUCCESS:
    case DANGER: {
      return `
          border: 1px solid ${theme.colors[`${getVariantColorName(variant)}600`]};
          background: ${theme.colors[`${getVariantColorName(variant)}600`]};
          ${Typography} {
            color: ${theme.colors.neutral0};
          }
        `;
    }
    default: {
      return `
          svg {
            > g, path {
              fill: ${theme.colors.buttonNeutral0};
            }
          }
        `;
    }
  }
};
