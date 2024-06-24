import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#32324D"
      fillRule="evenodd"
      d="M0 4a2 2 0 0 1 2-2h20a2 2 0 1 1 0 4H2a2 2 0 0 1-2-2Zm4 8a2 2 0 0 1 2-2h12a2 2 0 1 1 0 4H6a2 2 0 0 1-2-2Zm6 6a2 2 0 1 0 0 4h4a2 2 0 1 0 0-4h-4Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgFilter;
