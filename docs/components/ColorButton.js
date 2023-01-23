import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Typography } from '@strapi/design-system';

const StyledBox = styled(Box)`
  background: ${({ color }) => color};
`;

export const ColorButton = ({ colorKey, color }) => {
  return (
    <StyledBox color={color} paddingTop={6} paddingLeft={6} hasRadius shadow="popupShadow" borderColor="neutral200">
      <Box background="neutral0" padding={1}>
        <Typography>{colorKey}</Typography>
      </Box>
    </StyledBox>
  );
};

ColorButton.propTypes = {
  color: PropTypes.string.isRequired,
  colorKey: PropTypes.string.isRequired,
};
