import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSlideshow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M13 17v3h5v2H6v-2h5v-3H4a1 1 0 0 1-1-1V4H2V2h20v2h-1v12a1 1 0 0 1-1 1h-7ZM10 6v7l5-3.5L10 6Z"
    />
  </svg>
);
export default SvgSlideshow;
