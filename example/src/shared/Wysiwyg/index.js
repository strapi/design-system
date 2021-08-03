import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import WysiwygNav from './WysiwygNav';
import WysiwygFooter from './WysiwygFooter';
import Editor from './Editor';
import { TextButton, Box } from "@strapi/parts";
import { markdownHandler, listHandler, titleHandler } from './utils/utils';


const Wysiwyg = ({ label, placeholder, value, onChange }) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  const handleActionClick = value => {
    switch (value) {
      case "Bold":
      case "Code":
      case "Italic":
      case "Image":
      case "Link":
      case "alt":
      case "Strikethrough":
      case "Underline":
      case "Quote": {
        markdownHandler(editorRef, value);
        break;
      }
      case "BulletList":
      case "NumberList": {
        listHandler(editorRef, value);
        break;
      }
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        titleHandler(editorRef, value);
        break;
      }
      default:
        return;
    }
  }

  return (
    <>
      <TextButton>{label}</TextButton>
      <Box paddingTop={1}>
        <WysiwygNav 
          placeholder={placeholder} 
          onActionClick={handleActionClick}
        />
        <Editor 
          value={value || ''} 
          onChange={modifiedData => onChange(modifiedData)} 
          textareaRef={textareaRef}
          editorRef={editorRef}
        />
        <WysiwygFooter />
      </Box>
    </>
  );
};

Wysiwyg.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default Wysiwyg;
