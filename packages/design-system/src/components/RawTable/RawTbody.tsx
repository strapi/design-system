import * as React from 'react';

import { RawTrProps } from './RawTr';

export interface RawTbodyProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const RawTbody = ({ children, ...props }: RawTbodyProps) => {
  /**
   * aria-rowindex is 1-based: we have to start from 1
   * since the <tr><th></th></tr> elements count as 1 row, we have to increment the index by 2 (because of the base 1 AND the th)
   */
  const childrenClone = React.Children.toArray(children).map((child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<RawTrProps>, { 'aria-rowindex': index + 2 });
    }

    return child;
  });

  return <tbody {...props}>{childrenClone}</tbody>;
};
