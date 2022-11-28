import styled from 'styled-components';

import { Box, BoxProps } from '../Box';
import { Typography } from '../Typography';

const StyledBox = styled(Box)`
  background: ${({ color }) => color};
`;

interface ColorButtonProps extends Pick<BoxProps, 'color'> {
  colorKey: string;
}

export const ColorButton = ({ colorKey, color }: ColorButtonProps) => {
  return (
    <StyledBox color={color} paddingTop={6} paddingLeft={6} hasRadius shadow="popupShadow" borderColor="neutral200">
      <Box background="neutral0" padding={1}>
        <Typography>{colorKey}</Typography>
      </Box>
    </StyledBox>
  );
};
