import styled from 'styled-components';

import { Box, BoxProps } from '../Box';

export interface MainProps extends BoxProps<'main'> {
  labelledBy?: string | undefined;
}

const MainWrapper = styled(Box)`
  // To prevent global outline on focus visible to force an outline when Main is focused
  &:focus-visible {
    outline: none;
  }
`;

export const Main = ({ labelledBy = 'main-content-title', ...props }: MainProps) => {
  return <MainWrapper aria-labelledby={labelledBy} as="main" id="main-content" tabIndex={-1} {...props} />;
};
