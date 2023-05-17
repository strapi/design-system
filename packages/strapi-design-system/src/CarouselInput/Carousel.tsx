import * as React from 'react';

import { ChevronRight, ChevronLeft } from '@strapi/icons';
import styled from 'styled-components';

import { Box, BoxProps } from '../Box';
import { Flex } from '../Flex';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';

export interface CarouselProps extends BoxProps {
  actions?: React.ReactNode;
  children: React.ReactNode;
  label: string;
  nextLabel: string;
  onNext: () => void;
  onPrevious: () => void;
  previousLabel: string;
  secondaryLabel?: string;
  selectedSlide: number;
}

const CarouselGrid = styled(Box)`
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'startAction slides endAction';
`;

const CarouselSlides = styled(Flex)`
  grid-area: slides;
`;

const CarouselAction = styled(Box)<{ area: string }>`
  grid-area: ${({ area }) => area};

  &:focus svg path,
  &:hover svg path {
    fill: ${({ theme }) => theme.colors.neutral900};
  }
`;

export const Carousel = ({
  actions,
  children,
  label,
  nextLabel,
  onNext,
  onPrevious,
  previousLabel,
  secondaryLabel,
  selectedSlide,
  ...props
}: CarouselProps) => {
  const prevActionRef = React.useRef<HTMLButtonElement>(null);
  const nextActionRef = React.useRef<HTMLButtonElement>(null);

  const childrenArray = React.Children.map(children, (node, index) =>
    React.cloneElement(node as React.ReactElement, { selected: index === selectedSlide }),
  );

  const handleKeyDown = (event) => {
    switch (event.key) {
      case KeyboardKeys.RIGHT: {
        event.preventDefault();

        if (nextActionRef?.current) {
          nextActionRef.current.focus();
        }

        onNext();

        break;
      }

      case KeyboardKeys.LEFT: {
        event.preventDefault();

        if (prevActionRef?.current) {
          prevActionRef.current.focus();
        }

        onPrevious();
        break;
      }

      default:
        break;
    }
  };

  return (
    <Box {...props} onKeyDown={handleKeyDown}>
      <Box padding={2} borderColor="neutral200" hasRadius background="neutral100">
        <CarouselGrid
          as="section"
          aria-roledescription="carousel"
          aria-label={label}
          display="grid"
          position="relative"
        >
          {childrenArray && childrenArray.length > 1 && (
            <>
              <CarouselAction
                as="button"
                onClick={onPrevious}
                area="startAction"
                ref={prevActionRef}
                aria-label={previousLabel}
                type="button"
              >
                <Icon as={ChevronLeft} aria-hidden width="6px" height="10px" color="neutral600" />
              </CarouselAction>

              <CarouselAction
                as="button"
                onClick={onNext}
                area="endAction"
                ref={nextActionRef}
                aria-label={nextLabel}
                type="button"
              >
                <Icon as={ChevronRight} aria-hidden width="6px" height="10px" color="neutral600" />
              </CarouselAction>
            </>
          )}

          <CarouselSlides aria-live="polite" paddingLeft={2} paddingRight={2} width="100%" overflow="hidden">
            {childrenArray}
          </CarouselSlides>
          {actions}
        </CarouselGrid>

        {secondaryLabel && (
          <Box paddingTop={2} paddingLeft={4} paddingRight={4}>
            <Tooltip label={secondaryLabel}>
              <Flex justifyContent="center">
                <Typography variant="pi" textColor="neutral600" ellipsis>
                  {secondaryLabel}
                </Typography>
              </Flex>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  );
};
