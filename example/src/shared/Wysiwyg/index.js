import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import WysiwygNav from './WysiwygNav';
import WysiwygFooter from './WysiwygFooter';
import Editor from './Editor';
import { TextButton, Box } from "@strapi/parts";
import { markdownHandler, listHandler, titleHandler } from './utils/utils';


const Wysiwyg = ({ label, placeholder, onChange, value }) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

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
    setVisiblePopover((isVisible) => isVisible ? !isVisible : isVisible);
  }

  return (
    <>
      <TextButton>{label}</TextButton>
      <Box paddingTop={1}>
        <WysiwygNav 
          placeholder={placeholder} 
          onActionClick={handleActionClick}
          visiblePopover={visiblePopover}
          setVisiblePopover={setVisiblePopover}
          isPreviewMode={isPreviewMode}
          setIsPreviewMode={setIsPreviewMode}
        />
        <Editor 
          onChange={onChange} 
          textareaRef={textareaRef}
          editorRef={editorRef}
          isPreviewMode={isPreviewMode}
          value={value}
        />
        <WysiwygFooter 
          isPreviewMode={isPreviewMode}
        />
      </Box>
    </>
  );
};

Wysiwyg.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

export default Wysiwyg;
