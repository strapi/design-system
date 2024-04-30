import * as React from 'react';

import { CaretDown } from '@strapi/icons';
import { styled, type DefaultTheme } from 'styled-components';

import { Box } from '../Box';
import { Flex, FlexComponent } from '../Flex';
import { TextButton, TextButtonProps } from '../TextButton';
import { Typography, TypographyComponent, TypographyProps } from '../Typography';

import { AccordionSize } from './Accordion';
import { useAccordion } from './AccordionContext';

interface AccordionToggleProps extends Omit<TextButtonProps, 'tag'>, Pick<TypographyProps, 'tag'> {
  /**
   * Will render a node to the right of the Accordion component
   */
  action?: React.ReactNode;
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

const AccordionToggle = ({
  title,
  description,
  tag,
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

  let boxBackground: keyof DefaultTheme['colors'] = 'neutral100';

  if (expanded) {
    boxBackground = 'primary100';
  } else if (disabled) {
    boxBackground = 'neutral150';
  } else if (variant === 'primary') {
    boxBackground = 'neutral0';
  }

  const titleColor = expanded ? 'primary600' : 'neutral700';
  const titleProps: TypographyProps = {
    tag,
    fontWeight: size === 'S' ? 'bold' : undefined,
    id: ariaLabelId,
    textColor: titleColor,
    ellipsis: true,
    variant: size === 'M' ? 'delta' : undefined,
  };
  const descriptionColor = expanded ? 'primary600' : 'neutral600';
  const iconColor = expanded ? 'primary200' : 'neutral200';
  const iconSize = size === 'M' ? `3.2rem` : `2.4rem`;

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
      tag="span"
      background={iconColor}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      shrink={0}
    >
      <CaretDown width={size === 'M' ? `1.6rem` : `1.2rem`} fill={expanded ? 'primary600' : 'neutral600'} />
    </Flex>
  );

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <FlexWithSize
      paddingBottom={boxPaddingY}
      paddingLeft={boxPaddingX}
      paddingRight={boxPaddingX}
      paddingTop={boxPaddingY}
      background={boxBackground}
      $expanded={expanded}
      $size={size}
      justifyContent="space-between"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      onClick={handleToggle}
    >
      <Flex gap={3} flex={1} maxWidth="100%">
        {togglePosition === 'left' && dropdownIcon}

        <ToggleButton
          aria-disabled={disabled}
          aria-expanded={expanded}
          aria-controls={ariaControls}
          aria-labelledby={ariaLabelId}
          data-strapi-accordion-toggle
          $expanded={expanded}
          type="button"
          flex={1}
          minWidth={0}
          {...props}
        >
          <AccordionTitle {...titleProps}>{title}</AccordionTitle>
          {description && (
            <AccordionDescription tag="p" id={ariaDescriptionId} textColor={descriptionColor}>
              {description}
            </AccordionDescription>
          )}
        </ToggleButton>

        {togglePosition === 'right' && (
          <Flex gap={3}>
            {dropdownIcon}
            <Box tag="span" onClick={stopPropagation}>
              {action}
            </Box>
          </Flex>
        )}

        {togglePosition === 'left' && (
          <Box tag="span" onClick={stopPropagation}>
            {action}
          </Box>
        )}
      </Flex>
    </FlexWithSize>
  );
};

const AccordionDescription = styled<TypographyComponent<'p'>>(Typography)``;

const AccordionTitle = styled<TypographyComponent>(Typography)``;

const ToggleButton = styled(TextButton)<{ $expanded: boolean }>`
  text-align: left;

  // necessary to make the ellipsis prop work on the title
  > span {
    max-width: 100%;
  }

  & > svg {
    width: 1.4rem;
    height: 1.4rem;
    fill: ${({ theme, $expanded }) => ($expanded ? theme.colors.primary600 : theme.colors.neutral500)};
  }
`;

const FlexWithSize = styled<FlexComponent>(Flex)<{ $expanded: boolean; $size: AccordionSize }>`
  min-height: ${({ theme, $size }) => theme.sizes.accordions[$size]};
  border-radius: ${({ theme, $expanded }) =>
    $expanded ? `${theme.borderRadius} ${theme.borderRadius} 0 0` : theme.borderRadius};

  &:hover {
    ${ToggleButton} {
      svg {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }
  }
`;

export { AccordionToggle, AccordionTitle, AccordionDescription };
export type { AccordionToggleProps };
