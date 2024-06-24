import * as React from 'react';

import { Flex, Typography } from '@strapi/design-system';

interface DeprecationNoticeProps {
  children: React.ReactNode;
  href: string;
}

const DeprecationNotice = ({ children, href }: DeprecationNoticeProps) => (
  <Flex padding={5} background="danger500" justifyContent="center" marginTop={4} marginBottom={4} hasRadius>
    <Typography fontSize={4} fontWeight="bold" tag="p">
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
);

export { DeprecationNotice };
export type { DeprecationNoticeProps };
