import * as React from 'react';

import { Box } from '../Box';
import { Flex } from '../Flex';
import { useElementOnScreen } from '../hooks/useElementOnScreen';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { Typography, TypographyProps } from '../Typography';
import { forwardRef } from '../utilities/forwardRef';

type BaseHeaderLayoutProps<C extends React.ElementType = 'h1'> = Omit<TypographyProps<C>, 'ref'> & {
  navigationAction?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  subtitle?: React.ReactNode;
  sticky?: boolean;
  width?: number;
};

type HeaderLayoutProps<C extends React.ElementType = 'h1'> = BaseHeaderLayoutProps<C>;

export const HeaderLayout = <C extends React.ElementType = 'h1'>(props: HeaderLayoutProps<C>) => {
  const baseHeaderLayoutRef = React.useRef<HTMLDivElement>(null);
  const [headerSize, setHeaderSize] = React.useState<DOMRect | null>(null);

  const [containerRef, isVisible] = useElementOnScreen<HTMLDivElement>({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  useResizeObserver(containerRef, () => {
    if (containerRef.current) {
      setHeaderSize(containerRef.current.getBoundingClientRect());
    }
  });

  React.useEffect(() => {
    if (isVisible && baseHeaderLayoutRef.current) {
      setHeaderSize(baseHeaderLayoutRef.current.getBoundingClientRect());
    }
  }, [isVisible]);

  return (
    <>
      <div style={{ height: headerSize?.height }} ref={containerRef}>
        {isVisible && <BaseHeaderLayout<'h1'> ref={baseHeaderLayoutRef} {...props} />}
      </div>

      {!isVisible && <BaseHeaderLayout<'h1'> {...props} sticky width={headerSize?.width} />}
    </>
  );
};

HeaderLayout.displayName = 'HeaderLayout';

export const BaseHeaderLayout = forwardRef(
  <C extends React.ElementType = 'h1'>(
    {
      navigationAction,
      primaryAction,
      secondaryAction,
      subtitle,
      title,
      sticky,
      width,
      ...props
    }: BaseHeaderLayoutProps<C>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const isSubtitleString = typeof subtitle === 'string';

    if (sticky) {
      return (
        <Box
          paddingLeft={6}
          paddingRight={6}
          paddingTop={3}
          paddingBottom={3}
          position="fixed"
          top={0}
          right={0}
          background="neutral0"
          shadow="tableShadow"
          width={`${width}rem`}
          zIndex={1}
          data-strapi-header-sticky
        >
          <Flex justifyContent="space-between">
            <Flex>
              {navigationAction && <Box paddingRight={3}>{navigationAction}</Box>}
              <Box>
                <Typography<'h1'> variant="beta" tag="h1" {...props}>
                  {title}
                </Typography>
                {isSubtitleString ? (
                  <Typography variant="pi" textColor="neutral600">
                    {subtitle}
                  </Typography>
                ) : (
                  subtitle
                )}
              </Box>
              {secondaryAction ? <Box paddingLeft={4}>{secondaryAction}</Box> : null}
            </Flex>
            <Flex>{primaryAction ? <Box paddingLeft={2}>{primaryAction}</Box> : undefined}</Flex>
          </Flex>
        </Box>
      );
    }

    return (
      <Box
        ref={ref}
        paddingLeft={10}
        paddingRight={10}
        paddingBottom={8}
        paddingTop={navigationAction ? 6 : 8}
        background="neutral100"
        data-strapi-header
      >
        {navigationAction ? <Box paddingBottom={2}>{navigationAction}</Box> : null}
        <Flex justifyContent="space-between">
          <Flex minWidth={0}>
            <Typography<'h1'> tag="h1" variant="alpha" {...props}>
              {title}
            </Typography>
            {secondaryAction ? <Box paddingLeft={4}>{secondaryAction}</Box> : null}
          </Flex>
          {primaryAction}
        </Flex>
        {isSubtitleString ? (
          <Typography variant="epsilon" textColor="neutral600" tag="p">
            {subtitle}
          </Typography>
        ) : (
          subtitle
        )}
      </Box>
    );
  },
);
