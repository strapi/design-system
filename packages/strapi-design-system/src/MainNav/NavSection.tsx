import React from 'react';

import { useMainNav } from './MainNavContext';
import { Box } from '../Box';
import { Divider } from '../Divider';
import { Flex, FlexProps } from '../Flex';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

export interface NavSectionProps extends FlexProps {
  label: string;
  horizontal?: boolean;

  /**
   * @preserve
   * @deprecated Use gap instead;
   */
  spacing?: FlexProps['gap'];
}

export const NavSection = ({ label, children, spacing = 2, horizontal = false, ...props }: NavSectionProps) => {
  const condensed = useMainNav();

  if (condensed) {
    return (
      <Flex direction="column" alignItems="stretch" gap={2}>
        <Box paddingTop={1} paddingBottom={1} background="neutral0" hasRadius as="span">
          <Divider />

          <VisuallyHidden>
            <span>{label}</span>
          </VisuallyHidden>
        </Box>

        <Flex
          as="ul"
          gap={spacing}
          direction={horizontal ? 'row' : 'column'}
          alignItems={horizontal ? 'center' : 'stretch'}
          {...props}
        >
          {React.Children.map(children, (child, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <li key={index}>{child}</li>;
          })}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" alignItems="stretch" gap={2}>
      <Box paddingTop={1} paddingBottom={1} background="neutral0" paddingRight={3} paddingLeft={3} hasRadius as="span">
        <Typography variant="sigma" textColor="neutral600">
          {label}
        </Typography>
      </Box>

      <Flex
        as="ul"
        gap={spacing}
        direction={horizontal ? 'row' : 'column'}
        alignItems={horizontal ? 'center' : 'stretch'}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={index}>{child}</li>;
        })}
      </Flex>
    </Flex>
  );
};
