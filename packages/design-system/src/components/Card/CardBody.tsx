import { Box } from '../../primitives/Box';
import { Flex, FlexProps } from '../../primitives/Flex';

export type CardBodyProps = FlexProps;

export const CardBody = (props: CardBodyProps) => {
  return (
    <Box paddingLeft={3} paddingRight={3} paddingTop={2} paddingBottom={2}>
      <Flex {...props} alignItems="flex-start" />
    </Box>
  );
};
