import styled from 'styled-components';
import { inputFocusStyle } from '../themes/utils';
import { Flex } from '../Flex';

export const JSONInputContainer = styled(Flex)`
  line-height: ${({ theme }) => theme.lineHeights[2]};

  .cm-editor {
    /* 
      Hard coded since the color is the same between themes,
      theme.colors.neutral800 changes between themes 
    */
    background-color: #32324d;
    width: 100%;
    outline: none;
    border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
    /* inputFocusStyle will receive hasError prop */
    ${inputFocusStyle()}
  }

  .cm-editor,
  .cm-scroller {
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  .cm-gutters,
  .cm-activeLineGutter {
    /* 
      Hard coded since the color is the same between themes,
      theme.colors.neutral700 changes between themes 
    */
    background-color: #4a4a6a;
  }
`;
