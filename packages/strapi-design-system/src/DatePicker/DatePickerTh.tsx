import styled from 'styled-components';

import { Flex } from '../Flex';
import { RawTh, RawThProps } from '../RawTable';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

const DatePickerThWrapper = styled(RawTh)`
  // Trick to prevent the outline from overflowing because of the general outline-offset
  outline-offset: -2px;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-transform: capitalize;
`;

const DatePickerThRow = styled(Flex)`
  height: ${24 / 16}rem;
  width: ${32 / 16}rem;
`;

export interface DatePickerThProps extends Omit<RawThProps, 'children'> {
  children: string;
}

export const DatePickerTh = ({ children, ...props }: DatePickerThProps) => {
  return (
    <DatePickerThWrapper {...props}>
      <DatePickerThRow justifyContent="center">
        <Typography variant="pi" fontWeight="bold" color="neutral800" aria-hidden>
          {children.substr(0, 2)}
        </Typography>

        <VisuallyHidden>
          <span>{children}</span>
        </VisuallyHidden>
      </DatePickerThRow>
    </DatePickerThWrapper>
  );
};
