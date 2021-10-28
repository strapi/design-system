import React, { useState } from "react";
import { Apps as Applications ,ExclamationMarkCircle as AlertWarningIcon } from "@strapi/icons";
import {
  SubNavLink,
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
} from "@strapi/design-system";

export const SettingsNav = () => {
  const [search, setSearch] = useState("");
  const links = [
    {
      id: 1,
      label: "Addresses",
      icon: <AlertWarningIcon />,
      to: "/settings/address",
    },
    {
      id: 2,
      label: "Categories",
      to: "/settings/category",
    },
    {
      id: 3,
      label: "Cities",
      icon: <Applications />,
      to: "/settings/city",
      active: true,
    },
    {
      id: 4,
      label: "Countries",
      to: "/settings/country",
    },
  ];

  return (
    <SubNav ariaLabel="Settings sub nav">
      <SubNavHeader
        searchable
        value={search}
        onClear={() => setSearch("")}
        onChange={(e) => setSearch(e.target.value)}
        label="Settings"
        searchLabel="Search..."
      />
      <SubNavSections>
        <SubNavLink
          to="/settings/application"
          withBullet
          icon={<Applications />}
        >
          Application
        </SubNavLink>
        <SubNavSection label="Global Settings">
          {links.map(
            (link) =>
              link.icon && (
                <SubNavLink
                  to={link.to}
                  active={link.active}
                  icon={link.icon}
                  key={link.id}
                >
                  {link.label}
                </SubNavLink>
              )
          )}
        </SubNavSection>
        <SubNavSection label="Permissions">
          {links.map(
            (link) =>
              link.icon && (
                <SubNavLink to={link.to} icon={link.icon} key={link.id}>
                  {link.label}
                </SubNavLink>
              )
          )}
        </SubNavSection>
      </SubNavSections>
    </SubNav>
  );
};
