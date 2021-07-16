import React, { useState } from 'react';
import {
  MainNav,
  NavBrand,
  NavSections,
  NavLink,
  NavSection,
  NavUser,
  NavCondense,
} from '@strapi/design-system/MainNav';
import { Divider } from '@strapi/design-system/Divider';
import ContentIcon from '@strapi/icons/ContentIcon';
import menu from './utils/menu';
import strapiImage from './strapi-img.png';

export const SideNav = () => {
  const [condensed, setCondensed] = useState(false);

  return (
    <MainNav condensed={condensed}>
      <NavBrand
        workplace="Workplace"
        title="Strapi Dashboard"
        icon={<img src={strapiImage} alt="" />}
      />
      <Divider />
      <NavSections>
        <NavLink href="/content" icon={<ContentIcon />}>
          Content
        </NavLink>

        <NavSection label="Plugins">
          {menu.pluginSectionLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink href={link.to} key={link.to} icon={<Icon />}>
                {link.intlLabel.defaultMessage}
              </NavLink>
            );
          })}
        </NavSection>
        <NavSection label="General">
          {menu.generalSectionLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink href={link.to} key={link.to} icon={<Icon />}>
                {link.intlLabel.defaultMessage}
              </NavLink>
            );
          })}
        </NavSection>
      </NavSections>
      <Divider />
      <NavUser src="https://avatars.githubusercontent.com/u/3874873?v=4" href="/somewhere-i-belong">
        John Duff
      </NavUser>
      <NavCondense onClick={() => setCondensed((s) => !s)}>
        {condensed ? 'Expanded the navbar' : 'Collapse the navbar'}
      </NavCondense>
    </MainNav>
  );
};
