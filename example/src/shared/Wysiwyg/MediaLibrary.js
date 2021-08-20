import React from 'react';
import PropTypes from 'prop-types';
import { ModalLayout, ModalHeader, ModalBody, ModalFooter } from '@strapi/parts/ModalLayout';
import { Text, Button } from "@strapi/parts";

const image = [{alt: 'sunrise', url: 'http://localhost:3000/sunriseimage'}, {alt: 'sunset', url: 'http://localhost:3000/sunsetimage'}]

const MediaLibrary = ({ onToggle, onSubmitImage }) => {
  return (
    <ModalLayout onClose={onToggle} labelledBy="media-library" id="media-library">    
      <ModalHeader>
        <Text>Media Library</Text>
      </ModalHeader>
      <ModalBody>
        <Text>Choose your picture 🔥</Text>
      </ModalBody>
      <ModalFooter 
        startActions={<Button onClick={onToggle} variant="tertiary">Cancel</Button>} 
        endActions={<Button id="insert-button" onClick={() => onSubmitImage(image)}>Insert</Button>} 
      />
    </ModalLayout>
  )
};

MediaLibrary.propTypes = {
  onToggle: PropTypes.func,
  onSubmitImage: PropTypes.func
};

export default MediaLibrary;
