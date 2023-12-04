import { ChangeEvent, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Flex,
  TextButton,
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
  SubNavLink,
  SubNavLinkSection,
} from '@strapi/design-system';
import { Apps, Plus, ExclamationMarkCircle } from '@strapi/icons';

const meta: Meta<typeof SubNav> = {
  title: 'Design System/Components/SubNav',
  component: SubNav,
};

export default meta;

type Story = StoryObj<typeof SubNav>;

export const Base = {
  render: () => {
    const [search, setSearch] = useState('');

    const links = [
      {
        id: 1,
        label: 'Addresses',
        icon: <ExclamationMarkCircle />,
        to: '/address',
      },
      {
        id: 2,
        label: 'Categories',
        to: '/category',
      },
      {
        id: 3,
        label: 'Cities',
        icon: <Apps />,
        to: '/city',
        active: true,
      },
      {
        id: 4,
        label: 'Countries',
        to: '/country',
      },
    ];

    return (
      <Flex>
        <Box
          padding={10}
          style={{
            height: '100vh',
          }}
          background="neutral200"
        >
          <SubNav ariaLabel="Builder sub nav">
            <SubNavHeader
              searchable
              value={search}
              onClear={() => setSearch('')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              label="Content-Type Builder"
              searchLabel="Search..."
            />
            <SubNavSections>
              <SubNavSection label="Collection Type" collapsable badgeLabel={links.length.toString()}>
                {links.map((link) => (
                  <SubNavLink to={link.to} active={link.active} key={link.id}>
                    {link.label}
                  </SubNavLink>
                ))}
              </SubNavSection>
              <Box paddingLeft={7} paddingBottom={3}>
                <TextButton startIcon={<Plus />}>Click on me</TextButton>
              </Box>
              <SubNavSection label="Single Type" collapsable badgeLabel={links.length.toString()}>
                <SubNavLinkSection label="Default">
                  {links.map((link) => (
                    <SubNavLink to={link.to} key={link.id} isSubSectionChild>
                      {link.label}
                    </SubNavLink>
                  ))}
                </SubNavLinkSection>
              </SubNavSection>
              <Box paddingLeft={7}>
                <TextButton startIcon={<Plus />}>Click on me</TextButton>
              </Box>
            </SubNavSections>
          </SubNav>
        </Box>
        <Box
          padding={10}
          style={{
            height: '100vh',
          }}
          background="neutral200"
        >
          <SubNav ariaLabel="Settings sub nav">
            <SubNavHeader label="Settings" />
            <SubNavSections>
              <SubNavLink to="/blabla" withBullet icon={<Apps />} className="active">
                Application
              </SubNavLink>
              <SubNavSection label="Global Settings">
                {links.map(
                  (link) =>
                    link.icon && (
                      <SubNavLink to={link.to} active={link.active} icon={link.icon} key={link.id} isSubSectionChild>
                        {link.label}
                      </SubNavLink>
                    ),
                )}
              </SubNavSection>
              <SubNavSection label="Permissions">
                {links.map(
                  (link) =>
                    link.icon && (
                      <SubNavLink to={link.to} icon={link.icon} key={link.id}>
                        {link.label}
                      </SubNavLink>
                    ),
                )}
              </SubNavSection>
            </SubNavSections>
          </SubNav>
        </Box>
        <Box
          padding={10}
          style={{
            height: '100vh',
          }}
          background="neutral200"
        >
          <SubNav ariaLabel="Mixed sub nav">
            <SubNavHeader label="Mixed" />
            <SubNavSections>
              <SubNavLink to="/blabla" withBullet icon={<Apps />}>
                Application
              </SubNavLink>
              <SubNavSection label="Global Settings">
                <SubNavLinkSection label="Sub section">
                  {links.map((link) => (
                    <SubNavLink to={link.to} active={link.active} icon={link.icon} key={link.id}>
                      {link.label}
                    </SubNavLink>
                  ))}
                </SubNavLinkSection>
              </SubNavSection>
              <SubNavSection label="Permissions">
                {links.map((link) => (
                  <SubNavLink to={link.to} icon={link.icon} key={link.id}>
                    {link.label}
                  </SubNavLink>
                ))}
              </SubNavSection>
            </SubNavSections>
          </SubNav>
        </Box>
      </Flex>
    );
  },

  name: 'base',
} satisfies Story;
