import * as React from 'react';

import { ChevronRight, ChevronLeft } from '@strapi/icons';
import { styled } from 'styled-components';

import { KeyboardKeys } from '../../helpers/keyboardKeys';
import { Box, BoxComponent, BoxProps } from '../../primitives/Box';
import { Flex, FlexComponent } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';
import { AccessibleIcon } from '../../utilities/AccessibleIcon';
import { Tooltip } from '../Tooltip';

export interface CarouselProps extends BoxProps {
  actions?: React.ReactNode;
  children: React.ReactNode;
  label: string;
  nextLabel: string;
  onNext?: () => void;
  onPrevious?: () => void;
  previousLabel: string;
  secondaryLabel?: string;
  selectedSlide: number;
}

const CarouselGrid = styled<BoxComponent<'section'>>(Box)`
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'startAction slides endAction';
`;

const CarouselSlides = styled<FlexComponent>(Flex)`
  grid-area: slides;
`;

const CarouselAction = styled<BoxComponent<'button'>>(Box)<{ $area: string }>`
  grid-area: ${({ $area }) => $area};

  &:focus svg path,
  &:hover svg path {
    fill: ${({ theme }) => theme.colors.neutral900};
  }
`;

export type CarouselElement = HTMLDivElement;

export const Carousel = React.forwardRef<CarouselElement, CarouselProps>(
  (
    { actions, children, label, nextLabel, onNext, onPrevious, previousLabel, secondaryLabel, selectedSlide, ...props },
    forwardedRef,
  ) => {
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

          if (onNext) {
            onNext();
          }

          break;
        }

        case KeyboardKeys.LEFT: {
          event.preventDefault();

          if (prevActionRef?.current) {
            prevActionRef.current.focus();
          }

          if (onPrevious) {
            onPrevious();
          }
          break;
        }

        default:
          break;
      }
    };

    return (
      <Box ref={forwardedRef} {...props} onKeyDown={handleKeyDown}>
        <Box padding={2} borderColor="neutral200" hasRadius background="neutral100">
          <CarouselGrid
            tag="section"
            aria-roledescription="carousel"
            aria-label={label}
            display="grid"
            position="relative"
          >
            {childrenArray && childrenArray.length > 1 && (
              <>
                <CarouselAction tag="button" onClick={onPrevious} $area="startAction" ref={prevActionRef} type="button">
                  <AccessibleIcon label={previousLabel}>
                    <ChevronLeft width="1.6rem" height="1.6rem" fill="neutral600" />
                  </AccessibleIcon>
                </CarouselAction>

                <CarouselAction tag="button" onClick={onNext} $area="endAction" ref={nextActionRef} type="button">
                  <AccessibleIcon label={nextLabel}>
                    <ChevronRight width="1.6rem" height="1.6rem" fill="neutral600" />
                  </AccessibleIcon>
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
  },
);
