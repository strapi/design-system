import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import WysiwygNav from './WysiwygNav';
import WysiwygFooter from './WysiwygFooter';
import MediaLibrary from './MediaLibrary';
import Editor from './Editor';
import { TextButton, Box } from "@strapi/parts";
import { markdownHandler, listHandler, titleHandler, insertImage } from './utils/utils';


const Wysiwyg = ({ label, placeholder, onChange, value }) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const handleToggleMediaLib = () => setMediaLibVisible(prev => !prev);
  const handleTogglePopover = () => setVisiblePopover(prev => !prev);
  const handleTogglePreviewMode = () => setIsPreviewMode(prev => !prev);

  const handleActionClick = value => {
    switch (value) {
      case "Code":
      case "Link":
      case "Strikethrough":
      case "Quote": {
        markdownHandler(editorRef, value);
        handleTogglePopover();
        break;
      }
      case "Bold":
      case "Italic":
      case "Underline": {
        markdownHandler(editorRef, value);
        break;
      }
      case "BulletList":
      case "NumberList": {
        listHandler(editorRef, value);
        handleTogglePopover();
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
  };

  const handleSubmitImage = (files) => {
    handleToggleMediaLib();
    handleTogglePopover();
    insertImage(editorRef, files);
  }

  return (
    <>
      <TextButton>{label}</TextButton>
      <Box paddingTop={1}>
        <WysiwygNav 
          placeholder={placeholder} 
          onActionClick={handleActionClick}
          visiblePopover={visiblePopover}
          onTogglePopover={handleTogglePopover}
          isPreviewMode={isPreviewMode}
          onTogglePreviewMode={handleTogglePreviewMode}
          onToggleMediaLib={handleToggleMediaLib}
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
      {mediaLibVisible &&
        <MediaLibrary onToggle={handleToggleMediaLib} onSubmitImage={handleSubmitImage}/>    
      }
    </>
  );
};

Wysiwyg.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default Wysiwyg;
