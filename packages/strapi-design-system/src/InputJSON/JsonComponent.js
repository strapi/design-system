import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { markField } from './decorationExtension';

const CodeMirror = styled(BaseCodeMirror)`
  height: 100%;
  width: 100%;
  font-size: ${14 / 16}rem;
  line-height: ${20 / 16}rem;

  & > .cm-editor {
    height: 100%;
    border-radius: ${4 / 16}rem; // className prop is not supported in codemirror for themes to work here

    & > .cm-scroller {
      overflow: auto;
      border-radius: ${4 / 16}rem;
    }
  }
`;

export const JsonComponent = ({ id, value, theme, onChange, onCreateEditor, editable }) => {
  return (
    <CodeMirror
      id={id}
      value={value}
      extensions={[json(), markField]}
      theme={theme}
      basicSetup={{
        lineNumbers: true,
        bracketMatching: true,
        closeBrackets: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        highlightSelectionMatches: true,
        tabSize: 2,
        defaultCharacterWidth: 5,
      }}
      onChange={onChange}
      onCreateEditor={onCreateEditor}
      editable={editable}
    />
  );
};

JsonComponent.defaultProps = {
  id: undefined,
  editable: false,
  onChange() {},
  onCreateEditor() {},
};

JsonComponent.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  onCreateEditor: PropTypes.func,
};
