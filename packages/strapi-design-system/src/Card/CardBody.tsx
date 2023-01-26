import { Flex, FlexProps } from '../Flex';
import { Box } from '../Box';

export type CardBodyProps = FlexProps;

export const CardBody = (props: CardBodyProps) => {
  return (
    <Box paddingLeft={3} paddingRight={3} paddingTop={2} paddingBottom={2}>
      <Flex {...props} alignItems="flex-start" />
    </Box>
  );
};
