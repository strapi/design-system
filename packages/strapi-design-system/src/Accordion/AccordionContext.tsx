import { createContext, useContext } from 'react';

import type { AccordionSize, AccordionVariant } from './Accordion';

export interface AccordionContextValue {
  disabled: boolean;
  expanded: boolean;
  id: string;
  onToggle?: () => void;
  toggle?: () => void;
  size: AccordionSize;
  variant: AccordionVariant;
}

export const AccordionContext = createContext<AccordionContextValue>({
  disabled: false,
  expanded: false,
  id: '',
  size: 'M',
  variant: 'primary',
});

export const useAccordion = () => useContext(AccordionContext);
