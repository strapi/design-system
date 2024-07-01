import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPaintBrush = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1Zm11.732 1.732 1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0Z"
    />
  </svg>
);
export default SvgPaintBrush;
