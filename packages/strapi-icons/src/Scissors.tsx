import * as React from 'react';
import type { SVGProps } from 'react';
const SvgScissors = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="m12 14.121-2.317 2.317a4 4 0 1 1-2.12-2.121L9.88 12 4.21 6.333a2 2 0 0 1 0-2.829l.708-.707L12 9.88l7.081-7.082.708.707a1.999 1.999 0 0 1 0 2.829L14.12 12l2.317 2.317a4 4 0 1 1-2.12 2.121L12 14.12v.001ZM6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
  </svg>
);
export default SvgScissors;
