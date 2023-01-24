import { ChangeEventHandler, useLayoutEffect, useRef } from 'react';

import { RadioContext } from './context';
import { setTabIndexOnFirstItem } from '../helpers/setTabIndexOnFirstItem';

export type RadioGroupSize = 'M' | 'L';

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  labelledBy: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  size?: RadioGroupSize;
  value?: string;
}

export const RadioGroup = ({
  children,
  labelledBy,
  onChange,
  value = '',
  size = 'M',
  name,
  ...props
}: RadioGroupProps) => {
  const radioGroupRef = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    if (!value) {
      setTabIndexOnFirstItem(radioGroupRef.current, `[name="${name}"]`);
    }
  }, [value, name]);

  return (
    <RadioContext.Provider value={{ onChange, selected: value, name, size }}>
      <div ref={radioGroupRef} role="radiogroup" aria-labelledby={labelledBy} {...props}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};
