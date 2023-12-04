import * as React from 'react';

import { useCallbackRef } from '@strapi/ui-primitives';

/**
 * this is basically stolen from RadixUI but tweaked to allow the following:
 * * prop can be a function
 * * setUncontrolledProp is always called with the nextValue.
 */

/**
 * @type {<T>(params: UseControllableStateParams<T>) => [T, (nextState: T | SetStateFn<T>) => void]}
 */

export interface UseControllableStateParams<TProp> {
  prop?: TProp | undefined | ((state?: TProp | undefined) => TProp | undefined);
  defaultProp?: TProp | undefined;
  onChange?: (state?: TProp) => void;
}

type SetStateFn<TState> = (prevState: TState) => TState;

function useControllableState<TProp>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<TProp>): [
  TProp | undefined,
  (nextState: TProp | undefined | SetStateFn<TProp | undefined>) => void,
] {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const isControlled = prop !== undefined;
  const propValue: TProp | undefined = prop instanceof Function ? prop(uncontrolledProp) : prop;
  const value = isControlled ? propValue : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);

  const setValue = React.useCallback(
    (nextValue: TProp | undefined | SetStateFn<TProp | undefined>) => {
      if (isControlled) {
        const value = isValueSetStateFn(nextValue) ? nextValue(propValue) : nextValue;

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

const isValueSetStateFn = <TProp>(
  value: TProp | undefined | SetStateFn<TProp | undefined>,
): value is SetStateFn<TProp | undefined> => (value ? typeof value === 'function' : false);

export { useControllableState };
