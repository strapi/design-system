import * as React from 'react';

import { styled } from 'styled-components';

import { once } from '../../helpers/deprecations';
import { Flex, FlexComponent } from '../Flex';
import { Typography, TypographyComponent, TypographyProps } from '../Typography';

import { useField } from './FieldContext';

export interface FieldLabelProps extends TypographyProps<'label'> {
  action?: React.ReactNode;
  /**
   * @preserve
   * @deprecated "required" should be given to Field component to share the value across components
   */
  required?: boolean;
}

const warnOnce = once(console.warn);

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, action, required: requiredDeprecatedProp, ...props }, ref) => {
    const { id, required: requiredField } = useField();
    const required = requiredField || requiredDeprecatedProp;

    if (requiredDeprecatedProp !== undefined) {
      warnOnce(
        'Deprecation warning: Usage of "required" prop in FieldLabel component is deprecated. This is discouraged and will be removed in the next major release. Please use the Field component to share the required prop.',
      );
    }

    return (
      <TypographyFlex
        ref={ref}
        variant="pi"
        textColor="neutral800"
        htmlFor={id}
        fontWeight="bold"
        tag="label"
        {...props}
      >
        {children}
        {required && <TypographyAsterisk textColor="danger600">*</TypographyAsterisk>}
        {action && <Action marginLeft={1}>{action}</Action>}
      </TypographyFlex>
    );
  },
);

/**
 * NOTE!
 * This is a concious decision to not use the Box component here.
 * Partially because it must be a span to correctly be picked up,
 * but also because we don't need to add DOM nesting here when it's
 * easier to just add a new class.
 */
const TypographyFlex = styled<TypographyComponent<'label'>>(Typography)`
  display: flex;
  align-items: center;
`;

const TypographyAsterisk = styled<TypographyComponent>(Typography)`
  line-height: 0;
`;

const Action = styled<FlexComponent>(Flex)`
  line-height: 0;

  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;
