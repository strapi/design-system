import styled from 'styled-components';

import { IconButton, Box, BaseButton, IconButtonGroup } from "@strapi/parts";

//NAV BUTTONS
export const CustomIconButton = styled(IconButton)`
  padding: ${({ theme }) => theme.spaces[2]};
  svg {
    width: ${18/16}rem;
    height: ${18/16}rem;
  }
`;

export const MainButtons = styled(IconButtonGroup)`
  margin-left: ${({ theme }) => theme.spaces[4]};
`;

export const MoreButton = styled(IconButton)`
  margin: ${({ theme }) => `0 ${theme.spaces[2]}`};
  padding: ${({ theme }) => theme.spaces[2]};

  svg {
    width: ${18/16}rem;
    height: ${18/16}rem;
  };
`;


// NAV

export const NavWrapper = styled(Box)`
  border: ${({ theme }) => `1px solid ${theme.colors.neutral200}`};
  border-radius: ${({ theme }) => `${theme.spaces[1]} ${theme.spaces[1]} 0 0`};
  border-bottom: 0;
`;

export const IconButtonGroupMargin = styled(IconButtonGroup)`
  margin-right: ${({ theme }) => `${theme.spaces[2]}`};
`;

//EDITOR && PREVIEW

export const EditorAndPreviewWrapper = styled.div`
  position: relative;
`;

// FOOTER

export const FooterWrapper = styled(Box)`
  border-radius: 0 0 4px 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.neutral200}`};
  border-top: 0;
`;

export const ExpandButton = styled(BaseButton)`
  background-color: transparent;
  border: none;
  align-items: center;

  svg {
    margin-left: ${({ theme }) => `${theme.spaces[2]}`};
    path {
      fill: ${({ theme }) => theme.colors.neutral700}};
      width: ${12/16}rem;
      height: ${12/16}rem;
    };
  };
`;