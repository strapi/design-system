import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WysiwygNav from './WysiwygNav';
import WysiwygFooter from './WysiwygFooter';
import Editor from './Editor';
import { TextButton, Box } from "@strapi/parts";


const Wysiwyg = ({ label, placeholder, value, onChange }) => {
  const [markdownType, setMarkdownType] = useState(null);
  const [listType, setListType] = useState(null);
  const [titleType, setTitleType] = useState(null);

  // const [navbarClick, setNavbarClick] = useState(null);

  return (
    <>
      <TextButton>{label}</TextButton>
      <Box paddingTop={1}>
        <WysiwygNav 
          placeholder={placeholder} 
          setListType={setListType}
          setMarkdownType={setMarkdownType}
          setTitleType={setTitleType}
          // navbarClick={navbarClick}
        />
        <Editor 
          value={value || ''} 
          onChange={modifiedData => onChange(modifiedData)} 
          listType={listType}
          setListType={setListType}
          markdownType={markdownType}
          setMarkdownType={setMarkdownType}
          titleType={titleType}
          setTitleType={setTitleType}
          // setNavbarClick={setNavbarClick}
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
