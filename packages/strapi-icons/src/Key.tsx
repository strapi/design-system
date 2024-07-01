import * as React from 'react';
import type { SVGProps } from 'react';
const SvgKey = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path fill="#8E8EA9" d="M17 14h-4.34a6 6 0 1 1 0-4H23v4h-2v4h-4v-4ZM7 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </svg>
);
export default SvgKey;
