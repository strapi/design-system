import * as React from 'react';

import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

/**
 * this is basically stolen from RadixUI but tweaked to allow the following:
 * * prop can be a function
 * * setUncontrolledProp is always called with the nextValue.
 */

/**
 * @type {<T>(params: UseControllableStateParams<T>) => [T, (nextState: T | SetStateFn<T>) => void]}
 */

export interface UseControllableStateParams<TProp> {
  prop?: TProp | undefined;
  defaultProp?: TProp | undefined;
  onChange?: (state?: TProp) => void;
}

type SetStateFn<TState> = (prevState: TState) => TState;

function useControllableState<TProp>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<TProp>): [TProp | undefined, (nextState: TProp | SetStateFn<TProp>) => void] {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const isControlled = prop !== undefined;
  const propValue: TProp | undefined = typeof prop === 'function' ? prop(uncontrolledProp) : prop;
  const value = isControlled ? propValue : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);

  const setValue = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue;
        const value = typeof nextValue === 'function' ? setter(propValue) : nextValue;

        if (value !== propValue) {
          handleChange(value);
          setUncontrolledProp(nextValue);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, propValue, setUncontrolledProp, handleChange],
  );

  return [value, setValue];
}

function useUncontrolledState<TProp>({ defaultProp, onChange }: Omit<UseControllableStateParams<TProp>, 'prop'>) {
  const uncontrolledState = React.useState(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);
  const handleChange = useCallbackRef(onChange);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
}

export { useControllableState };
