import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';

const components = {
  h1: (props) => {
    return (
      <Box paddingBottom={6}>
        <Typography variant="alpha" textColor="neutral800" {...props} />
      </Box>
    );
  },
  h2: (props) => {
    return (
      <Box paddingBottom={4}>
        <Typography variant="beta" textColor="neutral800" {...props} />
      </Box>
    );
  },
  p: (props) => {
    return (
      <Box paddingBottom={8}>
        <Typography variant="epsilon" textColor="neutral700" {...props} />
      </Box>
    );
  },
  strong: (props) => <Typography variant="omega" fontWeight="semiBold" textColor="primary600" {...props} />,
};

export default components;
