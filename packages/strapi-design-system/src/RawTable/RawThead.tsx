import { cloneElement, Children, isValidElement, TableHTMLAttributes, ReactNode, ReactElement } from 'react';

export interface RawTheadProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export const RawThead = ({ children, ...props }: RawTheadProps) => {
  /**
   * aria-rowindex is 1-based: we have to start from 1
   */
  const childrenClone = Children.toArray(children).map((child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, { 'aria-rowindex': 1 });
    }

    return child;
  });

  return <thead {...props}>{childrenClone}</thead>;
};
