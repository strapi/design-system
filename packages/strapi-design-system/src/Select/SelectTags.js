import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@strapi/icons/CloseAlertIcon';
import styled from 'styled-components';
import { Tag } from '../Tag';
import { Row } from '../Row';

const SelectTagsWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaces[1]};
`;

const SelectTag = styled(Tag)`
  position: relative;
  z-index: 1;
  margin-left: ${({ theme }) => theme.spaces[1]};
  margin-top: ${({ theme }) => theme.spaces[1]};
`;

export const SelectTags = ({ tags, onRemoveTag, disabled }) => {
  const handleClick = (value) => {
    if (disabled) return;

    onRemoveTag(value);
  };

  return (
    <SelectTagsWrapper>
      <Row wrap="wrap">
        {tags.map((tag) => (
          <SelectTag
            icon={<CloseIcon />}
            aria-disabled={disabled}
            onClick={() => handleClick(tag.value)}
            tabIndex={-1}
            key={`tag-${tag.value}`}
          >
            {tag.label}
          </SelectTag>
        ))}
      </Row>
    </SelectTagsWrapper>
  );
};

SelectTags.defaultProps = {
  disabled: false,
  tags: [],
};

SelectTags.propTypes = {
  disabled: PropTypes.bool,
  onRemoveTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) }),
  ),
};
