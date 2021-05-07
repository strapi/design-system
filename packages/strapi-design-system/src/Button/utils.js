import { Text } from '../Text';
import { LIGHT_VARIANTS, VARIANTS } from './constants';

export const getVariantColorName = (variant) => {
  if (LIGHT_VARIANTS.includes(variant)) {
    return variant.substring(0, variant.lastIndexOf('-'));
  }
  if (variant === 'tertiary') {
    return 'neutral';
  }
  if (['default', 'secondary'].includes(variant) || !VARIANTS.includes(variant)) {
    return 'primary';
  }

  return variant;
};

export const getDisabledStyle = ({ theme }) => {
  return `
    border: 1px solid ${theme.colors.neutral200};
    background: ${theme.colors.neutral150};
    ${Text} {
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
  if ([...LIGHT_VARIANTS, 'secondary'].includes(variant)) {
    return `
      background-color: ${theme.colors.neutral0};
    `;
  }
  if (variant === 'tertiary') {
    return `
      background-color: ${theme.colors.neutral100};
    `;
  }

  return `
    background: ${theme.colors[`${getVariantColorName(variant)}500`]};
  `;
};

export const getActiveStyle = ({ theme, variant }) => {
  if ([...LIGHT_VARIANTS, 'secondary'].includes(variant)) {
    return `
      background-color: ${theme.colors.neutral0};
      border: 1px solid ${theme.colors[`${getVariantColorName(variant)}600`]};
      ${Text} {
        color: ${theme.colors[`${getVariantColorName(variant)}600`]};
      }
      svg {
        > g, path {
          fill: ${theme.colors[`${getVariantColorName(variant)}600`]};
        }
      }
    `;
  }
  if (variant === 'tertiary') {
    return `
      background-color: ${theme.colors.neutral150};
    `;
  }

  return `
    background: ${theme.colors[`${getVariantColorName(variant)}600`]};
  `;
};

export const getVariantStyle = ({ theme, variant }) => {
  switch (variant) {
    case 'danger-light':
    case 'success-light':
    case 'secondary': {
      return `
          border: 1px solid ${theme.colors[`${getVariantColorName(variant)}200`]};
          background: ${theme.colors[`${getVariantColorName(variant)}100`]};
          ${Text} {
            color: ${theme.colors[`${getVariantColorName(variant)}700`]};
          }
          svg {
            > g, path {
              fill: ${theme.colors[`${getVariantColorName(variant)}700`]};
            }
          }
        `;
    }
    case 'tertiary': {
      return `
          border: 1px solid ${theme.colors.neutral200};
          background: ${theme.colors.neutral0};
          ${Text} {
            color: ${theme.colors.neutral800};
          }
          svg {
            > g, path {
              fill: ${theme.colors.neutral800};
            }
          }
        `;
    }
    default: {
      return `
          border: 1px solid ${theme.colors[`${getVariantColorName(variant)}600`]};
          background: ${theme.colors[`${getVariantColorName(variant)}600`]};
        `;
    }
  }
};

export const getIconPosition = ({ size }) => {
  if (size === 'S') {
    return '1px';
  }

  return '3px';
};
