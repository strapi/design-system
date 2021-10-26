import React from 'react';
import PropTypes from 'prop-types';
import DropdownIcon from '@strapi/icons/FilterDropdown';
import styled from 'styled-components';
import { H3, P, Text } from '../Text';
import { useAccordion } from './AccordionContext';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { DropdownIconWrapper } from './DropdownIconWrapper';

const ToggleButton = styled.button`
  border: none;
  background: transparent;
  display: block;
  width: 100%;
  text-align: unset;
  padding: 0;
`;

export const AccordionToggle = ({ title, description, as, togglePosition, action, ...props }) => {
  const { toggle, expanded, id, size, variant } = useAccordion();

  const boxSize = size === 'M' ? 6 : 3;

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
      <Box data-strapi-accordion-header={true} padding={boxSize} background={boxBackground}>
        <Flex justifyContent="space-between">
          <ToggleButton
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={ariaControls}
            aria-labelledby={ariaLabelId}
            data-strapi-accordion-toggle={true}
            type="button"
          >
            <Flex>
              {dropdownIcon}

              <Box paddingLeft={4}>
                {size === 'S' ? (
                  <Text bold={true} as={as} id={ariaLabelId} textColor={titleColor}>
                    {title}
                  </Text>
                ) : (
                  <H3 as={as} id={ariaLabelId} textColor={titleColor}>
                    {title}
                  </H3>
                )}

                {description && (
                  <P id={ariaDescriptionId} textColor={descriptionColor}>
                    {description}
                  </P>
                )}
              </Box>
            </Flex>
          </ToggleButton>

          {action && <Box paddingLeft={3}>{action}</Box>}
        </Flex>
      </Box>
    );
  }

  return (
    <Box data-strapi-accordion-header={true} padding={boxSize} background={boxBackground} size={size}>
      <ToggleButton
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls={ariaControls}
        aria-labelledby={ariaLabelId}
        data-strapi-accordion-toggle={true}
        type="button"
      >
        <Flex justifyContent="space-between">
          <Box paddingRight={6}>
            {size === 'S' ? (
              <Text bold={true} as={as} id={ariaLabelId} textColor={titleColor}>
                {title}
              </Text>
            ) : (
              <H3 as={as} id={ariaLabelId} textColor={titleColor}>
                {title}
              </H3>
            )}

            {description && (
              <P id={ariaDescriptionId} textColor={descriptionColor}>
                {description}
              </P>
            )}
          </Box>

          {dropdownIcon}
        </Flex>
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
