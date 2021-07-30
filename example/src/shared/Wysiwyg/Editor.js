import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';
import EditorWrapper from './EditorWrapper';

const Editor = ({ value, onChange }) => {
    const textareaRef = useRef(null);
    const editor = useRef(null);

    useEffect(() => {
      const handleChange = (doc) => {
        onChange(doc.getValue());
      };

      editor.current = CodeMirror.fromTextArea(textareaRef.current, {
          mode: 'markdown',
          lineWrapping: true
      });

      editor.current.on('change', handleChange)
    }, []);

    //we need to find a solution to control the component
    // useEffect(() => {
    //   editor.current.setValue(value);
    //   editor.current.focus();
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
