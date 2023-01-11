import styled from 'styled-components';
import { inputFocusStyle } from '../themes/utils';
import { Flex } from '../Flex';

export const JSONInputContainer = styled(Flex)`
  line-height: ${({ theme }) => theme.lineHeights[2]};
  // inputFocusStyle will receive hasError prop
  ${inputFocusStyle()}

  .cm-editor {
    /* 
      Hard coded since the color is the same between themes,
      theme.colors.neutral800 changes between themes 
    */
    width: 100%;
    background-color: #32324d;
  }

  .cm-gutters,
  .cm-activeLineGutter {
    /* 
      Hard coded since the color is the same between themes,
      theme.colors.neutral700 changes between themes 
    */
    background-color: #4a4a6a;
  }

  & > .cm-editor {
    outline: none;
    border-radius: ${({ theme }) => theme.borderRadius};

    & > .cm-scroller {
      overflow: auto;
      border-radius: ${({ theme }) => theme.borderRadius};
    }
  }
`;
