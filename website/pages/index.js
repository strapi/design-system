import Image from 'next/image';
import Layout from 'components/Layout';
import { getNavbarContent } from 'lib/mdx';
import { H1, H2, Text, Subtitle } from '@strapi/design-system/Text';
import { Box } from '@strapi/design-system/Box';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import styled from 'styled-components';
import StyledLink from 'components/StyledLink';
import PropTypes from 'prop-types';

const Icon = styled.span`
  padding: 0px 8px;
`;

export default function Home({ navbarContent }) {
  return (
    <Layout meta={{ title: 'Welcome' }} navigationContent={navbarContent ? navbarContent : {}}>
      <Box padding={8} background="neutral0" shadow="filterShadow" hasRadius={true}>
        <H1 style={{ paddingBottom: 24 }} textColor="neutral800">
          Welcome on Strapi Design System!{' '}
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </H1>
        <Text textColor="neutral700">
          Design System! provides components and tools to help product teams work more efficiently, and to make Strapi’s
          applications more cohesive.
        </Text>

        <Grid gap={5} style={{ paddingTop: 40, paddingBottom: 40 }}>
          <GridItem col={4}>
            <Image src="/principles.svg" width={214} height={131} />
            <H2 style={{ paddingBottom: 16, paddingTop: 16 }} textColor="neutral800">
              Getting Started
            </H2>
            <Text textColor="neutral700">
              Get started with the Principles, the update and everything related to the Design System! accessibility
            </Text>
            <StyledLink href="/principles" target="_blank" padding={16} active={true} size={11}>
              GET STARTED
              <Icon>
                <Image src="/next-icon.svg" height={10} width={10} />
              </Icon>
            </StyledLink>
          </GridItem>
          <GridItem col={4}>
            <Image src="/foundations.svg" width={214} height={131} />
            <H2 style={{ paddingBottom: 16, paddingTop: 16 }} textColor="neutral800">
              Foundations
            </H2>
            <Text textColor="neutral700">
              Get started with the Principles, the update and everything related to the Design System! accessibility
            </Text>
            <StyledLink href="/typography" target="_blank" padding={16} active={true} size={11}>
              SEE THE FOUNDATIONS
              <Icon>
                <Image src="/next-icon.svg" height={10} width={10} />
              </Icon>
            </StyledLink>
          </GridItem>
          <GridItem col={4}>
            <Image src="/components.svg" width={214} height={131} />
            <H2 style={{ paddingBottom: 16, paddingTop: 16 }} textColor="neutral800">
              Components
            </H2>
            <Text textColor="neutral700">
              Get started with the Principles, the update and everything related to the Design System! accessibility
            </Text>
            <StyledLink href="/actions" target="_blank" padding={16} active={true} size={11}>
              SEE THE COMPONENTS
              <Icon>
                <Image src="/next-icon.svg" height={10} width={10} />
              </Icon>
            </StyledLink>
          </GridItem>
        </Grid>
      </Box>
      <Box padding={8} background="neutral0" shadow="filterShadow" hasRadius={true}>
        <H2 style={{ paddingBottom: 12 }} textColor="neutral600">
          What’s new
        </H2>
        <H1 style={{ paddingBottom: 8 }} textColor="neutral800">
          Design System! v1.0.0
        </H1>
        <Subtitle textColor="neutral600">
          A new look and feel, with an updated color palette, icons, and more, with accessibility features to make sure
          that the experiences you create work for everyone.
        </Subtitle>
        <StyledLink href="#" target="_blank" padding={24} active={true} size={11}>
          SEE ALL NEW UPDATES
          <Icon>
            <Image src="/next-icon.svg" height={10} width={10} />
          </Icon>
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
