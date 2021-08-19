import React from 'react';
import { ModalLayout, ModalHeader, ModalBody, ModalFooter } from '@strapi/parts/ModalLayout';
import { Text, Button } from "@strapi/parts";

const image = [{alt: 'sunrise', url: 'http://localhost:3000/sunriseimage'}, {alt: 'sunset', url: 'http://localhost:3000/sunsetimage'}]

const MediaLibrary = ({ setMediaLibVisible, handleSubmitImage }) => {
  return (
    <ModalLayout onClose={() => setMediaLibVisible(prev => !prev)} labelledBy="media-library">    
      <ModalHeader>
        <Text>Media Library</Text>
      </ModalHeader>
      <ModalBody>
        <Text>Choose your picture 🔥</Text>
      </ModalBody>
      <ModalFooter 
        startActions={<Button onClick={() => setMediaLibVisible(prev => !prev)} variant="tertiary">Cancel</Button>} 
        endActions={<Button onClick={() => handleSubmitImage(image)}>Insert</Button>} 
      />
    </ModalLayout>
  )
}

export default MediaLibrary;
