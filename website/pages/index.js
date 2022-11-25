import Image from 'next/image';
import Link from 'next/link';
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
    <Layout navigationContent={navbarContent}>
      <Box padding={10} background="neutral0" shadow="filterShadow" hasRadius maxWidth="880px">
        <Box paddingBottom={6}>
          <Typography id="main-content-title" as="h1" variant="alpha" textColor="neutral800">
            Welcome on Strapi Design System!{' '}
            <span role="img" aria-label="waving hand">
              👋
            </span>
          </Typography>
        </Box>
        <Typography variant="omega" textColor="neutral700">
          Strapi Design System provides guidelines and tools to help anyone make Strapi&apos;s contributions more
          cohesive and to build plugins more efficiently.
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
              Get started with principles, learn more about accessibility and get the latest updates.
            </Typography>
            <StyledLink as={Link} href="/principles" padding={4} active size={0}>
              GET STARTED
              <Icon as={ArrowRight} height={3} width={3} marginLeft={1} color="primary600" />
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
              Discover the foundations of the Design System: typography, colors, grid system and much more.
            </Typography>
            <StyledLink as={Link} href="/typography" padding={4} active size={0}>
              LEARN MORE
              <Icon as={ArrowRight} height={3} width={3} marginLeft={1} color="primary600" />
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
              Have a look at our Components - universal building bricks that fit almost any use case.
            </Typography>
            <StyledLink as={Link} href="/components" padding={4} active size={0}>
              ACCESS THE COMPONENTS
              <Icon as={ArrowRight} height={3} width={3} marginLeft={1} color="primary600" />
            </StyledLink>
          </GridItem>
        </Grid>
      </Box>
      <Box padding={8} background="neutral0" shadow="filterShadow" hasRadius maxWidth="880px">
        <Box paddingBottom={3}>
          <Typography as="h2" variant="beta" textColor="neutral600">
            What’s new
          </Typography>
        </Box>
        <Box paddingBottom={2}>
          <Typography as="h3" variant="alpha" textColor="neutral800">
            Strapi Design System
          </Typography>
        </Box>
        <Typography variant="epsilon" textColor="neutral600">
          A new look and feel, with fresh design tokens coupled with accessibility features to make sure the experiences
          you create work for everyone.
        </Typography>
        <StyledLink as={Link} href="/whats-new" padding={6} active size={0}>
          SEE ALL NEW UPDATES
          <Icon as={ArrowRight} height={3} width={3} marginLeft={1} color="primary600" />
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
