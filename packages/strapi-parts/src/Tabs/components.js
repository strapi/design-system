import styled from 'styled-components';
import { Box } from '../Box';
import { Row } from '../Row';

/** Simple variant */
export const SimpleTabBox = styled(Box)`
  border-bottom: 2px solid
    ${({ theme, selected, hasError }) =>
      hasError ? theme.colors.danger600 : selected ? theme.colors.primary600 : 'transparent'};
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

  // Hack preventing the outline from being overflow by the following tab
  outline-offset: -2px;
`;

export const DefaultTabsRow = styled(Row)`
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
  }
`;
