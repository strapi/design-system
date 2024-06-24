import * as React from 'react';
import type { SVGProps } from 'react';
const SvgOneToOne = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      fillRule="evenodd"
      d="M3.6 14a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Zm0 1.2a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM20.4 14a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Zm0 1.2a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z"
      clipRule="evenodd"
    />
    <path fill="#212134" d="M6.24 10.881H18v1.44H6.24v-1.44Z" />
  </svg>
);
export default SvgOneToOne;
