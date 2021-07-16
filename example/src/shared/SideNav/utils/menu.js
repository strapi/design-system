import CtbIcon from '@strapi/icons/ContentTypeBuilderIcon';
import MediaLibIcon from '@strapi/icons/MediaLibrary';
import AlertInfoIcon from '@strapi/icons/AlertInfoIcon';
import PluginsIcon from '@strapi/icons/PluginsIcons';
import MarketPlaceIcon from '@strapi/icons/MarketplaceIcon';
import SettingsIcon from '@strapi/icons/Settings';

const menu = {
  pluginSectionLinks: [
    {
      icon: CtbIcon,
      to: '/builder',
      intlLabel: {
        id: 'Content Type Builder',
        defaultMessage: 'Content Type Builder',
      },
    },
    {
      icon: MediaLibIcon,
      to: '/upload',
      intlLabel: {
        id: 'Media Library',
        defaultMessage: 'Media Library',
      },
    },
    {
      icon: AlertInfoIcon,
      to: '/documentation',
      intlLabel: {
        id: 'Documentation',
        defaultMessage: 'Documentation',
      },
    },
  ],
  generalSectionLinks: [
    {
      icon: PluginsIcon,
      to: '/plugins',
      intlLabel: {
        id: 'Plugins',
        defaultMessage: 'Plugins',
      },
    },
    {
      icon: MarketPlaceIcon,
      to: '/marketplace',
      intlLabel: {
        id: 'Marketplace',
        defaultMessage: 'Marketplace',
      },
    },
    {
      icon: SettingsIcon,
      to: '/settings',
      intlLabel: {
        id: 'Settings',
        defaultMessage: 'Settings',
      },
    },
  ],
};

export default menu;
