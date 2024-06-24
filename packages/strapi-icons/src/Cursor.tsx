import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCursor = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M13.91 12.36 17 20.854l-2.818 1.026-3.092-8.494-4.172 3.156 1.49-14.909 10.726 10.463-5.224.264Z"
    />
  </svg>
);
export default SvgCursor;
