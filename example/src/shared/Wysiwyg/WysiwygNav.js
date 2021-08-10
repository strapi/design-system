import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Option,
  Button,
  Row, 
  Select,
  IconButtonGroup,
  Popover
} from "@strapi/parts";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  BulletList,
  NumberList,
  Code,
  Image,
  Link,
  Quote,
  More
} from "@strapi/icons";
import {
  MainButtons,
  CustomIconButton,
  NavWrapper,
  MoreButton,
  IconButtonGroupMargin
} from './WysiwygStyles';

const WysiwygNav = ({ 
    placeholder, 
    onActionClick, 
    visiblePopover, 
    setVisiblePopover, 
    isPreviewMode, 
    setIsPreviewMode 
  }) => {
    const buttonMoreRef = useRef();

    return (
      <NavWrapper padding={2} background='neutral100'>
        <Row justifyContent='space-between'>
          <Row>

            <Select disabled={isPreviewMode ? true : false} id='selectTitle' placeholder={placeholder} size='S' onChange={(value) => onActionClick(value)}>
              <Option value='h1'>h1</Option>
              <Option value='h2'>h2</Option>
              <Option value='h3'>h3</Option>
              <Option value='h4'>h4</Option>
              <Option value='h5'>h5</Option>
              <Option value='h6'>h6</Option>
            </Select>

            <MainButtons>
              <CustomIconButton disabled={isPreviewMode ? true : false} onClick={() => onActionClick("Bold")} id="Bold" label="Bold" name="Bold" icon={<Bold />} />
              <CustomIconButton disabled={isPreviewMode ? true : false} onClick={() => onActionClick("Italic")} id="Italic" label="Italic" name="Italic" icon={<Italic />} />
              <CustomIconButton disabled={isPreviewMode ? true : false} onClick={() => onActionClick("Underline")} id="Underline" label="Underline" name="Underline" icon={<Underline />} />
            </MainButtons>

            <MoreButton disabled={isPreviewMode ? true : false} ref={buttonMoreRef} onClick={() => setVisiblePopover((prev) => !prev)} id="more" label="more" icon={<More />} />
            {visiblePopover && (
              <Popover centered source={buttonMoreRef} spacingTop={1} id='popover'>
                <Row>
                  <IconButtonGroupMargin>
                    <CustomIconButton disabled={isPreviewMode ? true : false} onClick={() => onActionClick("Strikethrough")} id="Strikethrough" label="Strikethrough" name="Strikethrough" icon={<Strikethrough />} />
                    <CustomIconButton disabled={isPreviewMode ? true : false} onClick={() => onActionClick('BulletList')} id="BulletList" label="BulletList" name="BulletList" icon={<BulletList />} />
                    <CustomIconButton disabled={isPreviewMode ? true : false} onClick={() => onActionClick('NumberList')} id="NumberList" label="NumberList" name="NumberList" icon={<NumberList />} />
                  </IconButtonGroupMargin>
                  <IconButtonGroup>
                    <CustomIconButton disabled={isPreviewMode ? true : false} onClick={() => onActionClick("Code")} id="Code" label="Code" name="Code" icon={<Code />} />
                    <CustomIconButton disabled={isPreviewMode ? true : false} onClick={() => onActionClick("alt")} id="Image" label="Image" name="Image" icon={<Image />} />
                    <CustomIconButton disabled={isPreviewMode ? true : false} onClick={() => onActionClick("Link")} id="Link" label="Link" name="Link" icon={<Link />} />
                    <CustomIconButton disabled={isPreviewMode ? true : false} onClick={() => onActionClick("Quote")} id="Quote" label="Quote" name="Quote" icon={<Quote />} />
                  </IconButtonGroup>
                </Row>
              </Popover>
            )}

          </Row>

          <Button onClick={() => setIsPreviewMode(prev => !prev)} variant='tertiary' size='L' id='preview'>
            {isPreviewMode ? 'Markdown mode' : 'Preview mode'}
          </Button>
        </Row>
      </NavWrapper>
    )
};

WysiwygNav.propTypes = {
  placeholder: PropTypes.string,
  onActionClick: PropTypes.func,
  visiblePopover: PropTypes.bool,
  setVisiblePopover: PropTypes.func
};

export default WysiwygNav;
