import React from 'react';
import { MainNav, NavBrand, NavSections, NavLink, NavSection, NavUser, NavCondense } from '../../MainNav';
import Write from '@strapi/icons/Write';
import Layer from '@strapi/icons/Layer';
import Landscape from '@strapi/icons/Landscape';
import Information from '@strapi/icons/Information';
import Puzzle from '@strapi/icons/Puzzle';
import ShoppingCart from '@strapi/icons/ShoppingCart';
import Cog from '@strapi/icons/Cog';
import { Divider } from '../../Divider';
import strapiImage from './strapi-img.png';

export const MainNavigation = () => {
  const numberOfNotifications = 6;

  return (
    <MainNav>
      <NavBrand workplace="Workplace" title="Strapi Dashboard" icon={<img src={strapiImage} alt="" />} />
      <Divider />
      <NavSections>
        <NavLink to="/cm" icon={<Write />} className="active">
          Content
        </NavLink>
        <NavSection label="Plugins">
          <NavLink to="/builder" icon={<Layer />}>
            Builder
          </NavLink>
          <NavLink to="/content" icon={<Landscape />}>
            Media library
          </NavLink>
          <NavLink to="/content" icon={<Information />}>
            Documentation
          </NavLink>
        </NavSection>
        <NavSection label="General">
          <NavLink to="/builder" icon={<Puzzle />}>
            Plugins
          </NavLink>
          <NavLink to="/content" badgeContent={'new'} icon={<ShoppingCart />} badgeAriaLabel="new content">
            Marketplace
          </NavLink>
          <NavLink
            to="/content"
            badgeContent={numberOfNotifications}
            icon={<Cog />}
            badgeAriaLabel={`${numberOfNotifications} notifications`}
          >
            Settings
          </NavLink>
        </NavSection>
      </NavSections>
      <NavUser initials="JD">John Duff</NavUser>
      <NavCondense>Expand the navbar</NavCondense>
    </MainNav>
  );
};
