import { Flex } from '../Flex';

interface ActionLayoutProps {
  endActions?: React.ReactNode;
  startActions?: React.ReactNode;
}

export const ActionLayout = ({ startActions, endActions }: ActionLayoutProps) => {
  if (!startActions && !endActions) {
    return null;
  }

  return (
    <Flex justifyContent="space-between" alignItems="flex-start" paddingBottom={4} paddingLeft={10} paddingRight={10}>
      <Flex gap={2} wrap="wrap">
        {startActions}
      </Flex>

      <Flex gap={2} shrink={0} wrap="wrap">
        {endActions}
      </Flex>
    </Flex>
  );
};
