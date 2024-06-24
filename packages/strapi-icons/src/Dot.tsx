import * as React from 'react';
import type { SVGProps } from 'react';
const SvgDot = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 4 4" {...props}>
    <rect width={4} height={4} fill="#A5A5BA" rx={2} />
  </svg>
);
export default SvgDot;
