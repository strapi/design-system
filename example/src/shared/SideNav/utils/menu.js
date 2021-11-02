import CtbIcon from "@strapi/icons/Layout";
import MediaLibIcon from "@strapi/icons/Landscape";
import AlertInfoIcon from "@strapi/icons/ExclamationMarkCircle";
import PluginsIcon from "@strapi/icons/Puzzle";
import ShoppingCart from "@strapi/icons/ShoppingCart";
import SettingsIcon from "@strapi/icons/Cog";

const menu = {
  pluginSectionLinks: [
    {
      icon: CtbIcon,
      to: "/builder",
      intlLabel: {
        id: "Content Type Builder",
        defaultMessage: "Content Type Builder",
      },
    },
    {
      icon: MediaLibIcon,
      to: "/upload",
      intlLabel: {
        id: "Media Library",
        defaultMessage: "Media Library",
      },
    },
    {
      icon: AlertInfoIcon,
      to: "/documentation",
      intlLabel: {
        id: "Documentation",
        defaultMessage: "Documentation",
      },
    },
  ],
  generalSectionLinks: [
    {
      icon: PluginsIcon,
      to: "/plugins",
      intlLabel: {
        id: "Plugins",
        defaultMessage: "Plugins",
      },
    },
    {
      icon: ShoppingCart,
      to: "/marketplace",
      intlLabel: {
        id: "Marketplace",
        defaultMessage: "Marketplace",
      },
    },
    {
      icon: SettingsIcon,
      to: "/settings/application",
      intlLabel: {
        id: "Settings",
        defaultMessage: "Settings",
      },
    },
  ],
};

export default menu;
