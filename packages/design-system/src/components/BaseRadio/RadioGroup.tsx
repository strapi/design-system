import * as React from 'react';

import { createContext } from '../../helpers/context';
import { setTabIndexOnFirstItem } from '../../helpers/setTabIndexOnFirstItem';

/* -------------------------------------------------------------------------------------------------
 * RadioContext
 * -----------------------------------------------------------------------------------------------*/

interface RadioContextValue {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  selected: string;
}

const [RadioProvider, useRadioGroup] = createContext<RadioContextValue>('RadioGroup', {
  onChange: undefined,
  name: '',
  selected: '',
});

/* -------------------------------------------------------------------------------------------------
 * RadioGroup
 * -----------------------------------------------------------------------------------------------*/

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  labelledBy: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const RadioGroup = ({ children, labelledBy, onChange, value = '', name, ...props }: RadioGroupProps) => {
  const radioGroupRef = React.useRef<HTMLDivElement>(null!);

  React.useLayoutEffect(() => {
    if (!value) {
      setTabIndexOnFirstItem(radioGroupRef.current, `[name="${name}"]`);
    }
  }, [value, name]);

  return (
    <RadioProvider onChange={onChange} selected={value} name={name}>
      <div ref={radioGroupRef} role="radiogroup" aria-labelledby={labelledBy} {...props}>
        {children}
      </div>
    </RadioProvider>
  );
};

export { RadioGroup, useRadioGroup };
export type { RadioGroupProps, RadioContextValue };
