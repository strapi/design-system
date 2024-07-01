import * as React from 'react';
import type { SVGProps } from 'react';
const SvgGlobe = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#8E8EA9"
      d="M13 21h5v2H6v-2h5v-1.05a10.001 10.001 0 0 1-7.684-4.988l1.737-.992A8 8 0 1 0 15.97 3.053l.992-1.737A9.996 9.996 0 0 1 22 10c0 5.185-3.947 9.449-9 9.95V21Zm-1-4a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
    />
  </svg>
);
export default SvgGlobe;
