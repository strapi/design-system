import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { PuzzlePiece } from '@strapi/icons';

import {
  SubNav,
  SubNavHeader,
  SubNavLink,
  SubNavLinkSection,
  SubNavSection,
  SubNavSections,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const LINKS = [
  { id: 1, label: 'Addresses', href: '#addresses' },
  { id: 2, label: 'Categories', href: '#categories' },
  { id: 3, label: 'Cities', href: '#cities' },
  { id: 4, label: 'Countries', href: '#countries' },
];

const SubNavExample = ({ searchable = false }: { searchable?: boolean }) => {
  const [search, setSearch] = React.useState('');
  const links = LINKS.filter((link) => link.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ height: '64rem', display: 'flex' }}>
      <SubNav aria-label="Builder sub nav" style={{ height: '100%' }}>
        <SubNavHeader
          searchable={searchable}
          value={search}
          onClear={() => setSearch('')}
          onChange={(event) => setSearch(event.target.value)}
          label="Builder"
          searchLabel="Search…"
        />
        <SubNavSections>
          <SubNavSection label="Collection Type" collapsable badgeLabel={links.length.toString()}>
            {links.map((link, index) => (
              <SubNavLink key={link.id} href={link.href} className={index === 1 ? 'active' : undefined}>
                {link.label}
              </SubNavLink>
            ))}
          </SubNavSection>
          <SubNavSection label="Single Type" collapsable badgeLabel="2">
            <SubNavLinkSection label="Default">
              <SubNavLink href="#home" isSubSectionChild>
                Home
              </SubNavLink>
              <SubNavLink href="#about" isSubSectionChild>
                About us
              </SubNavLink>
            </SubNavLinkSection>
          </SubNavSection>
          <SubNavSection label="Plugins">
            <SubNavLink href="#marketplace" icon={<PuzzlePiece />} withBullet>
              Marketplace
            </SubNavLink>
          </SubNavSection>
        </SubNavSections>
      </SubNav>
    </div>
  );
};

const meta: Meta<typeof SubNavExample> = {
  title: 'Next/SubNav',
  component: SubNavExample,
  args: {
    searchable: true,
  },
  argTypes: {
    searchable: {
      description: 'Shows the search button of `SubNavHeader`.',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof SubNavExample>;

export const Base = {
  name: 'base',
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
} satisfies Story;
