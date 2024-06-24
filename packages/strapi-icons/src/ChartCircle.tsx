import * as React from 'react';
import type { SVGProps } from 'react';
const SvgChartCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M11 2.05v3.02a7 7 0 1 0 5.192 12.536l2.137 2.137A9.966 9.966 0 0 1 12 22C6.477 22 2 17.523 2 12c0-5.185 3.947-9.449 9-9.95ZM21.95 13a9.947 9.947 0 0 1-2.207 5.328l-2.137-2.136A6.958 6.958 0 0 0 18.929 13h3.022-.001ZM13.002 2.05a10.004 10.004 0 0 1 8.95 8.95H18.93a7.005 7.005 0 0 0-5.928-5.929V2.049v.001Z"
    />
  </svg>
);
export default SvgChartCircle;
