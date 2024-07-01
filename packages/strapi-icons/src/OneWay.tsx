import * as React from 'react';
import type { SVGProps } from 'react';
const SvgOneWay = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      fillRule="evenodd"
      d="M7.128 12.321a3.601 3.601 0 1 1 0-1.44H18.72v-2.4L24 11.6l-5.28 3.12v-2.4H7.128ZM6 11.6a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgOneWay;
