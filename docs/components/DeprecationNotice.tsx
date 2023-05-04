import { ReactNode } from 'react';

import { Flex, Typography, DesignSystemProvider, lightTheme } from '@strapi/design-system';

interface DeprecationNoticeProps {
  children: ReactNode;
  href: string;
}

export const DeprecationNotice = ({ children, href }: DeprecationNoticeProps) => (
  <DesignSystemProvider theme={lightTheme}>
    <Flex padding={5} background="danger200" justifyContent="center" marginTop={4} marginBottom={4}>
      <Typography fontSize={4} fontWeight="bold" as="p">
        ⛔️
        <strong>
          {' This component has been deprecated. Please use '}
          <a style={{ color: 'inherit', textDecoration: 'underline' }} href={href}>
            {children}
          </a>
          {' instead. '}
        </strong>
        ⛔️
      </Typography>
    </Flex>
  </DesignSystemProvider>
);
