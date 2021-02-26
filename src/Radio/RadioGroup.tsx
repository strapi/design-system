import React, { useLayoutEffect, useRef } from 'react';
import { genId } from '../helpers';
import { RadioContext } from './context';
import { RadioSize } from './types';

type HtmlDivType = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>;
export interface RadioGroupProps extends HtmlDivType {
  children: React.ReactNode;
  labelledBy: string;
  onSelect: (nextValue: string) => void;
  value?: string;
  size?: RadioSize;
}

export const RadioGroup = ({ children, labelledBy, onSelect, value, size = 'S', ...props }: RadioGroupProps) => {
  const nameRef = useRef(genId());
  const radioGroupRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!value) {
      const radios = radioGroupRef.current?.querySelectorAll(`[name="${nameRef.current}"]`);

      // When mounting the component, the first radio button has to be focusable
      if (radios && radios.length > 0) {
        radios.item(0).setAttribute('tabindex', '0');
      }
    }
  }, [value]);

  return (
    <RadioContext.Provider value={{ onSelect, selected: value, name: nameRef.current, size }}>
      <div ref={radioGroupRef} role="radiogroup" aria-labelledby={labelledBy} {...props}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};
