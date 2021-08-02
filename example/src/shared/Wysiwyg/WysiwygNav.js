import React from 'react';
import PropTypes from 'prop-types';
import {
  Option,
  Button,
  Row, 
  Select
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
  SubMainButtons,
  CollapsableButtons,
  CustomIconButton,
  NavWrapper,
  MoreButton
} from './WysiwygStyles';

const WysiwygNav = ({ placeholder, setListType, setMarkdownType, setTitleType }) => {
    return (
      <NavWrapper padding={2} background='neutral100'>
        <Row justifyContent='space-between'>
          <Row>
            <Select placeholder={placeholder} size='S' onChange={(e) => setTitleType(e)}>
              <Option value='h1'>h1</Option>
              <Option value='h2'>h2</Option>
              <Option value='h3'>h3</Option>
              <Option value='h4'>h4</Option>
              <Option value='h5'>h5</Option>
              <Option value='h6'>h6</Option>
            </Select>

            <MainButtons>
              <CustomIconButton onClick={() => setMarkdownType("Bold")} label="Bold" name="Bold" icon={<Bold />} />
              <CustomIconButton onClick={() => setMarkdownType('Italic')} label="Italic" name="Italic" icon={<Italic />} />
              <CustomIconButton onClick={() => setMarkdownType('Underline')} label="Underline" name="Underline" icon={<Underline />} />
              <SubMainButtons>
                <CustomIconButton onClick={() => setMarkdownType('Strikethrough')} label="Strikethrough" name="Strikethrough" icon={<Strikethrough />} />
                <CustomIconButton onClick={() => setListType('BulletList')} label="BulletList" name="BulletList" icon={<BulletList />} />
                <CustomIconButton onClick={() => setListType('NumberList')} label="NumberList" name="NumberList" icon={<NumberList />} />
              </SubMainButtons>
            </MainButtons>
              
            <CollapsableButtons>
              <CustomIconButton onClick={() => setMarkdownType('Code')} label="Code" name="Code" icon={<Code />} />
              <CustomIconButton onClick={() => setMarkdownType('alt')} label="Image" name="Image" icon={<Image />} />
              <CustomIconButton onClick={() => setMarkdownType('Link')} label="Link" name="Link" icon={<Link />} />
              <CustomIconButton onClick={() => setMarkdownType('Quote')} label="Quote" name="Quote" icon={<Quote />} />
            </CollapsableButtons>

            <MoreButton onClick={() => console.log('more')} label="more" icon={<More />} />
          </Row>

          <Button variant='tertiary' size='L'>Preview mode</Button>
        </Row>
      </NavWrapper>
    )
};

WysiwygNav.propTypes = {
  placeholder: PropTypes.string
};

export default WysiwygNav;
