import Image from 'next/image';
import Layout from 'components/Layout';
import { getNavbarContent } from 'lib/mdx';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Icon } from '@strapi/design-system/Icon';
import ArrowRight from '@strapi/icons/ArrowRight';
import StyledLink from 'components/StyledLink';
import PropTypes from 'prop-types';

const Home = ({ navbarContent }) => {
  return (
    <Layout meta={{ title: 'Welcome' }} navigationContent={navbarContent || {}}>
      <Box padding={10} background="neutral0" shadow="filterShadow" hasRadius={true}>
        <Box paddingBottom={6}>
          <Typography as="h1" variant="alpha" textColor="neutral800">
            Welcome on Strapi Design System!{' '}
            <span role="img" aria-label="waving hand">
              👋
            </span>
          </Typography>
        </Box>
        <Typography variant="omega" textColor="neutral700">
          Design System! provides components and tools to help product teams work more efficiently, and to make Strapi’s
          applications more cohesive.
        </Typography>

        <Grid gap={5} paddingTop={8} paddingBottom={8}>
          <GridItem col={4}>
            <Image src="/principles.svg" width={214} height={131} alt="principles" />
            <Box paddingBottom={4} paddingTop={4}>
              <Typography as="h2" variant="beta" textColor="neutral800">
                Getting Started
              </Typography>
            </Box>
            <Typography variant="omega" textColor="neutral700">
              Get started with the Principles, the update and everything related to the Design System! accessibility
            </Typography>
            <StyledLink href="/principles" target="_blank" padding={4} active={true} size={0}>
              GET STARTED
              <Icon as={ArrowRight} height={10} width={10} marginLeft={1} color="primary600" />
            </StyledLink>
          </GridItem>
          <GridItem col={4}>
            <Image src="/foundations.svg" width={214} height={131} alt="foundations" />
            <Box paddingBottom={4} paddingTop={4}>
              <Typography as="h2" variant="beta" textColor="neutral800">
                Foundations
              </Typography>
            </Box>
            <Typography variant="omega" textColor="neutral700">
              Get started with the Principles, the update and everything related to the Design System! accessibility
            </Typography>
            <StyledLink href="/typography" target="_blank" padding={4} active={true} size={0}>
              SEE THE FOUNDATIONS
              <Icon as={ArrowRight} height={10} width={10} marginLeft={1} color="primary600" />
            </StyledLink>
          </GridItem>
          <GridItem col={4}>
            <Image src="/components.svg" width={214} height={131} alt="components" />
            <Box paddingBottom={4} paddingTop={4}>
              <Typography as="h2" variant="beta" textColor="neutral800">
                Components
              </Typography>
            </Box>
            <Typography variant="omega" textColor="neutral700">
              Get started with the Principles, the update and everything related to the Design System! accessibility
            </Typography>
            <StyledLink href="/actions" target="_blank" padding={4} active={true} size={0}>
              SEE THE COMPONENTS
              <Icon as={ArrowRight} height={10} width={10} marginLeft={1} color="primary600" />
            </StyledLink>
          </GridItem>
        </Grid>
      </Box>
      <Box padding={8} background="neutral0" shadow="filterShadow" hasRadius={true}>
        <Box paddingBottom={3}>
          <Typography as="h2" variant="beta" textColor="neutral600">
            What’s new
          </Typography>
        </Box>
        <Box paddingBottom={2}>
          <Typography as="h3" variant="alpha" textColor="neutral800">
            Design System! v1.0.0
          </Typography>
        </Box>
        <Typography variant="epsilon" textColor="neutral600">
          A new look and feel, with an updated color palette, icons, and more, with accessibility features to make sure
          that the experiences you create work for everyone.
        </Typography>
        <StyledLink href="#" target="_blank" padding={6} active={true} size={0}>
          SEE ALL NEW UPDATES
          <Icon as={ArrowRight} height={10} width={10} marginLeft={1} color="primary600" />
        </StyledLink>
      </Box>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const navbarContent = await getNavbarContent();
  return { props: { navbarContent } };
};

Home.propTypes = {
  navbarContent: PropTypes.arrayOf(PropTypes.object),
};

export default Home;
