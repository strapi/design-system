import React, { useState } from "react";
import {
  MainNav,
  NavBrand,
  NavSections,
  NavLink,
  NavSection,
  NavUser,
  NavCondense,
} from "@strapi/design-system/MainNav";
import { Divider } from "@strapi/design-system/Divider";
import ContentIcon from "@strapi/icons/ContentIcon";
import CtbIcon from "@strapi/icons/ContentTypeBuilderIcon";
import MediaLibIcon from "@strapi/icons/MediaLibrary";
import AlertInfoIcon from "@strapi/icons/AlertInfoIcon";
import PluginsIcon from "@strapi/icons/PluginsIcons";
import MarketPlaceIcon from "@strapi/icons/MarketplaceIcon";
import SettingsIcon from "@strapi/icons/Settings";
import strapiImage from "./strapi-img.png";

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
          <NavLink href="/builder" icon={<CtbIcon />} active>
            Builder
          </NavLink>
          <NavLink href="/content" icon={<MediaLibIcon />}>
            Media library
          </NavLink>
          <NavLink href="/content" icon={<AlertInfoIcon />}>
            Documentation
          </NavLink>
        </NavSection>
        <NavSection label="General">
          <NavLink href="/builder" icon={<PluginsIcon />}>
            Plugins
          </NavLink>
          <NavLink href="/content" icon={<MarketPlaceIcon />}>
            Marketplace
          </NavLink>
          <NavLink href="/content" icon={<SettingsIcon />}>
            Settings
          </NavLink>
        </NavSection>
      </NavSections>
      <Divider />
      <NavUser
        src="https://avatars.githubusercontent.com/u/3874873?v=4"
        href="/somewhere-i-belong"
      >
        John Duff
      </NavUser>
      <NavCondense onClick={() => setCondensed((s) => !s)}>
        {condensed ? "Expanded the navbar" : "Collapse the navbar"}
      </NavCondense>
    </MainNav>
  );
};
