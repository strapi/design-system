import { cloneElement, Children, isValidElement, TableHTMLAttributes, ReactNode, ReactElement } from 'react';

export interface RawTbodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export const RawTbody = ({ children, ...props }: RawTbodyProps) => {
  /**
   * aria-rowindex is 1-based: we have to start from 1
   * since the <tr><th></th></tr> elements count as 1 row, we have to increment the index by 2 (because of the base 1 AND the th)
   */
  const childrenClone = Children.toArray(children).map((child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, { 'aria-rowindex': index + 2 });
    }

    return child;
  });

  return <tbody {...props}>{childrenClone}</tbody>;
};
