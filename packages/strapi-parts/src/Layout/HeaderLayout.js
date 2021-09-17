import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { H1, Subtitle, P, H2 } from '../Text';
import { Box } from '../Box';
import { Row } from '../Row';
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
  z-index: ${({ theme }) => theme.zIndices[1]};
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
          <Row justifyContent="space-between">
            <Row>
              {navigationAction && <Box paddingRight={3}>{navigationAction}</Box>}
              <Box>
                <H2 as="h1" {...props}>
                  {title}
                </H2>
                <P small={true} textColor="neutral600">
                  {subtitle}
                </P>
              </Box>
              {secondaryAction ? <Box paddingLeft={4}>{secondaryAction}</Box> : null}
            </Row>
            <Row>{primaryAction ? <Box paddingLeft={2}>{primaryAction}</Box> : undefined}</Row>
          </Row>
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
        <Row justifyContent="space-between">
          <Row>
            <H1 {...props}>{title}</H1>
            {secondaryAction ? <Box paddingLeft={4}>{secondaryAction}</Box> : null}
          </Row>
          {primaryAction}
        </Row>
        <Subtitle textColor="neutral600" as="p">
          {subtitle}
        </Subtitle>
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
