import React, { useState } from "react";
import { Main, SkipToContent } from "@strapi/design-system/Main";
import {
  MainNav,
  NavBrand,
  NavSections,
  NavLink,
  NavSection,
} from "@strapi/design-system/MainNav";
import { Box } from "@strapi/design-system/Box";
import { Divider } from "@strapi/design-system/Divider";
import { Grid } from "@strapi/design-system/Grid";
import ContentIcon from "@strapi/icons/ContentIcon";
import CtbIcon from "@strapi/icons/ContentTypeBuilderIcon";
import MediaLibIcon from "@strapi/icons/MediaLibrary";
import AlertInfoIcon from "@strapi/icons/AlertInfoIcon";
import PluginsIcon from "@strapi/icons/PluginsIcons";
import MarketPlaceIcon from "@strapi/icons/MarketplaceIcon";
import SettingsIcon from "@strapi/icons/Settings";
import strapiImage from "./strapi-img.png";

export const AdminLayout = ({ children }) => {
  const [condensed, setCondensed] = useState(false);
  return (
    <Box background="neutral100">
      <SkipToContent>Skip to content</SkipToContent>

      <Grid cols="auto 1fr" style={{ height: "100vh" }}>
        <MainNav condensed={condensed}>
          <NavBrand
            workplace="Workplace"
            title="Strapi Dashboard"
            icon={<img src={strapiImage} alt="" />}
          />
          <Box paddingBottom={3}>
            <Divider />
          </Box>
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
          <Box paddingTop={3} paddingBottom={3}>
            <Divider />
          </Box>
          <Box>
            <button onClick={() => setCondensed((s) => !s)}>{`<`}</button>
          </Box>
        </MainNav>

        <Box padding={11}>
          <Main labelledBy="main-title">{children}</Main>
        </Box>
      </Grid>
    </Box>
  );
};
