import React, { useEffect, useRef } from 'react';
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

  const initialValueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  
  useEffect(() => {
    editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
      lineWrapping: true,
      extraKeys: {
        'Enter': 'newlineAndIndentContinueMarkdownList',
        'Tab': false,
        'Shift-Tab': false
      },
      readOnly: false
    });
    
    if (initialValueRef.current) { 
      editorRef.current.setValue(initialValueRef.current); 
    };

    CodeMirror.commands.newlineAndIndentContinueMarkdownList = newlineAndIndentContinueMarkdownList;
    editorRef.current.on('change', doc => onChangeRef.current(doc.getValue()));
  }, [editorRef, textareaRef]);

  useEffect(() => {
    if(isPreviewMode) {
      editorRef.current.setOption('readOnly', 'nocursor');
    } else {
      editorRef.current.setOption('readOnly', false);
    }
  }, [isPreviewMode, editorRef])

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

Editor.defaultProps = {
  onChange: () => {},
  isPreviewMode: false,
  value: ''
};

Editor.propTypes = {
  onChange: PropTypes.func,
  textareaRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  editorRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  isPreviewMode: PropTypes.bool,
  value: PropTypes.string
};

export default Editor;
