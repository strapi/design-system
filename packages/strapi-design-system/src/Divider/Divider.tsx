import styled from 'styled-components';

import { Box, BoxProps } from '../Box';

export interface DividerProps extends Omit<BoxProps<'hr'>, 'as' | 'background'> {
  /**
   * @preserve
   * @deprecated use `margin` style props instead
   */
  unsetMargin?: boolean;
}

const DividerWrapper = styled(Box)<DividerProps>`
  height: 1px;
  border: none;
  /* If contained in a Flex parent we want to prevent the Divider to shink */
  flex-shrink: 0;
  ${({ unsetMargin }) => (unsetMargin ? 'margin: 0;' : '')}
`;

export const Divider = ({ unsetMargin = true, ...props }: DividerProps) => {
  return <DividerWrapper {...props} background="neutral150" as="hr" unsetMargin={unsetMargin} />;
};
