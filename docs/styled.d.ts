import { StrapiTheme } from '@strapi/design-system';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends StrapiTheme {}
}
