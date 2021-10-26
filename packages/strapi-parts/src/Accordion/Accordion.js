import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, H3 } from '../Text';
import { AccordionContext } from './AccordionContext';
import { useId } from '../helpers/useId';
import { Box } from '../Box';
import { DropdownIconWrapper } from './DropdownIconWrapper';

const getBorder = ({ theme, expanded, variant }) => {
  if (expanded) {
    return `1px solid ${theme.colors.primary600}`;
  }

  if (variant === 'primary') {
    return `1px solid ${theme.colors.neutral0}`;
  }

  return `1px solid ${theme.colors.neutral100}`;
};

const AccordionWrapper = styled(Box)`
  border: ${getBorder};

  overflow: hidden;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary600};
    ${H3} {
      color: ${({ theme, expanded }) => (expanded ? undefined : theme.colors.primary700)};
    }

    ${Text} {
      color: ${({ theme, expanded }) => (expanded ? undefined : theme.colors.primary600)};
    }

    & > ${Box} {
      background: ${({ theme }) => theme.colors.primary100};
    }

    ${DropdownIconWrapper} {
      background: ${({ theme }) => theme.colors.primary200};

      svg path {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }
  }
`;

export const Accordion = ({ children, toggle, expanded, id, size, variant }) => {
  const generatedId = useId('accordion', id);

  return (
    <AccordionContext.Provider value={{ expanded, toggle, id: generatedId, size, variant }}>
      <AccordionWrapper data-strapi-expanded={expanded} expanded={expanded} hasRadius variant={variant}>
        {children}
      </AccordionWrapper>
    </AccordionContext.Provider>
  );
};

Accordion.defaultProps = {
  expanded: false,
  id: undefined,
  toggle: false,
  size: 'M',
  variant: 'primary',
};

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  id: PropTypes.string,
  size: PropTypes.oneOf(['S', 'M']),
  toggle: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};
