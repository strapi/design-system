import { styled } from 'styled-components';

import { PropsToTransientProps } from '../../types';
import { Box, BoxComponent, BoxProps } from '../Box';

export interface DividerProps extends Omit<BoxProps<'hr'>, 'as' | 'background'> {}

const DividerWrapper = styled<BoxComponent<'hr'>>(Box)<PropsToTransientProps<DividerProps>>`
  height: 1px;
  border: none;
  /* If contained in a Flex parent we want to prevent the Divider to shink */
  flex-shrink: 0;
`;

export const Divider = (props: DividerProps) => {
  return <DividerWrapper {...props} background="neutral150" tag="hr" />;
};
