import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { Row } from '../Row';
import checkmarkIcon from '../BaseCheckbox/assets/checkmark.svg';

const CheckMark = styled.div`
  border: 1px solid ${({ theme, selected }) => (selected ? theme.colors.primary600 : theme.colors.neutral300)};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: 18px;
  width: 18px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: ${({ theme, selected }) => (selected ? theme.colors.primary600 : theme.colors.neutral0)};

  &::after {
    content: '';
    background: url(${checkmarkIcon}) no-repeat no-repeat center center;
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

const OptionBox = styled(Box)`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;

  &.is-focused {
    background: ${({ theme }) => theme.colors.primary100};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary100};
  }
`;

export const Option = ({ selected, children, value, multi, ...props }) => {
  const optionRef = useRef(null);

  return (
    <OptionBox
      as="li"
      hasRadius
      paddingLeft={4}
      paddingRight={4}
      paddingTop={2}
      paddingBottom={2}
      ref={optionRef}
      role="option"
      aria-selected={selected}
      background={'neutral0'}
      data-strapi-value={value}
      {...props}
    >
      <Row>
        {multi && (
          <Box paddingRight={2} aria-hidden>
            <CheckMark selected={selected} />
          </Box>
        )}
        <Text as="span" textColor={selected ? 'primary600' : 'neutral800'} highlighted={selected}>
          {children}
        </Text>
      </Row>
    </OptionBox>
  );
};

Option.defaultProps = {
  multi: false,
  selected: false,
};

Option.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  multi: PropTypes.bool,
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
};
