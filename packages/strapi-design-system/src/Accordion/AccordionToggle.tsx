import * as React from 'react';

import { CarretDown } from '@strapi/icons';
import styled from 'styled-components';

import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { TextButton } from '../TextButton';
import { Typography } from '../Typography';
import { AccordionSize, AccordionTypography } from './Accordion';
import { useAccordion } from './AccordionContext';
import { getBackground } from './utils';

const ToggleButton = styled(TextButton)<{ expanded: boolean }>`
  text-align: left;

  // necessary to make the ellipsis prop work on the title
  > span {
    max-width: 100%;
  }

  svg {
    width: ${14 / 16}rem;
    height: ${14 / 16}rem;

    path {
      fill: ${({ theme, expanded }) => (expanded ? theme.colors.primary600 : theme.colors.neutral500)};
    }
  }
`;

const FlexWithSize = styled(Flex)<{ expanded: boolean; size: AccordionSize }>`
  min-height: ${({ theme, size }) => theme.sizes.accordions[size]};
  border-radius: ${({ theme, expanded }) =>
    expanded ? `${theme.borderRadius} ${theme.borderRadius} 0 0` : theme.borderRadius};

  &:hover {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }
  }
`;

interface AccordionToggleProps {
  /**
   * Will render a node to the right of the Accordion component
   */
  action?: React.ReactNode;
  as?: string | React.ComponentType<any>;
  /**
   * Show the secondary text of the Accordion component
   */
  description?: string;
  /**
   * Show the main title of the Accordion component
   */
  title: string;
  /**
   * Set the position of the toggle icon button
   */
  togglePosition?: 'right' | 'left';
}

export const AccordionToggle = ({
  title,
  description,
  as = 'span',
  togglePosition = 'right',
  action,
  ...props
}: AccordionToggleProps) => {
  const { onToggle, toggle, expanded, id, size, variant, disabled } = useAccordion();

  // Accessibility identifiers
  const ariaControls = `accordion-content-${id}`;
  const ariaLabelId = `accordion-label-${id}`;
  const ariaDescriptionId = `accordion-desc-${id}`;

  // Style overrides
  const boxPaddingX = size === 'M' ? 6 : 4;
  const boxPaddingY = size === 'M' ? boxPaddingX : boxPaddingX - 2;
  const boxBackground = getBackground({ expanded, disabled, variant });
  const titleColor = expanded ? 'primary600' : 'neutral700';
  const titleProps = {
    as,
    fontWeight: size === 'S' ? 'bold' : undefined,
    id: ariaLabelId,
    textColor: titleColor,
    ellipsis: true,
    variant: size === 'M' ? 'delta' : undefined,
  };
  const descriptionColor = expanded ? 'primary600' : 'neutral600';
  const iconColor = expanded ? 'primary200' : 'neutral200';
  const iconSize = size === 'M' ? `${32 / 16}rem` : `${24 / 16}rem`;

  const handleToggle = () => {
    if (!disabled) {
      if (toggle && !onToggle) {
        console.warn(
          'Deprecation warning: Usage of "toggle" prop in Accordion component is deprecated. This is discouraged and will be removed in the next major release. Please use "onToggle" instead',
        );
        toggle();
      } else if (onToggle) {
        onToggle();
      }
    }
  };

  const dropdownIcon = (
    <Flex
      justifyContent="center"
      borderRadius="50%"
      height={iconSize}
      width={iconSize}
      transform={expanded ? `rotate(180deg)` : undefined}
      data-strapi-dropdown
      aria-hidden
      as="span"
      background={iconColor}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      onClick={handleToggle}
      shrink={0}
    >
      <Icon
        as={CarretDown}
        width={size === 'M' ? `${11 / 16}rem` : `${8 / 16}rem`}
        color={expanded ? 'primary600' : 'neutral600'}
      />
    </Flex>
  );

  return (
    <FlexWithSize
      paddingBottom={boxPaddingY}
      paddingLeft={boxPaddingX}
      paddingRight={boxPaddingX}
      paddingTop={boxPaddingY}
      background={boxBackground}
      expanded={expanded}
      size={size}
      justifyContent="space-between"
      cursor={disabled ? 'not-allowed' : ''}
    >
      <Stack horizontal spacing={3} flex={1} maxWidth="100%">
        {togglePosition === 'left' && dropdownIcon}

        <ToggleButton
          onClick={handleToggle}
          aria-disabled={disabled}
          aria-expanded={expanded}
          aria-controls={ariaControls}
          aria-labelledby={ariaLabelId}
          data-strapi-accordion-toggle
          expanded={expanded}
          type="button"
          flex={1}
          minWidth={0}
          {...props}
        >
          <>
            <AccordionTypography {...titleProps}>{title}</AccordionTypography>

            {description && (
              <Typography as="p" id={ariaDescriptionId} textColor={descriptionColor}>
                {description}
              </Typography>
            )}
          </>
        </ToggleButton>

        {togglePosition === 'right' && (
          <Stack horizontal spacing={3}>
            {dropdownIcon}
            {action}
          </Stack>
        )}

        {togglePosition === 'left' && action}
      </Stack>
    </FlexWithSize>
  );
};
