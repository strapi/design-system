import * as React from 'react';

import styled from 'styled-components';

import { Box, BoxComponent } from '../Box';
import { FieldLabelProps } from '../Field';
import { Flex } from '../Flex';
import { KeyboardNavigable } from '../KeyboardNavigable';
import { Typography } from '../Typography';

interface AccordionGroupProps {
  children: React.ReactNode;
  error?: string;
  footer?: React.ReactNode;
  label?: string;
  labelAction?: FieldLabelProps['action'];
}

const AccordionGroup = ({ children, footer, label, labelAction, error }: AccordionGroupProps) => {
  const childrenArray = React.Children.toArray(children).map((child) => {
    return React.cloneElement(child as React.ReactElement, { hasErrorMessage: false });
  });

  return (
    <KeyboardNavigable attributeName="data-strapi-accordion-toggle">
      {label && (
        <Flex paddingBottom={1}>
          <Typography variant="pi" tag="label" textColor="neutral800" fontWeight="bold">
            {label}
          </Typography>
          {labelAction && <LabelAction paddingLeft={1}>{labelAction}</LabelAction>}
        </Flex>
      )}
      <EnhancedGroup $footer={footer}>{childrenArray}</EnhancedGroup>
      {footer && <AccordionFooter>{footer}</AccordionFooter>}
      {error && (
        <Box paddingTop={1}>
          <Typography variant="pi" textColor="danger600">
            {error}
          </Typography>
        </Box>
      )}
    </KeyboardNavigable>
  );
};

const AccordionFooter = styled<BoxComponent>(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-left: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
`;

const EnhancedGroup = styled<BoxComponent>(Box)<{ $footer: React.ReactNode }>`
  & > * {
    & > * {
      border-radius: unset;
    }
  }

  & > * {
    border-radius: unset;
    border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-left: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  }

  & > *:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
    & > * {
      border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
    }

    &:hover {
      border-top: 1px solid ${({ theme }) => theme.colors.primary600};
    }
  }

  & [data-strapi-expanded='true'] {
    border: 1px solid ${({ theme }) => theme.colors.primary600};
  }

  ${({ theme, $footer }) => `
    &:not(${$footer}) {
      & > *:last-of-type {
        border-radius: 0 0 ${theme.borderRadius} ${theme.borderRadius};
      }
    }
  `}
`;

const LabelAction = styled<BoxComponent>(Box)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

export { AccordionGroup };
export type { AccordionGroupProps };
