import React, { Children, cloneElement, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NextFilterIcon from '@strapi/icons/NextFilter';
import BackFilterIcon from '@strapi/icons/BackFilter';
import { Box } from '../Box';
import { Text } from '../Text';
import { KeyboardKeys } from '../helpers/keyboardKeys';

const CarouselGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'startAction slides endAction';
  position: relative;
`;

const CarouselSlides = styled(Box)`
  width: 100%;
  grid-area: slides;
`;

const CarouselAction = styled.button`
  grid-area: ${({ area }) => area};

  svg {
    width: ${6 / 16}rem;
    height: ${10 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }

  &:focus svg path,
  &:hover svg path {
    fill: ${({ theme }) => theme.colors.neutral900};
  }
`;

export const Carousel = ({
  label,
  children,
  previousLabel,
  nextLabel,
  selectedSlide,
  onPrevious,
  onNext,
  actions,
  hint,
  error,
  ...props
}) => {
  const prevActionRef = useRef(null);
  const nextActionRef = useRef(null);

  const childrenArray = Children.toArray(children).map((node, index) =>
    cloneElement(node, { selected: index === selectedSlide }),
  );

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.ARROW_RIGHT: {
        e.preventDefault();
        nextActionRef.current.focus();
        onNext();
        break;
      }

      case KeyboardKeys.ARROW_LEFT: {
        e.preventDefault();
        prevActionRef.current.focus();
        onPrevious();
        break;
      }

      default:
        break;
    }
  };

  return (
    <div {...props} onKeyDown={handleKeyDown}>
      <Box paddingBottom={1}>
        <Text textColor="neutral800" small highlighted>
          {label}
        </Text>
      </Box>
      <Box padding={2} borderColor="neutral200" hasRadius background="neutral100">
        <CarouselGrid as="section" aria-roledescription="carousel" aria-label={label}>
          <CarouselAction onClick={onPrevious} area="startAction" ref={prevActionRef} aria-label={previousLabel}>
            <BackFilterIcon aria-hidden={true} />
          </CarouselAction>

          <CarouselAction onClick={onNext} area="endAction" ref={nextActionRef} aria-label={nextLabel}>
            <NextFilterIcon aria-hidden={true} />
          </CarouselAction>

          <CarouselSlides aria-live="polite" paddingLeft={2} paddingRight={2}>
            {childrenArray}
          </CarouselSlides>
          {actions}
        </CarouselGrid>
      </Box>
      {hint || error ? (
        <Box paddingTop={1}>
          <Text small={true} textColor={error ? 'danger600' : 'neutral600'}>
            {hint || error}
          </Text>
        </Box>
      ) : null}
    </div>
  );
};

Carousel.defaultProps = {
  actions: undefined,
  error: undefined,
  hint: undefined,
};

Carousel.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  previousLabel: PropTypes.string.isRequired,
  selectedSlide: PropTypes.number.isRequired,
};
