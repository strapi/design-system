import React, { Children, cloneElement, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChevronRight from '@strapi/icons/ChevronRight';
import ChevronLeft from '@strapi/icons/ChevronLeft';
import { Icon } from '../Icon';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Flex } from '../Flex';
import { Tooltip } from '../Tooltip';
import { KeyboardKeys } from '../helpers/keyboardKeys';

const CarouselGrid = styled(Box)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'startAction slides endAction';
`;

const CarouselSlides = styled(Box)`
  grid-area: slides;
`;

const CarouselAction = styled.button`
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
}) => {
  const prevActionRef = useRef(null);
  const nextActionRef = useRef(null);

  const childrenArray = Children.toArray(children).map((node, index) =>
    cloneElement(node, { selected: index === selectedSlide }),
  );

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.RIGHT: {
        e.preventDefault();
        nextActionRef.current.focus();
        onNext();
        break;
      }

      case KeyboardKeys.LEFT: {
        e.preventDefault();
        prevActionRef.current.focus();
        onPrevious();
        break;
      }

      default:
        break;
    }
  };

  const hasChildren = childrenArray.length > 1;

  return (
    <Box {...props} onKeyDown={handleKeyDown}>
      <Box padding={2} borderColor="neutral200" hasRadius background="neutral100">
        <CarouselGrid as="section" aria-roledescription="carousel" aria-label={label} position="relative">
          {hasChildren && (
            <CarouselAction
              onClick={onPrevious}
              area="startAction"
              ref={prevActionRef}
              aria-label={previousLabel}
              type="button"
            >
              <Icon as={ChevronLeft} aria-hidden width="6px" height="10px" color="neutral600" />
            </CarouselAction>
          )}

          {hasChildren && (
            <CarouselAction onClick={onNext} area="endAction" ref={nextActionRef} aria-label={nextLabel} type="button">
              <Icon as={ChevronRight} aria-hidden width="6px" height="10px" color="neutral600" />
            </CarouselAction>
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

Carousel.defaultProps = {
  actions: undefined,
  error: undefined,
  hint: undefined,
  required: false,
  secondaryLabel: undefined,
};

Carousel.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  label: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  previousLabel: PropTypes.string.isRequired,
  required: PropTypes.bool,
  secondaryLabel: PropTypes.string,
  selectedSlide: PropTypes.number.isRequired,
};
