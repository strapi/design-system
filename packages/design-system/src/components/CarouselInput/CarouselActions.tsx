import { Flex, FlexProps } from '../../primitives/Flex';

export interface CarouselActionsProps extends FlexProps {
  horizontal?: boolean;
}

export const CarouselActions = ({ horizontal = true, ...props }: CarouselActionsProps) => (
  <Flex
    justifyContent="center"
    direction={horizontal ? 'row' : 'column'}
    alignItems={horizontal ? 'center' : 'stretch'}
    position="absolute"
    width="100%"
    bottom={1}
    gap={1}
    {...props}
  />
);
