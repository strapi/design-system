import * as React from 'react';

import { CaretDown } from '@strapi/icons';

import { Box } from '../../primitives/Box';
import { Flex } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';

interface SubNavSectionLabelProps {
  ariaControls?: string;
  ariaExpanded?: boolean;
  collapsable?: boolean;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> & React.MouseEventHandler<HTMLDivElement>;
}

const SubNavSectionLabel = ({
  collapsable = false,
  label,
  onClick = () => {},
  ariaExpanded,
  ariaControls,
}: SubNavSectionLabelProps) => {
  if (collapsable) {
    return (
      <Flex
        tag="button"
        onClick={onClick}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        textAlign="left"
        alignItems="center"
      >
        <Box paddingRight={1}>
          <Typography variant="sigma" textColor="neutral600">
            {label}
          </Typography>
        </Box>
        {collapsable && (
          <CaretDown
            width="1.2rem"
            aria-hidden
            fill="neutral500"
            style={{ transform: ariaExpanded ? 'rotateX(0deg)' : 'rotateX(180deg)' }}
          />
        )}
      </Flex>
    );
  }

  return (
    <Flex>
      <Box paddingRight={1}>
        <Typography variant="sigma" textColor="neutral600">
          {label}
        </Typography>
      </Box>
    </Flex>
  );
};

export { SubNavSectionLabel };
export type { SubNavSectionLabelProps };
