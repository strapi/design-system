import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCloud = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M17 7a8.003 8.003 0 0 0-7.493 5.19l1.874.703A6.002 6.002 0 0 1 23.001 15a6 6 0 0 1-6 6H7A6 6 0 0 1 5.007 9.339a7 7 0 0 1 13.757-2.143A8.027 8.027 0 0 0 17 7Z"
    />
  </svg>
);
export default SvgCloud;
