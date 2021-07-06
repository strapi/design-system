import AlertWarningIcon from "@strapi/icons/AlertWarningIcon";
import Applications from "@strapi/icons/Applications";

export const cmData = [
  {
    id: 1,
    label: "Addresses",
    icon: <AlertWarningIcon />,
    to: "/address",
    kind: "collectionType",
  },
  {
    id: 2,
    label: "Categories",
    to: "/category",
    kind: "collectionType",
  },
  {
    id: 3,
    label: "City",
    icon: <Applications />,
    to: "/city",
    kind: "singleType",
  },
  {
    id: 4,
    label: "Countries",
    to: "/country",
    active: true,
    kind: "singleType",
  },
];
