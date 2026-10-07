import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A form label with the legacy look: the `pi` text style (1.2rem), bold, in `neutral-800`.
 * `FieldLabel` builds on it and wires it to the field.
 */
const Label = React.forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<'label'>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        data-slot="label"
        className={cn('text-xs font-semibold text-neutral-800', className)}
        {...props}
      />
    );
  },
);

Label.displayName = 'Label';

export { Label };
