import { styled } from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';
export interface CarouselSlideProps extends FlexProps {
  children: React.ReactNode;
  label: string;
  selected?: boolean;
}

const CarouselSlideFlex = styled<FlexComponent>(Flex)<{ $selected: boolean }>`
  display: ${({ $selected }) => ($selected ? 'flex' : 'none')};
`;

export const CarouselSlide = ({ label, children, selected = false, ...props }: CarouselSlideProps) => (
  <CarouselSlideFlex
    $selected={selected}
    alignItems="center"
    role="group"
    aria-roledescription="slide"
    aria-label={label}
    justifyContent="center"
    height="124px"
    width="100%"
    {...props}
  >
    {children}
  </CarouselSlideFlex>
);
