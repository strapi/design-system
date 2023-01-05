import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCodeMirror } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { markField } from './utils/decorationExtension';
import { Box } from '../Box';

const CodeMirrorContainer = styled(Box)`
  height: 100%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: ${({ theme }) => theme.lineHeights[2]};

  & > .cm-editor {
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};

    & > .cm-scroller {
      overflow: auto;
      border-radius: ${({ theme }) => theme.borderRadius};
    }
  }

  .ͼ1.cm-editor.cm-focused {
    outline: none;
  }
`;

export const JsonInputContainer = ({ id, value, theme, onChange, onCreateEditor, editable }) => {
  const editor = useRef();
  const { setContainer } = useCodeMirror({
    theme,
    value,
    onChange,
    editable,
    onCreateEditor,
    container: editor.current,
    extensions: [json(), markField],
    basicSetup: {
      lineNumbers: true,
      bracketMatching: true,
      closeBrackets: true,
      indentOnInput: true,
      syntaxHighlighting: true,
      highlightSelectionMatches: true,
      tabSize: 2,
      defaultCharacterWidth: 5,
    },
  });

  useEffect(() => {
    const currentEditor = editor.current;

    if (currentEditor) {
      setContainer(editor.current);
    }
  }, [setContainer]);

  return <CodeMirrorContainer id={id} ref={editor} />;
};

JsonInputContainer.defaultProps = {
  id: undefined,
  editable: false,
  value: '',
  onChange() {},
  onCreateEditor() {},
};

JsonInputContainer.propTypes = {
  theme: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  onCreateEditor: PropTypes.func,
};
