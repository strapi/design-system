import { DefaultTheme, css } from 'styled-components';

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
  type ButtonVariant,
} from './constants';

export const getVariantColorName = (variant: ButtonVariant): 'success' | 'danger' | 'neutral' | 'primary' => {
  if (variant === SUCCESS_LIGHT || variant === DANGER_LIGHT) {
    return `${variant.substring(0, variant.lastIndexOf('-'))}` as 'success' | 'danger';
  }
  if (variant === TERTIARY) {
    return 'neutral';
  }
  if (variant === DEFAULT || variant === SECONDARY || VARIANTS.every((vari) => vari !== variant)) {
    return 'primary';
  }

  // @ts-expect-error ghost is a variant, but ghostXXX is not any color...
  return `${variant}`;
};

export const getDisabledStyle = ({ theme }: { theme: DefaultTheme }) => {
  return css`
    border: 1px solid ${theme.colors.neutral200};
    background: ${theme.colors.neutral150};
    color: ${theme.colors.neutral600};
    cursor: default;
  `;
};

export const getHoverStyle = ({ theme, $variant }: { theme: DefaultTheme; $variant: ButtonVariant }) => {
  if ([...LIGHT_VARIANTS, SECONDARY].includes($variant)) {
    return css`
      background-color: ${theme.colors.neutral0};
    `;
  }
  if ($variant === TERTIARY) {
    return css`
      background-color: ${theme.colors.neutral100};
    `;
  }

  if ($variant === GHOST) {
    return css`
      background-color: ${theme.colors.neutral100};
    `;
  }

  if ($variant === DEFAULT) {
    return css`
      border: 1px solid ${theme.colors.buttonPrimary500};
      background: ${theme.colors.buttonPrimary500};
    `;
  }

  return css`
    border: 1px solid ${theme.colors[`${getVariantColorName($variant)}500`]};
    background: ${theme.colors[`${getVariantColorName($variant)}500`]};
  `;
};

export const getActiveStyle = ({ theme, $variant }: { theme: DefaultTheme; $variant: ButtonVariant }) => {
  if ([...LIGHT_VARIANTS, SECONDARY].includes($variant)) {
    return css`
      background-color: ${theme.colors.neutral0};
      border: 1px solid ${theme.colors[`${getVariantColorName($variant)}600`]};
      color: ${theme.colors[`${getVariantColorName($variant)}600`]};
    `;
  }
  if ($variant === TERTIARY) {
    return css`
      background-color: ${theme.colors.neutral150};
    `;
  }

  return css`
    border: 1px solid ${theme.colors[`${getVariantColorName($variant)}600`]};
    background: ${theme.colors[`${getVariantColorName($variant)}600`]};
  `;
};

export const getVariantStyle = ({ theme, $variant }: { theme: DefaultTheme; $variant: ButtonVariant }) => {
  switch ($variant) {
    case DANGER_LIGHT:
    case SUCCESS_LIGHT:
    case SECONDARY: {
      return css`
        border: 1px solid ${theme.colors[`${getVariantColorName($variant)}200`]};
        background: ${theme.colors[`${getVariantColorName($variant)}100`]};
        color: ${theme.colors[`${getVariantColorName($variant)}700`]};
      `;
    }
    case TERTIARY: {
      return css`
        border: 1px solid ${theme.colors.neutral200};
        background: ${theme.colors.neutral0};
        color: ${theme.colors.neutral800};
      `;
    }
    case GHOST: {
      return css`
        border: 1px solid transparent;
        background: transparent;
        color: ${theme.colors.neutral800};

        svg {
          fill: ${theme.colors.neutral500};
        }
      `;
    }
    case SUCCESS:
    case DANGER: {
      return css`
        border: 1px solid ${theme.colors[`${getVariantColorName($variant)}600`]};
        background: ${theme.colors[`${getVariantColorName($variant)}600`]};
        color: ${theme.colors.neutral0};
      `;
    }
    default: {
      return css`
        border: 1px solid ${theme.colors.buttonPrimary600};
        background: ${theme.colors.buttonPrimary600};
        color: ${theme.colors.buttonNeutral0};
      `;
    }
  }
};
