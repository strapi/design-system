import { CarretDown } from '@strapi/icons';
import styled from 'styled-components';

import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

export interface SubNavSectionLabelProps {
  ariaControls: string;
  ariaExpanded: boolean;
  collapsable?: boolean;
  label: string;
  onClick?: React.MouseEventHandler;
}

// TODO: these could be props
const SubNavSectionLabelWrapper = styled(Flex)`
  border: none;
  padding: 0;
  background: transparent;
`;

// TODO: these could be props
const DropDownIconWrapper = styled.div<{ rotated?: boolean }>`
  display: flex;
  align-items: center;
  transform: rotateX(${({ rotated }) => (rotated ? '0deg' : '180deg')});
`;

export const SubNavSectionLabel = ({
  collapsable = false,
  label,
  onClick = () => {},
  ariaExpanded,
  ariaControls,
}: SubNavSectionLabelProps) => {
  if (collapsable) {
    return (
      <SubNavSectionLabelWrapper
        as="button"
        onClick={onClick}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        textAlign="left"
      >
        <Box paddingRight={1}>
          <Typography variant="sigma" textColor="neutral600">
            {label}
          </Typography>
        </Box>
        {collapsable && (
          <DropDownIconWrapper rotated={ariaExpanded}>
            <CarretDown aria-hidden />
          </DropDownIconWrapper>
        )}
      </SubNavSectionLabelWrapper>
    );
  }

  return (
    <SubNavSectionLabelWrapper>
      <Box paddingRight={1}>
        <Typography variant="sigma" textColor="neutral600">
          {label}
        </Typography>
      </Box>
    </SubNavSectionLabelWrapper>
  );
};
