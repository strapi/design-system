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
import { useTheme } from '@strapi/design-system/ThemeProvider';

export default function Home({ navbarContent }) {
  const theme = useTheme();
  return (
    <Layout meta={{ title: 'Welcome' }} navigationContent={navbarContent ? navbarContent : {}}>
      <Box padding={10} background="neutral0" shadow="filterShadow" hasRadius={true}>
        <Box paddingBottom={6}>
          <Typography variant="alpha" textColor="neutral800">
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

        <Grid gap={5} style={{ paddingTop: 40, paddingBottom: 40 }}>
          <GridItem col={4}>
            <Image src="/principles.svg" width={214} height={131} />
            <Box paddingBottom={4} paddingTop={4}>
              <Typography variant="beta" textColor="neutral800">
                Getting Started
              </Typography>
            </Box>
            <Typography variant="omega" textColor="neutral700">
              Get started with the Principles, the update and everything related to the Design System! accessibility
            </Typography>
            <StyledLink theme={theme} href="/principles" target="_blank" padding={16} active={true} size={11}>
              GET STARTED
              <Icon as={ArrowRight} height={10} width={10} marginLeft={1} color="primary600" />
            </StyledLink>
          </GridItem>
          <GridItem col={4}>
            <Image src="/foundations.svg" width={214} height={131} />
            <Box paddingBottom={4} paddingTop={4}>
              <Typography variant="beta" textColor="neutral800">
                Foundations
              </Typography>
            </Box>
            <Typography variant="omega" textColor="neutral700">
              Get started with the Principles, the update and everything related to the Design System! accessibility
            </Typography>
            <StyledLink theme={theme} href="/typography" target="_blank" padding={16} active={true} size={11}>
              SEE THE FOUNDATIONS
              <Icon as={ArrowRight} height={10} width={10} marginLeft={1} color="primary600" />
            </StyledLink>
          </GridItem>
          <GridItem col={4}>
            <Image src="/components.svg" width={214} height={131} />
            <Box paddingBottom={4} paddingTop={4}>
              <Typography variant="beta" textColor="neutral800">
                Components
              </Typography>
            </Box>
            <Typography variant="omega" textColor="neutral700">
              Get started with the Principles, the update and everything related to the Design System! accessibility
            </Typography>
            <StyledLink theme={theme} href="/actions" target="_blank" padding={16} active={true} size={11}>
              SEE THE COMPONENTS
              <Icon as={ArrowRight} height={10} width={10} marginLeft={1} color="primary600" />
            </StyledLink>
          </GridItem>
        </Grid>
      </Box>
      <Box padding={8} background="neutral0" shadow="filterShadow" hasRadius={true}>
        <Box paddingBottom={3}>
          <Typography variant="beta" textColor="neutral600">
            What’s new
          </Typography>
        </Box>
        <Box paddingBottom={2}>
          <Typography variant="alpha" textColor="neutral800">
            Design System! v1.0.0
          </Typography>
        </Box>
        <Typography variant="epsilon" textColor="neutral600">
          A new look and feel, with an updated color palette, icons, and more, with accessibility features to make sure
          that the experiences you create work for everyone.
        </Typography>
        <StyledLink theme={theme} href="#" target="_blank" padding={24} active={true} size={11}>
          SEE ALL NEW UPDATES
          <Icon as={ArrowRight} height={10} width={10} marginLeft={1} color="primary600" />
        </StyledLink>
      </Box>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const navbarContent = await getNavbarContent();
  return { props: { navbarContent } };
};

Home.propTypes = {
  navbarContent: PropTypes.arrayOf(PropTypes.object),
};
