import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPinMap = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M18.364 17.364 12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0ZM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
  </svg>
);
export default SvgPinMap;
