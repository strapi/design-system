import * as React from 'react';
import type { SVGProps } from 'react';
const SvgServer = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M4 3h16a1 1 0 0 1 1 1v7H3V4a1 1 0 0 1 1-1ZM3 13h18v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7Zm4 3v2h3v-2H7ZM7 6v2h3V6H7Z"
    />
  </svg>
);
export default SvgServer;
