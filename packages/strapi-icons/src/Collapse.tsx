import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCollapse = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 22 22" {...props}>
    <path
      fill="#32324D"
      d="M5 5H0v2.5h7.5V0H5v5Zm17 0h-5.1V0h-2.5v7.5h7.5V5ZM7.5 14.4H0v2.5h5v5h2.5v-7.5Zm9.4 2.5h5v-2.5h-7.5v7.5h2.5v-5Z"
    />
  </svg>
);
export default SvgCollapse;
