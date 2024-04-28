import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Divider,
  MainNav,
  NavSection,
  NavSections,
  NavCondense,
  NavLink,
  NavUser,
  NavBrand,
  NavFooter,
} from '@strapi/design-system';
import { Feather, ListPlus, Images, Information, PuzzlePiece, ShoppingCart, Cog } from '@strapi/icons';

const meta: Meta<typeof MainNav> = {
  title: 'Design System/Components/MainNav',
  component: MainNav,
};

export default meta;

type Story = StoryObj<typeof MainNav>;

export const Base = {
  render: () => {
    const [condensed, setCondensed] = React.useState(false);

    return (
      <Box background="neutral100" height="100vh" paddingLeft={10}>
        <MainNav condensed={condensed}>
          <NavBrand
            workplace="Workplace"
            title="Strapi Dashboard"
            icon={<img src={'/stories/strapi-img.png'} alt="" />}
          />
          <Divider />
          <NavSections>
            <NavLink href="/cm" icon={<Feather />} className="active">
              Content-type-builder
            </NavLink>
            <NavSection label="Plugins">
              <NavLink href="/builder" icon={<ListPlus />}>
                Builder
              </NavLink>
              <NavLink href="/content" icon={<Images />}>
                Media library
              </NavLink>
              <NavLink href="/content" icon={<Information />}>
                Documentation
              </NavLink>
            </NavSection>
            <NavSection label="General">
              <NavLink href="/builder" icon={<PuzzlePiece />}>
                Plugins
              </NavLink>
              <NavLink href="/content" icon={<ShoppingCart />}>
                Marketplace
              </NavLink>
              <NavLink href="/content" icon={<Cog />}>
                Settings
              </NavLink>
            </NavSection>
          </NavSections>
          <NavFooter>
            <NavUser src="https://avatars.githubusercontent.com/u/3874873?v=4">John Duff</NavUser>
            <NavCondense onClick={() => setCondensed((s) => !s)}>
              {condensed ? 'Expanded the navbar' : 'Collapse the navbar'}
            </NavCondense>
          </NavFooter>
        </MainNav>
      </Box>
    );
  },

  name: 'base',
} satisfies Story;

export const Notifications = {
  render: () => {
    const [condensed, setCondensed] = React.useState(false);
    const numberOfNotifications = 2;

    return (
      <Box background="neutral100" height="100vh" paddingLeft={10}>
        <MainNav condensed={condensed}>
          <NavBrand workplace="Workplace" title="Strapi Dashboard" icon={<img src={'/strapi-img.png'} alt="" />} />
          <Divider />
          <NavSections>
            <NavLink href="/cm" icon={<Feather />} className="active">
              Content
            </NavLink>
            <NavSection label="Plugins">
              <NavLink href="/builder" icon={<ListPlus />}>
                Builder
              </NavLink>
              <NavLink href="/content" icon={<Images />}>
                Media library
              </NavLink>
              <NavLink href="/content" icon={<Information />}>
                Documentation
              </NavLink>
            </NavSection>
            <NavSection label="General">
              <NavLink href="/builder" icon={<PuzzlePiece />}>
                Plugins
              </NavLink>
              <NavLink href="/content" badgeContent="33" icon={<ShoppingCart />} badgeAriaLabel="new content">
                Marketplace
              </NavLink>
              <NavLink
                href="/content"
                badgeContent={numberOfNotifications}
                icon={<Cog />}
                badgeAriaLabel={`${numberOfNotifications} notifications`}
              >
                Settings
              </NavLink>
            </NavSection>
          </NavSections>
          <NavFooter>
            <NavUser initials="MD">Michka des Ronronscelestes</NavUser>
            <NavCondense onClick={() => setCondensed((s) => !s)}>
              {condensed ? 'Expanded the navbar' : 'Collapse the navbar'}
            </NavCondense>
          </NavFooter>
        </MainNav>
      </Box>
    );
  },

  name: 'notifications',
} satisfies Story;
