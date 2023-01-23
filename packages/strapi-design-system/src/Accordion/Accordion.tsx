import styled, { DefaultTheme } from 'styled-components';

import { Typography } from '../Typography';
import { useId } from '../helpers/useId';
import { Box } from '../Box';
import { Flex } from '../Flex';

import { AccordionContext } from './AccordionContext';

interface GetBorderParams extends AccordionWrapperProps {
  theme: DefaultTheme;
}

const getBorder = ({ theme, expanded, variant, disabled, error }: GetBorderParams) => {
  if (error) {
    return `1px solid ${theme.colors.danger600} !important`;
  }

  if (disabled) {
    return `1px solid ${theme.colors.neutral150}`;
  }

  if (expanded) {
    return `1px solid ${theme.colors.primary600}`;
  }

  if (variant === 'primary') {
    return `1px solid ${theme.colors.neutral0}`;
  }

  return `1px solid ${theme.colors.neutral100}`;
};

export const AccordionTypography = styled(Typography)``;

type AccordionWrapperProps = Pick<AccordionProps, 'expanded' | 'disabled' | 'variant' | 'error'>;

const AccordionWrapper = styled(Box)<AccordionWrapperProps>`
  border: ${getBorder};

  &:hover:not([aria-disabled='true']) {
    border: 1px solid ${({ theme }) => theme.colors.primary600};

    ${AccordionTypography} {
      color: ${({ theme, expanded }) => (expanded ? undefined : theme.colors.primary700)};
    }

    ${Typography} {
      color: ${({ theme, expanded }) => (expanded ? undefined : theme.colors.primary600)};
    }

    & > ${Flex} {
      background: ${({ theme }) => theme.colors.primary100};
    }

    [data-strapi-dropdown='true'] {
      background: ${({ theme }) => theme.colors.primary200};
    }
  }
`;

export type AccordionSize = 'S' | 'M';
export type AccordionVariant = 'primary' | 'secondary';

export interface AccordionProps {
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

export const Accordion = ({
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
}: AccordionProps) => {
  const generatedId = useId(id);

  return (
    <AccordionContext.Provider value={{ expanded, onToggle, toggle, id: generatedId, size, variant, disabled }}>
      <AccordionWrapper
        data-strapi-expanded={expanded}
        disabled={disabled}
        aria-disabled={disabled}
        expanded={expanded}
        hasRadius
        variant={variant}
        error={error}
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
