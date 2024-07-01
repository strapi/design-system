import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCup = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M5 3h15a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V4a1 1 0 0 1 1-1Zm13 2v3h2V5h-2ZM2 19h18v2H2v-2Z"
    />
  </svg>
);
export default SvgCup;
