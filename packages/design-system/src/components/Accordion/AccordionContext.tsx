import * as React from 'react';

import type { AccordionSize, AccordionVariant } from './Accordion';

export interface AccordionContextValue {
  disabled: boolean;
  expanded: boolean;
  id: string;
  onToggle?: () => void;
  size: AccordionSize;
  variant: AccordionVariant;
}

export const AccordionContext = React.createContext<AccordionContextValue>({
  disabled: false,
  expanded: false,
  id: '',
  size: 'M',
  variant: 'primary',
});

export const useAccordion = () => React.useContext(AccordionContext);
