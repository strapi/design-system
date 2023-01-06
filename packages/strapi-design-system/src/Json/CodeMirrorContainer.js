import styled from 'styled-components';
import { Box } from '../Box';

export const CodeMirrorContainer = styled(Box)`
  height: 100%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: ${({ theme }) => theme.lineHeights[2]};

  .cm-editor {
    /* 
      Hard coded since the color is the same between themes,
      theme.colors.neutral800 changes between themes 
    */
    background-color: #32324d;
    outline: 1px solid ${({ theme, error }) => (error ? theme.colors.danger600 : 'transparent')};
  }

  .cm-gutters,
  .cm-activeLineGutter {
    /* 
      Hard coded since the color is the same between themes,
      theme.colors.neutral700 changes between themes 
    */
    background-color: #4a4a6a;
  }

  .cm-editor.cm-focused {
    outline: none;
    box-shadow: ${({ theme, error }) => (error ? `${theme.colors.danger600} 0px 0px 0px 2px;` : 'none')};
  }

  & > .cm-editor {
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};

    & > .cm-scroller {
      overflow: auto;
      border-radius: ${({ theme }) => theme.borderRadius};
    }
  }
`;
