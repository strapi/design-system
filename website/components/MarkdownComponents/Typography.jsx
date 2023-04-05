import { Box, Typography } from '@strapi/design-system';

export const H1 = (props) => (
  <Box paddingBottom={6}>
    <Typography id="main-content-title" as="h1" variant="alpha" textColor="neutral800" {...props} />
  </Box>
);

export const H2 = (props) => (
  <Box paddingBottom={4}>
    <Typography as="h2" variant="beta" textColor="neutral800" {...props} />
  </Box>
);

export const P = (props) => (
  <Box paddingBottom={8}>
    <Typography as="p" variant="epsilon" textColor="neutral700" {...props} />
  </Box>
);

export const Strong = (props) => <Typography variant="omega" fontWeight="semiBold" textColor="primary600" {...props} />;

export const Em = (props) => <Typography variant="beta" textColor="primary600" {...props} />;

export const Blockquote = (props) => <Box paddingLeft={6} {...props} />;
