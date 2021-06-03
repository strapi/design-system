import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, H3 } from '../Text';
import { AccordionContext } from './AccordionContext';
import { genId } from '../helpers/genId';
import { Box } from '../Box';
import { DropdownIconWrapper } from './DropdownIconWrapper';

const AccordionWrapper = styled(Box)`
  border: ${({ theme, expanded }) => (expanded ? `1px solid ${theme.colors.primary600}` : `1px solid transparent`)};
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

export const Accordion = ({ children, toggle, expanded, id }) => {
  const idRef = useRef(id || genId());

  return (
    <AccordionContext.Provider value={{ expanded, toggle, id: idRef.current }}>
      <AccordionWrapper expanded={expanded} hasRadius={true}>
        {children}
      </AccordionWrapper>
    </AccordionContext.Provider>
  );
};

Accordion.defaultProps = {
  expanded: false,
  id: undefined,
  toggle: false,
};

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  id: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};
