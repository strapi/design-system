import * as React from 'react';
import type { SVGProps } from 'react';
const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M13.3 0c.11 0 .2.09.2.2v18.06l8.238-8.239a.2.2 0 0 1 .283 0l1.837 1.838a.2.2 0 0 1 0 .282L12.141 23.86a.2.2 0 0 1-.283 0L.141 12.14a.2.2 0 0 1 0-.282l1.837-1.838a.2.2 0 0 1 .283 0L10.5 18.26V.2c0-.11.09-.2.2-.2h2.6Z"
    />
  </svg>
);
export default SvgArrowDown;
