import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BaseLink } from '../BaseLink';
import { FolderCardContext } from './FolderCardContext';
import Folder from '@strapi/icons/Folder';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { useId } from '../helpers/useId';

const LinkWrapper = styled(BaseLink)`
  height: 100%;
  left: 0;
  position: absolute;
  opacity: 0;
  top: 0;
  width: 100%;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const StyledFolder = styled(Folder)`
  path {
    fill: currentColor;
  }
`;

export const FolderCard = ({ children, id, startAction, ariaLabel, href, ...props }) => {
  const generatedId = useId('folder-card', id);

  return (
    <FolderCardContext.Provider value={{ id: generatedId }}>
      <Box position="relative" {...props}>
        <LinkWrapper
          href={href}
          textDecoration="none"
          onClick={(event) => event.preventDefault()}
          onDoubleClick={() => console.log('navigate to?', href)}
          zIndex={1}
          tabIndex={-1}
          aria-label={ariaLabel}
          aria-hidden
        />

        <Stack
          hasRadius
          background="neutral0"
          shadow="tableShadow"
          paddingBottom={3}
          paddingLeft={4}
          paddingRight={4}
          paddingTop={3}
          spacing={3}
          horizontal
          cursor="pointer"
        >
          {startAction}

          <Box
            hasRadius
            background="secondary100"
            color="secondary500"
            paddingBottom={2}
            paddingLeft={3}
            paddingRight={3}
            paddingTop={2}
          >
            <StyledFolder />
          </Box>

          {children}
        </Stack>
      </Box>
    </FolderCardContext.Provider>
  );
};

FolderCard.displayName = 'FolderCard';

FolderCard.defaultProps = {
  id: undefined,
  startAction: undefined,
};

FolderCard.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  id: PropTypes.string,
  startAction: PropTypes.element.isRequired,
};
