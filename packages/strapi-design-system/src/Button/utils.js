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
} from './constants';

export const getVariantColorName = (variant) => {
  if (LIGHT_VARIANTS.includes(variant)) {
    return variant.substring(0, variant.lastIndexOf('-'));
  }
  if (variant === TERTIARY) {
    return 'neutral';
  }
  if ([DEFAULT, SECONDARY].includes(variant) || !VARIANTS.includes(variant)) {
    return 'primary';
  }

  return variant;
};

export const getDisabledStyle = ({ theme }) => {
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

export const getHoverStyle = ({ theme, variant }) => {
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

export const getActiveStyle = ({ theme, variant }) => {
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

export const getVariantStyle = ({ theme, variant }) => {
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
