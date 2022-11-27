import * as React from 'react';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

/**
 * this is basically stolen from RadixUI but tweaked to allow the following:
 * * prop can be a function
 * * setUncontrolledProp is always called with the nextValue.
 */

/**
 * @typedef UseControllableStateParams
 * @template T
 * @type {{ prop?: T | undefined;  defaultProp?: T | undefined; onChange?: (state: T) => void; }}
 */
/**
 * @typedef SetStateFn
 * @template T
 * @type {(prevState: T) => T}
 */

/**
 * @type {<T>(params: UseControllableStateParams<T>) => [T, (nextState: T | SetStateFn<T>) => void]}
 */
function useControllableState({ prop, defaultProp, onChange = () => {} }) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const isControlled = prop !== undefined;
  const propValue = typeof prop === 'function' ? prop(uncontrolledProp) : prop;
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

/**
 * @type {<T>(params: Omit<UseControllableStateParams<T>, 'prop'>) => [T, (nextState: T | SetStateFn<T>) => void]}
 */
function useUncontrolledState({ defaultProp, onChange }) {
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
