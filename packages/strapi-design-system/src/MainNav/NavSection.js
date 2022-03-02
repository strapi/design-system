import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Stack } from '../Stack';
import { useMainNav } from './MainNavContext';
import { VisuallyHidden } from '../VisuallyHidden';
import { Divider } from '../Divider';

export const NavSection = ({ label, children, ...props }) => {
  const condensed = useMainNav();

  if (condensed) {
    return (
      <Stack spacing={2}>
        <Box paddingTop={1} paddingBottom={1} background="neutral0" hasRadius as="span">
          <Divider />

          <VisuallyHidden>
            <span>{label}</span>
          </VisuallyHidden>
        </Box>

        <Stack as="ul" spacing={2} {...props}>
          {Children.map(children, (child, index) => {
            return <li key={index}>{child}</li>;
          })}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <Box paddingTop={1} paddingBottom={1} background="neutral0" paddingRight={3} paddingLeft={3} hasRadius as="span">
        <Typography variant="sigma" textColor="neutral600">
          {label}
        </Typography>
      </Box>

      <Stack as="ul" spacing={2} {...props}>
        {Children.map(children, (child, index) => {
          return <li key={index}>{child}</li>;
        })}
      </Stack>
    </Stack>
  );
};

NavSection.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};
