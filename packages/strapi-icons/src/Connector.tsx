import * as React from 'react';
import type { SVGProps } from 'react';
const SvgConnector = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path fill="#8E8EA9" d="M8 5h3v9H8v3H6v-3H3V5h3V2h2v3Zm10 5h3v9h-3v3h-2v-3h-3v-9h3V7h2v3Z" />
  </svg>
);
export default SvgConnector;
