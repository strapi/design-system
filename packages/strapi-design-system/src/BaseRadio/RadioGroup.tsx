import * as React from 'react';

import { RadioContext } from './context';
import { setTabIndexOnFirstItem } from '../helpers/setTabIndexOnFirstItem';

export type RadioGroupSize = 'M' | 'L';

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  labelledBy: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
  const radioGroupRef = React.useRef<HTMLDivElement>(null!);

  React.useLayoutEffect(() => {
    if (!value) {
      setTabIndexOnFirstItem(radioGroupRef.current, `[name="${name}"]`);
    }
  }, [value, name]);

  const context = React.useMemo(() => ({ onChange, selected: value, name, size }), [name, onChange, size, value]);

  return (
    <RadioContext.Provider value={context}>
      <div ref={radioGroupRef} role="radiogroup" aria-labelledby={labelledBy} {...props}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};
