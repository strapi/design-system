import React from 'react';
import PropTypes from 'prop-types';
import DropdownIcon from '@strapi/icons/FilterDropdown';
import styled from 'styled-components';
import { H3, P } from '../Text';
import { useAccordion } from './AccordionContext';
import { Box } from '../Box';
import { Row } from '../Row';
import { DropdownIconWrapper } from './DropdownIconWrapper';

const ToggleButton = styled.button`
  border: none;
  background: transparent;
  display: block;
  width: 100%;
  text-align: unset;
  padding: 0;
`;

export const AccordionToggle = ({ title, description, as, variant, togglePosition, action, ...props }) => {
  const { toggle, expanded, id } = useAccordion();

  const ariaControls = `accordion-content-${id}`;
  const ariaLabelId = `accordion-label-${id}`;
  const ariaDescriptionId = `accordion-desc-${id}`;

  const boxBackground = expanded ? 'primary100' : variant === 'primary' ? 'neutral0' : 'neutral100';
  const titleColor = expanded ? 'primary600' : 'neutral700';
  const descriptionColor = expanded ? 'primary600' : 'neutral600';
  const iconColor = expanded ? 'primary200' : 'neutral200';

  const dropdownIcon = (
    <DropdownIconWrapper expanded={expanded} aria-hidden {...props} as="span" background={iconColor}>
      <DropdownIcon />
    </DropdownIconWrapper>
  );

  if (togglePosition === 'left') {
    return (
      <Box padding={6} hasRadius background={boxBackground}>
        <Row justifyContent="space-between">
          <ToggleButton
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={ariaControls}
            aria-labelledby={ariaLabelId}
            data-strapi-accordion-toggle={true}
            type="button"
          >
            <Row>
              {dropdownIcon}

              <Box paddingLeft={6}>
                <H3 as={as} id={ariaLabelId} textColor={titleColor}>
                  {title}
                </H3>

                {description && (
                  <P id={ariaDescriptionId} textColor={descriptionColor}>
                    {description}
                  </P>
                )}
              </Box>
            </Row>
          </ToggleButton>

          {action && <Box paddingLeft={3}>{action}</Box>}
        </Row>
      </Box>
    );
  }

  return (
    <Box padding={6} hasRadius background={boxBackground}>
      <ToggleButton
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls={ariaControls}
        aria-labelledby={ariaLabelId}
        data-strapi-accordion-toggle={true}
      >
        <Row justifyContent="space-between">
          <Box paddingRight={6}>
            <H3 as={as} id={ariaLabelId} textColor={titleColor}>
              {title}
            </H3>

            {description && (
              <P id={ariaDescriptionId} textColor={descriptionColor}>
                {description}
              </P>
            )}
          </Box>

          {dropdownIcon}
        </Row>
      </ToggleButton>
    </Box>
  );
};

AccordionToggle.defaultProps = {
  action: undefined,
  as: 'span',
  description: undefined,
  variant: 'primary',
  togglePosition: 'right',
};

AccordionToggle.propTypes = {
  action: PropTypes.node,
  as: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  togglePosition: PropTypes.oneOf(['right', 'left']),
  variant: PropTypes.oneOf(['primary', 'secondary']),
};
