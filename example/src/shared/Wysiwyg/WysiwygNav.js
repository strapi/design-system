import React from 'react';
import PropTypes from 'prop-types';
import {
  Option,
  Button,
  Row, 
  Select,
  IconButtonGroup
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
  MoreButton
} from './WysiwygStyles';

const WysiwygNav = ({ placeholder, onActionClick }) => {
    return (
      <NavWrapper padding={2} background='neutral100'>
        <Row justifyContent='space-between'>
          <Row>

            <Select placeholder={placeholder} size='S' onChange={(value) => onActionClick(value)}>
              <Option value='h1'>h1</Option>
              <Option value='h2'>h2</Option>
              <Option value='h3'>h3</Option>
              <Option value='h4'>h4</Option>
              <Option value='h5'>h5</Option>
              <Option value='h6'>h6</Option>
            </Select>

            <MainButtons>
              <CustomIconButton onClick={() => onActionClick("Bold")} label="Bold" name="Bold" icon={<Bold />} />
              <CustomIconButton onClick={() => onActionClick("Italic")} label="Italic" name="Italic" icon={<Italic />} />
              <CustomIconButton onClick={() => onActionClick("Underline")} label="Underline" name="Underline" icon={<Underline />} />
            </MainButtons>

            <IconButtonGroup>
              <CustomIconButton onClick={() => onActionClick("Strikethrough")} label="Strikethrough" name="Strikethrough" icon={<Strikethrough />} />
              <CustomIconButton onClick={() => onActionClick('BulletList')} label="BulletList" name="BulletList" icon={<BulletList />} />
              <CustomIconButton onClick={() => onActionClick('NumberList')} label="NumberList" name="NumberList" icon={<NumberList />} />
            </IconButtonGroup>
              
            <IconButtonGroup>
              <CustomIconButton onClick={() => onActionClick("Code")} label="Code" name="Code" icon={<Code />} />
              <CustomIconButton onClick={() => onActionClick("alt")} label="Image" name="Image" icon={<Image />} />
              <CustomIconButton onClick={() => onActionClick("Link")} label="Link" name="Link" icon={<Link />} />
              <CustomIconButton onClick={() => onActionClick("Quote")} label="Quote" name="Quote" icon={<Quote />} />
            </IconButtonGroup>

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
