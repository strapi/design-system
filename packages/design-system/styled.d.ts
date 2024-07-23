import 'styled-components';
import { StrapiTheme } from './src/index';

declare module 'styled-components' {
  export interface DefaultTheme extends StrapiTheme {}
}
