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

const WysiwygNav = ({ placeholder }) => {
    return (
      <NavWrapper padding={2} background='neutral100'>
        <Row justifyContent='space-between'>
          <Row>
            <Select placeholder={placeholder} size='S' onChange={() => {}}>
              <Option value='h1'>h1</Option>
              <Option value='h2'>h2</Option>
              <Option value='h3'>h3</Option>
              <Option value='h4'>h4</Option>
              <Option value='h5'>h5</Option>
              <Option value='h6'>h6</Option>
            </Select>

            <MainButtons>
              <CustomIconButton onClick={() => console.log('bold')} label="Bold" icon={<Bold />} />
              <CustomIconButton onClick={() => console.log('italic')} label="Italic" icon={<Italic />} />
              <CustomIconButton onClick={() => console.log('underline')} label="Underline" icon={<Underline />} />
              <SubMainButtons>
                <CustomIconButton onClick={() => console.log('strikethrough')} label="Strikethrough" icon={<Strikethrough />} />
                <CustomIconButton onClick={() => console.log('bulletlist')} label="BulletList" icon={<BulletList />} />
                <CustomIconButton onClick={() => console.log('numberlist')} label="NumberList" icon={<NumberList />} />
              </SubMainButtons>
            </MainButtons>
              
            <CollapsableButtons>
              <CustomIconButton onClick={() => console.log('code')} label="Code" icon={<Code />} />
              <CustomIconButton onClick={() => console.log('image')} label="Image" icon={<Image />} />
              <CustomIconButton onClick={() => console.log('link')} label="Link" icon={<Link />} />
              <CustomIconButton onClick={() => console.log('quote')} label="Quote" icon={<Quote />} />
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
