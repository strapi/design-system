import * as React from 'react';
import type { SVGProps } from 'react';
const SvgChartBubble = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M16 16a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM6 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4Zm8.5-10a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
    />
  </svg>
);
export default SvgChartBubble;
