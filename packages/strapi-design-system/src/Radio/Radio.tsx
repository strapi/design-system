import { BaseRadio, BaseRadioProps } from '../BaseRadio/BaseRadio';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

export interface RadioProps extends BaseRadioProps {
  children: React.ReactNode;
}

export const Radio = ({ children, ...props }: RadioProps) => {
  return (
    <Flex alignItems="center" as="label" gap={2}>
      <BaseRadio {...props} />
      <Typography textColor="neutral800">{children}</Typography>
    </Flex>
  );
};
