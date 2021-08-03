import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';

import EditorWrapper from './EditorWrapper';
import newlineAndIndentContinueMarkdownList from './utils/continueList';

const Editor = (
  {value, 
  onChange, 
  textareaRef,
  editorRef
  }) => {

  useEffect(() => {
    editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
      lineWrapping: true,
      extraKeys: {'Enter': 'newlineAndIndentContinueMarkdownList'}
    });

    CodeMirror.commands.newlineAndIndentContinueMarkdownList = newlineAndIndentContinueMarkdownList;
    editorRef.current.on('change', doc => onChange(doc.getValue()));
  }, [editorRef, textareaRef]);

  // useEffect(() => {
  //   //we need to find a solution to control the component
  //   editorRef.current.setValue(value);
  //   editorRef.current.focus();
  // }, [value])

  return (
      <EditorWrapper>
          <textarea ref={textareaRef}></textarea>
      </EditorWrapper>
  )
};

Editor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Editor;
