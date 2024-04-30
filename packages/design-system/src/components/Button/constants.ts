export const SUCCESS_LIGHT = 'success-light';
export const DANGER_LIGHT = 'danger-light';
export const DEFAULT = 'default';
export const TERTIARY = 'tertiary';
export const SECONDARY = 'secondary';
export const DANGER = 'danger';
export const SUCCESS = 'success';
export const GHOST = 'ghost';

export const LIGHT_VARIANTS = [SUCCESS_LIGHT, DANGER_LIGHT] as const;
export const VARIANTS = [DEFAULT, TERTIARY, SECONDARY, DANGER, SUCCESS, GHOST, ...LIGHT_VARIANTS] as const;
export const BUTTON_SIZES = ['S', 'M', 'L'] as const;

export type Variant = (typeof VARIANTS)[number];
export type ButtonSizes = (typeof BUTTON_SIZES)[number];
