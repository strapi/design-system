import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, H3 } from '../Text';
import { AccordionContext } from './AccordionContext';
import { useId } from '../helpers/useId';
import { Box } from '../Box';
import { Flex } from '../Flex';

const getBorder = ({ theme, expanded, variant, disabled }) => {
  if (expanded) {
    return `1px solid ${theme.colors.primary600}`;
  }

  if (disabled) {
    return `1px solid ${theme.colors.neutral150}`;
  }

  if (variant === 'primary') {
    return `1px solid ${theme.colors.neutral0}`;
  }

  return `1px solid ${theme.colors.neutral100}`;
};

const AccordionWrapper = styled(Box)`
  border: ${getBorder};
  overflow: hidden;

  &:hover:not([aria-disabled='true']) {
    border: 1px solid ${({ theme }) => theme.colors.primary600};

    ${H3} {
      color: ${({ theme, expanded }) => (expanded ? undefined : theme.colors.primary700)};
    }

    ${Text} {
      color: ${({ theme, expanded }) => (expanded ? undefined : theme.colors.primary600)};
    }

    & > ${Flex} {
      background: ${({ theme }) => theme.colors.primary100};
    }

    [data-strapi-dropdown='true'] {
      background: ${({ theme }) => theme.colors.primary200};
    }

    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }
  }
`;

export const Accordion = ({ children, toggle, expanded, id, size, variant, disabled }) => {
  const generatedId = useId('accordion', id);

  return (
    <AccordionContext.Provider value={{ expanded, toggle, id: generatedId, size, variant, disabled }}>
      <AccordionWrapper
        data-strapi-expanded={expanded}
        disabled={disabled}
        aria-disabled={disabled}
        expanded={expanded}
        hasRadius
        variant={variant}
      >
        {children}
      </AccordionWrapper>
    </AccordionContext.Provider>
  );
};

Accordion.defaultProps = {
  disabled: false,
  expanded: false,
  id: undefined,
  toggle: false,
  size: 'M',
  variant: 'primary',
};

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  expanded: PropTypes.bool,
  id: PropTypes.string,
  size: PropTypes.oneOf(['S', 'M']),
  toggle: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};
