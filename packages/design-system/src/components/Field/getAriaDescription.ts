import type * as React from 'react';

interface AriaDescriptionOptions {
  id?: string;
  error?: string | boolean;
  hint?: React.ReactNode;
  counter?: React.ReactNode;
}

/**
 * The ids of the elements describing a field, for `aria-describedby`: the error, or else the hint,
 * then the counter. `undefined` when there is none. Only ids of rendered elements: an error
 * without a message (`true`) has no element, and the field's context leaves `counter` out when no
 * part renders it.
 */
const getAriaDescription = ({ id, error, hint, counter }: AriaDescriptionOptions) => {
  const ids: string[] = [];

  if (typeof error === 'string' && error !== '') {
    ids.push(`${id}-error`);
  } else if (hint && !error) {
    ids.push(`${id}-hint`);
  }

  if (counter) {
    ids.push(`${id}-counter`);
  }

  return ids.length > 0 ? ids.join(' ') : undefined;
};

export { getAriaDescription };
