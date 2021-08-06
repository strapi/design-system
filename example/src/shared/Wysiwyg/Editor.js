import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

import EditorWrapper from './EditorWrapper';
import newlineAndIndentContinueMarkdownList from './utils/continueList';

const Editor = (
  {
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

  return (
      <EditorWrapper>
          <textarea ref={textareaRef}></textarea>
      </EditorWrapper>
  )
};

Editor.propTypes = {
  onChange: PropTypes.func,
  textareaRef: PropTypes.shape({ current: PropTypes.any }),
  editorRef: PropTypes.shape({ current: PropTypes.any }),
};

export default Editor;
