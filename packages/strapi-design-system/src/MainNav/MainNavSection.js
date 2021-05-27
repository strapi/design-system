import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { TableLabel } from '../Text';
import { Stack } from '../Stack';
import { useMainNav } from './MainNavContext';
import { VisuallyHidden } from '../VisuallyHidden';
import { Divider } from '../Divider';

export const MainNavSection = ({ label, ...props }) => {
  const condensed = useMainNav();

  if (condensed) {
    return (
      <Box as="li">
        <Stack size={2}>
          <Box paddingTop={1} paddingBottom={1} background="neutral0" hasRadius as="span">
            <Divider />

            <VisuallyHidden>
              <span>{label}</span>
            </VisuallyHidden>
          </Box>

          <Stack as="ul" size={2} {...props}></Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="li">
      <Stack size={2}>
        <Box
          paddingTop={1}
          paddingBottom={1}
          background="neutral0"
          paddingRight={3}
          paddingLeft={3}
          hasRadius
          as="span"
        >
          <TableLabel as="span" textColor="neutral600">
            {label}
          </TableLabel>
        </Box>

        <Stack as="ul" size={2} {...props}></Stack>
      </Stack>
    </Box>
  );
};

MainNavSection.propTypes = {
  label: PropTypes.string.isRequired,
};
