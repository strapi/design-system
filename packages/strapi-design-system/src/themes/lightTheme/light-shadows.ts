import { ThemeShadows } from 'styled-components';

export const lightShadowTokenObject: { shadow: ThemeShadows } = {
  shadow: {
    filterShadow: '0px 1px 4px rgba(33, 33, 52, 0.1)',
    focus:
      'inset 2px 0px 0px rgb(39, 31, 224), inset 0px 2px 0px rgb(39, 31, 224), inset -2px 0px 0px rgb(39, 31, 224), inset 0px -2px 0px rgb(39, 31, 224)',
    focusShadow: '0px 0px 6px rgba(76, 191, 255, 0.75)',
    popupShadow: '0px 2px 15px rgba(33, 33, 52, 0.1)',
    tableShadow: '0px 1px 4px rgba(33, 33, 52, 0.1)',
  },
};
