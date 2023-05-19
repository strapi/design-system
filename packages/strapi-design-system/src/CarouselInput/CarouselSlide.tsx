import { Flex, FlexProps } from '../Flex';

export interface CarouselSlideProps extends FlexProps {
  children: React.ReactNode;
  label: string;
  selected?: boolean;
}

export const CarouselSlide = ({ label, children, selected = false, ...props }: CarouselSlideProps) => (
  <Flex
    display={selected ? 'flex' : 'none'}
    role="group"
    aria-roledescription="slide"
    aria-label={label}
    justifyContent="center"
    height="124px"
    {...props}
  >
    {children}
  </Flex>
);
