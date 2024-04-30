import * as React from 'react';

import { styled, type DefaultTheme } from 'styled-components';

import { useId } from '../../hooks/useId';
import { PropsToTransientProps } from '../../types';
import { Box, BoxComponent } from '../Box';
import { Typography } from '../Typography';

import { AccordionContext } from './AccordionContext';
import { AccordionDescription, AccordionTitle } from './AccordionToggle';

type AccordionSize = 'S' | 'M';
type AccordionVariant = 'primary' | 'secondary';

interface AccordionProps {
  children: React.ReactNode;
  /**
   * If `true`, the accordion will be disabled.
   */
  disabled?: boolean;
  /**
   * If defined, will add a border (borderColor: `danger600`) and display the error message below the component.
   */
  error?: string;
  /**
   * If `true`, an expanded Accordion will be rendered.
   */
  expanded?: boolean;
  /**
   * If `false`, the error message won't show.
   * If the `Accordion` is as child of an `AccordionGroup`, this prop will be set to `false` automatically.
   * The error message of the `AccordionGroup` will be shown below the group instead of the Accordion itself.
   */
  hasErrorMessage?: boolean;
  /**
   * The id of the component.
   */
  id?: string;
  /**
   * The callback invoked after a click event on the `AccordionToggle`.
   */
  onToggle?: () => void;
  /**
   * Shadow name (see `theme.shadows`)
   */
  shadow?: keyof DefaultTheme['shadows'];
  /**
   * @preserve
   * @deprecated use `onToggle` instead
   * The callback invoked after a click event on the `AccordionToggle`.
   */
  toggle?: () => void;
  /**
   * Size of the Accordion.
   */
  size?: AccordionSize;
  /**
   * Color variant for `Accordion`. The "secondary" variant reverses the background colors.
   * This is useful when you want to display a list and alternate the colors of the accordions.
   */
  variant?: AccordionVariant;
}

const Accordion = ({
  children,
  disabled = false,
  error,
  expanded = false,
  hasErrorMessage = true,
  id,
  onToggle,
  toggle,
  size = 'M',
  variant = 'primary',
  shadow,
}: AccordionProps) => {
  const generatedId = useId(id);

  const context = React.useMemo(
    () => ({ expanded, onToggle, toggle, id: generatedId, size, variant, disabled }),
    [disabled, expanded, generatedId, onToggle, size, toggle, variant],
  );

  return (
    <AccordionContext.Provider value={context}>
      <AccordionWrapper
        data-strapi-expanded={expanded}
        aria-disabled={disabled}
        hasRadius
        shadow={shadow}
        $expanded={expanded}
        $disabled={disabled}
        $variant={variant}
        $error={error}
      >
        {children}
      </AccordionWrapper>
      {error && hasErrorMessage && (
        <Box paddingTop={1}>
          <Typography variant="pi" textColor="danger600">
            {error}
          </Typography>
        </Box>
      )}
    </AccordionContext.Provider>
  );
};

type AccordionWrapperProps = Pick<AccordionProps, 'expanded' | 'disabled' | 'variant' | 'error'>;

const AccordionWrapper = styled<BoxComponent<'div'>>(Box)<PropsToTransientProps<AccordionWrapperProps>>`
  border: ${({ theme, $expanded, $variant, $disabled, $error }) => {
    if ($error) {
      return `1px solid ${theme.colors.danger600} !important`;
    }

    if ($disabled) {
      return `1px solid ${theme.colors.neutral150}`;
    }

    if ($expanded) {
      return `1px solid ${theme.colors.primary600}`;
    }

    if ($variant === 'primary') {
      return `1px solid ${theme.colors.neutral0}`;
    }

    return `1px solid ${theme.colors.neutral100}`;
  }};

  &:hover:not([aria-disabled='true']) {
    border: 1px solid ${({ theme }) => theme.colors.primary600};

    ${AccordionTitle} {
      color: ${({ theme, $expanded }) => ($expanded ? undefined : theme.colors.primary700)};
    }

    ${AccordionDescription} {
      color: ${({ theme, $expanded }) => ($expanded ? undefined : theme.colors.primary600)};
    }

    & > div:first-child {
      background: ${({ theme }) => theme.colors.primary100};
    }

    [data-strapi-dropdown='true'] {
      background: ${({ theme }) => theme.colors.primary200};
    }
  }
`;

export { Accordion, AccordionWrapper };
export type { AccordionProps, AccordionSize, AccordionVariant };
