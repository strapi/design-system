import { ThemeShadows } from 'styled-components';

export const darkShadowTokenObject: { shadow: ThemeShadows } = {
  shadow: {
    filterShadow: '1px 1px 10px rgba(3, 3, 5, 0.35)',
    focus:
      'inset 2px 0px 0px rgb(39, 31, 224), inset 0px 2px 0px rgb(39, 31, 224), inset -2px 0px 0px rgb(39, 31, 224), inset 0px -2px 0px rgb(39, 31, 224)',
    focusShadow: '0px 0px 6px rgba(76, 191, 255, 0.75)',
    popupShadow: '1px 1px 10px rgba(3, 3, 5, 0.35)',
    tableShadow: '1px 1px 10px rgba(3, 3, 5, 0.2)',
  },
};
