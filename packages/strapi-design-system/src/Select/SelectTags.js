import React from 'react';
import PropTypes from 'prop-types';
import Cross from '@strapi/icons/Cross';
import styled from 'styled-components';
import { Tag } from '../Tag';
import { Flex } from '../Flex';

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
  return (
    <SelectTagsWrapper>
      <Flex wrap="wrap">
        {tags.map((tag) => (
          <SelectTag
            icon={<Cross />}
            disabled={disabled}
            onClick={() => onRemoveTag(tag.value)}
            tabIndex={-1}
            key={`tag-${tag.value}`}
          >
            {tag.label}
          </SelectTag>
        ))}
      </Flex>
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
