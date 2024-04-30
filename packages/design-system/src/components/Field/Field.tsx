import * as React from 'react';

import { useId } from '../../hooks/useId';
import { Box, BoxProps } from '../Box';

import { FieldContext } from './FieldContext';

export interface FieldProps extends BoxProps {
  children: React.ReactNode;
  error?: string | boolean;
  hint?: React.ReactNode;
  id?: string;
  name?: string;
  /**
   * @default false
   */
  required?: boolean;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ children, name, error, hint, id, required = false, ...props }, ref) => {
    const generatedId = useId(id);

    const context = React.useMemo(
      () => ({ name, id: generatedId, error, hint, required }),
      [error, generatedId, hint, name, required],
    );

    return (
      <Box ref={ref} {...props}>
        <FieldContext.Provider value={context}>{children}</FieldContext.Provider>
      </Box>
    );
  },
);
