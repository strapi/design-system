import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';

import EditorWrapper from './EditorWrapper';
import newlineAndIndentContinueMarkdownList from './utils/continueList';
import { replaceText, insertText, insertListOrTitle } from './utils/utils';

const Editor = (
  {value, 
  onChange, 
  listType,
  setListType,
  markdownType,
  setMarkdownType,
  titleType,
  setTitleType
  }) => {

  const textareaRef = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    editor.current = CodeMirror.fromTextArea(textareaRef.current, {
      lineWrapping: true,
      extraKeys: {'Enter': 'newlineAndIndentContinueMarkdownList'}
    });

    CodeMirror.commands.newlineAndIndentContinueMarkdownList = newlineAndIndentContinueMarkdownList;
    editor.current.on('change', doc => onChange(doc.getValue()));
  }, []);

  // useEffect(() => {
  //   setNavbarClick(() => markdown => handleNavbarClick(markdown));
  // }, [setNavbarClick]);

  // const handleNavbarClick = markdown => {
  //   what to do when markdown action click happens
  // }

  useEffect(() => {
    if(!titleType) return;

    let {line : currentLine} = editor.current.getCursor();
    const titleToInsert = insertListOrTitle(titleType);
    const lineContent = editor.current.getLine(currentLine);

    const textToInsert = titleToInsert + lineContent;
    editor.current.setSelection(
      { line: currentLine, ch: 0 },
      { line: currentLine, ch: lineContent.length }
    );
    editor.current.replaceSelection(textToInsert);
    editor.current.focus();

    setTitleType(null);
  }, [titleType, setTitleType])

  useEffect(() => {
    if(!listType) return;

    let {line : currentLine} = editor.current.getCursor();
    const listToInsert = insertListOrTitle(listType);
    const lineContent = editor.current.getLine(currentLine);

    const textToInsert = listToInsert + lineContent;
    editor.current.setSelection(
      { line: currentLine, ch: 0 },
      { line: currentLine, ch: lineContent.length }
    );
    editor.current.replaceSelection(textToInsert);
    editor.current.focus();

    // set listType to empty to able another list click of the same type
    setListType(null);
  }, [listType, setListType]);

  useEffect(() => {
    if(!markdownType) return;

    const textToEdit = editor.current.getSelection();
    let textToInsert;

    if (textToEdit) {
      const editedText = replaceText(markdownType, textToEdit);
      //create 1 function to replace and focus?
      editor.current.replaceSelection(editedText);
      editor.current.focus();

    } else {
    
      textToInsert = insertText(markdownType);
      //create 1 function to replace and focus?
      editor.current.replaceSelection(textToInsert.editedText);
      editor.current.focus();

      //set selection-focus to text to replace with content
      const { line, ch } = editor.current.getCursor();
      const endSelection = ch - textToInsert.selection.end;
      const startSelection = ch - textToInsert.selection.end - textToInsert.selection.start;

      editor.current.setSelection(
        { line, ch: startSelection },
        { line, ch: endSelection }
      );
    }

    //set markdownType to empty to able another markdown click of the same type
    setMarkdownType(null)
  }, [markdownType, setMarkdownType])

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
