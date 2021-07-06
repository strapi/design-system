import React from "react";
import {
  SubNav,
  SubNavHeader,
  SubNavSections,
  SubNavSection,
  SubNavLink,
} from "@strapi/design-system/SubNav";
import { Box } from "@strapi/design-system/Box";
import { TextButton } from "@strapi/design-system/TextButton";
import AddIcon from "@strapi/icons/AddIcon";
import { cmData } from "./cmData";
import { useSearch } from "./useSearch";

export const SubSideNav = () => {
  const { search, setSearch, searchResults } = useSearch(cmData, { keys: ["label"] });
  const collectionType = searchResults.filter((link) => link.kind === "collectionType");
  const singleType = searchResults.filter((link) => link.kind === "singleType");

  return (
    <SubNav ariaLabel="Builder sub nav">
      <SubNavHeader
        searchable
        value={search}
        onClear={() => setSearch("")}
        onChange={(e) => setSearch(e.target.value)}
        label="Builder"
        searchLabel="Search..."
      />
      <SubNavSections>
        <SubNavSection label="Collection Type" collapsable badgeLabel={collectionType.length.toString()}>
          {collectionType &&
            collectionType.map((link) => (
              <SubNavLink href={link.to} active={link.active} key={link.id}>
                {link.label}
              </SubNavLink>
            ))}
        </SubNavSection>
        <Box as="li" paddingLeft={7}>
          <TextButton startIcon={<AddIcon />}>Click on me</TextButton>
        </Box>
        <SubNavSection label="Single Type" collapsable badgeLabel={singleType.length.toString()}>
          {singleType &&
            singleType.map((link) => (
              <SubNavLink href={link.to} key={link.id}>
                {link.label}
              </SubNavLink>
            ))}
        </SubNavSection>
        <Box as="li" paddingLeft={7}>
          <TextButton startIcon={<AddIcon />}>Click on me</TextButton>
        </Box>
      </SubNavSections>
    </SubNav>
  );
};
