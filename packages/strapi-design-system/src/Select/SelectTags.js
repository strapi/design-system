import React from 'react';

import { Cross } from '@strapi/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex } from '../Flex';
import { Tag } from '../Tag';

const SelectTagsWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaces[1]};
`;

const SelectTag = styled(Tag)`
  margin-left: ${({ theme }) => theme.spaces[1]};
  margin-top: ${({ theme }) => theme.spaces[1]};
`;

export const SelectTags = ({ tags, onRemoveTag, disabled }) => {
  return (
    <SelectTagsWrapper>
      <Flex wrap="wrap">
        {tags.map((tag) => (
          <SelectTag
            disabled={disabled}
            key={`tag-${tag.value}`}
            icon={<Cross />}
            onClick={() => onRemoveTag(tag.value)}
            position="relative"
            tabIndex={-1}
            zIndex={1}
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
