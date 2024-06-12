import * as React from 'react';

import { RawTrProps } from './RawTr';

export interface RawTheadProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const RawThead = ({ children, ...props }: RawTheadProps) => {
  /**
   * aria-rowindex is 1-based: we have to start from 1
   */
  const childrenClone = React.Children.toArray(children).map((child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<RawTrProps>, { 'aria-rowindex': 1 });
    }

    return child;
  });

  return <thead {...props}>{childrenClone}</thead>;
};
