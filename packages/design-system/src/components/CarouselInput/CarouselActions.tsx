import { Flex, FlexProps } from '../Flex';

export interface CarouselActionsProps extends FlexProps {
  horizontal?: boolean;

  /**
   * @preserve
   * @deprecated use `gap` instead
   */
  spacing?: FlexProps['gap'];
}

export const CarouselActions = ({ horizontal = true, spacing = 1, ...props }: CarouselActionsProps) => (
  <Flex
    justifyContent="center"
    gap={spacing}
    direction={horizontal ? 'row' : 'column'}
    alignItems={horizontal ? 'center' : 'stretch'}
    position="absolute"
    width="100%"
    bottom={1}
    {...props}
  />
);
