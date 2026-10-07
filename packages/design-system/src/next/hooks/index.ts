/*
 * The hooks of the new system. They have no styled-components code, so the new system shares the
 * implementation of the old one instead of a copy: both entries return the same function
 */

export { composeRefs, useComposedRefs } from '../../hooks/useComposeRefs';
export { useDateFormatter, type DateFormatterOptions } from '../../hooks/useDateFormatter';
export { useCallbackRef, useCollator, useFilter, type Filter } from '@strapi/ui-primitives';
