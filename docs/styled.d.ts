import 'styled-components';
import type { StrapiTheme } from '@strapi/design-system';

declare module 'styled-components' {
  export interface DefaultTheme extends StrapiTheme {}
}
