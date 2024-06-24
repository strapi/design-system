import * as React from 'react';
import type { SVGProps } from 'react';
const SvgExpand = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#32324D"
      d="M15.5 3.5h5v5H23V1h-7.5v2.5Zm5 17h-5V23H23v-7.5h-2.5v5Zm-17-17h5V1H1v7.5h2.5v-5ZM1 23.3h7.5v-2.5h-5v-5H1v7.5Z"
    />
  </svg>
);
export default SvgExpand;
