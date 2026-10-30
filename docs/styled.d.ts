import { StrapiTheme } from '@strapi/design-system';

declare module 'styled-components' {
  export interface DefaultTheme extends StrapiTheme {}
}
