import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';

const components = {
  h1(props) {
    return (
      <Box paddingBottom={6}>
        <Typography id="main-content-title" as="h1" variant="alpha" textColor="neutral800" {...props} />
      </Box>
    );
  },
  h2(props) {
    return (
      <Box paddingBottom={4}>
        <Typography as="h2" variant="beta" textColor="neutral800" {...props} />
      </Box>
    );
  },
  p(props) {
    return (
      <Box paddingBottom={8}>
        <Typography as="p" variant="epsilon" textColor="neutral700" {...props} />
      </Box>
    );
  },
  strong: (props) => <Typography variant="omega" fontWeight="semiBold" textColor="primary600" {...props} />,
  em: (props) => <Typography variant="beta" textColor="primary600" {...props} />,
  blockquote: (props) => <Box paddingLeft={6} {...props} />,
  img(props) {
    return (
      <Box paddingBottom={10}>
        <img width="100%" height="100%" alt={props.alt} {...props} />
      </Box>
    );
  },
};

export default components;
