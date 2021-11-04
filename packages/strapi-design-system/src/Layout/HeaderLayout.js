import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Typography } from '../Typography';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { useElementOnScreen } from '../helpers/useElementOnScreen';
import { useResizeObserver } from '../helpers/useResizeObserver';

const useHeaderSize = () => {
  const baseHeaderLayoutRef = useRef(null);
  const [headerSize, setHeaderSize] = useState(null);

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  useResizeObserver(containerRef, () => {
    if (containerRef.current) {
      setHeaderSize(containerRef.current.getBoundingClientRect());
    }
  });

  useEffect(() => {
    if (baseHeaderLayoutRef.current) {
      setHeaderSize(baseHeaderLayoutRef.current.getBoundingClientRect());
    }
  }, [baseHeaderLayoutRef]);

  return {
    containerRef,
    isVisible,
    baseHeaderLayoutRef,
    headerSize,
  };
};

export const HeaderLayout = (props) => {
  const { containerRef, isVisible, baseHeaderLayoutRef, headerSize } = useHeaderSize();

  return (
    <>
      <div style={{ height: headerSize?.height }} ref={containerRef}>
        {isVisible && <BaseHeaderLayout ref={baseHeaderLayoutRef} {...props} />}
      </div>
      {!isVisible && <BaseHeaderLayout {...props} sticky width={headerSize?.width} />}
    </>
  );
};

HeaderLayout.displayName = 'HeaderLayout';

const StickyBox = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  width: ${(props) => props.width}px;
  z-index: 4;
  box-shadow: ${({ theme }) => theme.shadows.tableShadow};
`;

export const BaseHeaderLayout = React.forwardRef(
  ({ navigationAction, primaryAction, secondaryAction, subtitle, title, sticky, width, ...props }, ref) => {
    if (sticky) {
      return (
        <StickyBox
          paddingLeft={6}
          paddingRight={6}
          paddingTop={3}
          paddingBottom={3}
          background="neutral0"
          width={width}
          data-strapi-header-sticky
        >
          <Flex justifyContent="space-between">
            <Flex>
              {navigationAction && <Box paddingRight={3}>{navigationAction}</Box>}
              <Box>
                <Typography variant="beta" as="h1" {...props}>
                  {title}
                </Typography>
                <Typography variant="pi" textColor="neutral600">
                  {subtitle}
                </Typography>
              </Box>
              {secondaryAction ? <Box paddingLeft={4}>{secondaryAction}</Box> : null}
            </Flex>
            <Flex>{primaryAction ? <Box paddingLeft={2}>{primaryAction}</Box> : undefined}</Flex>
          </Flex>
        </StickyBox>
      );
    }

    return (
      <Box
        ref={ref}
        paddingLeft={10}
        paddingRight={10}
        paddingBottom={10}
        paddingTop={navigationAction ? 6 : 10}
        background="neutral100"
        data-strapi-header
      >
        {navigationAction ? <Box paddingBottom={3}>{navigationAction}</Box> : null}
        <Flex justifyContent="space-between">
          <Flex>
            <Typography as="h1" variant="alpha" {...props}>
              {title}
            </Typography>
            {secondaryAction ? <Box paddingLeft={4}>{secondaryAction}</Box> : null}
          </Flex>
          {primaryAction}
        </Flex>
        <Typography variant="epsilon" textColor="neutral600" as="p">
          {subtitle}
        </Typography>
      </Box>
    );
  },
);

BaseHeaderLayout.displayName = 'BaseHeaderLayout';

BaseHeaderLayout.defaultProps = {
  navigationAction: undefined,
  primaryAction: undefined,
  secondaryAction: undefined,
  subtitle: undefined,
  sticky: false,
  width: undefined,
};

BaseHeaderLayout.propTypes = {
  navigationAction: PropTypes.node,
  primaryAction: PropTypes.node,
  secondaryAction: PropTypes.node,
  sticky: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
};

HeaderLayout.defaultProps = {
  navigationAction: undefined,
  primaryAction: undefined,
  secondaryAction: undefined,
  subtitle: undefined,
};

HeaderLayout.propTypes = {
  navigationAction: PropTypes.node,
  primaryAction: PropTypes.node,
  secondaryAction: PropTypes.node,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};
