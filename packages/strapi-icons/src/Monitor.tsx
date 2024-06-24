import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMonitor = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M13 18v2h4v2H7v-2h4v-2H2.992A1 1 0 0 1 2 16.993V4.007C2 3.451 2.455 3 2.992 3h18.016c.548 0 .992.449.992 1.007v12.986c0 .556-.455 1.007-.992 1.007H13Z"
    />
  </svg>
);
export default SvgMonitor;
