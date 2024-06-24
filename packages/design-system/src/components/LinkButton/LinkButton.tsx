import * as React from 'react';

import { PolymorphicRef } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { BaseLink } from '../BaseLink';
import { Button, ButtonProps } from '../Button';

type LinkButtonProps<C extends React.ElementType = typeof BaseLink> = ButtonProps<C>;

const LinkButton = forwardRef(
  <C extends React.ElementType = typeof BaseLink>(
    { disabled, ...restProps }: LinkButtonProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    return (
      <Button<typeof BaseLink>
        ref={ref}
        tag={BaseLink}
        tabIndex={disabled ? -1 : undefined}
        disabled={disabled}
        {...restProps}
      />
    );
  },
);

type LinkButtonComponent<C extends React.ElementType = 'a'> = (props: LinkButtonProps<C>) => React.ReactNode;

export { LinkButton };
export type { LinkButtonProps, LinkButtonComponent };
