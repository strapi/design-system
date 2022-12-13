import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '../Typography';
import { AccordionContext } from './AccordionContext';
import { useId } from '../helpers/useId';
import { Box } from '../Box';
import { Flex } from '../Flex';

const getBorder = ({ theme, expanded, variant, disabled, error }) => {
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

const AccordionWrapper = styled(Box)`
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

export const Accordion = ({
  children,
  expanded,
  id,
  size,
  variant,
  disabled,
  error,
  hasErrorMessage,
  onToggle,
  toggle,
}) => {
  const generatedId = useId('accordion', id);

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

Accordion.defaultProps = {
  disabled: false,
  error: undefined,
  expanded: false,
  hasErrorMessage: true,
  id: undefined,
  toggle: undefined,
  size: 'M',
  variant: 'primary',
  onToggle: undefined,
};

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * If `true`, the accordion will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If defined, will add a border (borderColor: `danger600`) and display the error message below the component.
   */
  error: PropTypes.string,
  /**
   * If `true`, an expanded Accordion will be rendered.
   */
  expanded: PropTypes.bool,
  /**
   * If `false`, the error message won't show.
   * If the `Accordion` is as child of an `AccordionGroup`, this prop will be set to `false` automatically.
   * The error message of the `AccordionGroup` will be shown below the group instead of the Accordion itself.
   */
  hasErrorMessage: PropTypes.bool,
  /**
   * The id of the component.
   */
  id: PropTypes.string,
  /**
   * The callback invoked after a click event on the `AccordionToggle`.
   */
  onToggle: PropTypes.func,
  /**
   * Size of the Accordion.
   */
  size: PropTypes.oneOf(['S', 'M']),
  /**
   * DEPRECATED: The callback invoked after a click event on the `AccordionToggle`.
   */
  toggle: PropTypes.func,
  /**
   * Color variant for `Accordion`. The "secondary" variant reverses the background colors.
   * This is useful when you want to display a list and alternate the colors of the accordions.
   */
  variant: PropTypes.oneOf(['primary', 'secondary']),
};
