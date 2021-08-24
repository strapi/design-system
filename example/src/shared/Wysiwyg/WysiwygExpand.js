import React, { useState } from 'react';
import WysiwygNav from './WysiwygNav';
import Editor from './Editor';
import PreviewWysiwyg from './../PreviewWysiwyg';
import { Portal, Row, Text } from "@strapi/parts";
import { Expand } from "@strapi/icons";
import { 
  ExpandButton, 
  ExpandWrapper, 
  ExpandContainer, 
  PreviewWrapper, 
  WysiwygContainer, 
  PreviewHeader, 
  PreviewContainer 
} from './WysiwygStyles';

const WysiwygExpand = ({
  onToggleExpand, 
  value, 
  placeholder, 
  onActionClick, 
  onChange,
  textareaRef,
  editorRef
  }) => {

  const [visiblePopover, setVisiblePopover] = useState(false);
  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const handleTogglePopover = () => setVisiblePopover(prev => !prev);
  const handleToggleMediaLib = () => setMediaLibVisible(prev => !prev);

  return (
    <Portal>
      <ExpandWrapper>
        <ExpandContainer background="neutral0" hasRadius shadow="popupShadow">
          <WysiwygContainer>
            <WysiwygNav 
              placeholder={placeholder} 
              onActionClick={onActionClick}
              visiblePopover={visiblePopover}
              onTogglePopover={handleTogglePopover}
              onToggleMediaLib={handleToggleMediaLib}
              editorRef={editorRef}
            />
            <Editor 
              onChange={onChange} 
              textareaRef={textareaRef}
              editorRef={editorRef}
              value={value}
            />
          </WysiwygContainer>
          <PreviewWrapper>
            <PreviewHeader padding={2} background='neutral100'>
              <Row justifyContent='flex-end' alignItems='flex-end' >
                <ExpandButton onClick={(() => onToggleExpand('collapse'))}>
                  <Text>Collapse</Text>
                  <Expand/>
                </ExpandButton>
              </Row>
            </PreviewHeader>
            <PreviewContainer>
              <PreviewWysiwyg data={value}/>
            </PreviewContainer>
          </PreviewWrapper>
        </ExpandContainer>
      </ExpandWrapper>
    </Portal>
  )
}

export default WysiwygExpand;
