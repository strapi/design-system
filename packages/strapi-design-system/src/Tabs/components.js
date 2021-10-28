import styled from 'styled-components';
import { Box } from '../Box';
import { Flex } from '../Flex';

/** Simple variant */
export const SimpleTabBox = styled(Box)`
  border-bottom: 2px solid
    ${({ theme, selected, hasError }) => {
      if (selected) {
        if (hasError) {
          return theme.colors.danger600;
        }

        return theme.colors.primary600;
      }

      return 'transparent';
    }};
`;

/** Default variant */
export const DefaultTabBox = styled(Box)`
  border-bottom: 1px solid ${({ theme, selected }) => (selected ? theme.colors.neutral0 : theme.colors.neutral150)};
`;

export const DefaultTabButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;

  & + & > ${DefaultTabBox} {
    border-left: 1px solid ${({ theme }) => theme.colors.neutral150};
  }

  ${DefaultTabBox} {
    border-right: ${({ theme, showRightBorder }) =>
      showRightBorder ? `1px solid ${theme.colors.neutral150}` : 'none'};
  }

  // Hack preventing the outline from being overflow by the following tab
  outline-offset: -2px;

  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;

export const DefaultTabsRow = styled(Flex)`
  & > * {
    flex: 1;
  }

  & ${DefaultTabButton}:first-of-type ${DefaultTabBox} {
    border-radius: ${({ theme }) => `${theme.borderRadius} 0 0 0`};
  }

  & ${DefaultTabButton}:last-of-type ${DefaultTabBox} {
    border-radius: ${({ theme }) => `0 ${theme.borderRadius} 0 0`};
  }

  & ${DefaultTabButton}[aria-selected="true"] ${DefaultTabBox} {
    border-radius: ${({ theme }) => `${theme.borderRadius} ${theme.borderRadius} 0 0`};
    border-left: none;
    border-right: none;
  }
`;
