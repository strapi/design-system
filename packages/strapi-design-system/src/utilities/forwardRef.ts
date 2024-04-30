import * as React from 'react';

/**
 * A utility function to create a forwardRef component.
 * This is a workaround to allow generics to be passed
 * to forwardRef components.
 */
const forwardRef = React.forwardRef as <T, P = {}>(
  render: (props: P, ref: React.ForwardedRef<T>) => ReturnType<React.FunctionComponent>,
) => (props: React.PropsWithoutRef<P> & React.RefAttributes<T>) => ReturnType<React.FunctionComponent>;

export { forwardRef };
