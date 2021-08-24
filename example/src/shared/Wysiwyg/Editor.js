import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

import EditorWrapper from './EditorWrapper';
import { EditorAndPreviewWrapper } from './WysiwygStyles';
import PreviewWysiwyg from './../PreviewWysiwyg';
import newlineAndIndentContinueMarkdownList from './utils/continueList';

const Editor = ({
    onChange, 
    textareaRef,
    editorRef,
    isPreviewMode,
    value
  }) => {
  
  useEffect(() => {
    editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
      lineWrapping: true,
      extraKeys: {'Enter': 'newlineAndIndentContinueMarkdownList'},
      readOnly: false
    });
    
    if(value) editorRef.current.setValue(value);

    CodeMirror.commands.newlineAndIndentContinueMarkdownList = newlineAndIndentContinueMarkdownList;
    editorRef.current.on('change', doc => onChange(doc.getValue()));
  }, [editorRef, textareaRef]);

  useEffect(() => {
    if(isPreviewMode) {
      editorRef.current.setOption('readOnly', 'nocursor');
    } else {
      editorRef.current.setOption('readOnly', false);
    }
  }, [isPreviewMode])

  return (
    <EditorAndPreviewWrapper>
      <EditorWrapper>
        <textarea ref={textareaRef}></textarea>
      </EditorWrapper>
      {isPreviewMode &&
        <PreviewWysiwyg data={value}/>
      }
    </EditorAndPreviewWrapper>
  )
};

Editor.propTypes = {
  onChange: PropTypes.func,
  textareaRef: PropTypes.shape({ current: PropTypes.any }),
  editorRef: PropTypes.shape({ current: PropTypes.any }),
};

export default Editor;
