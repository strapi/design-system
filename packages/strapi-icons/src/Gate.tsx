import * as React from 'react';
import type { SVGProps } from 'react';
const SvgGate = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M18.901 10a3 3 0 0 0 4.075 1.113 3.5 3.5 0 0 1-1.975 3.55V21h-6v-2a3 3 0 0 0-5.996-.176L9 19v2H3v-6.336a3.5 3.5 0 0 1-1.979-3.553A2.999 2.999 0 0 0 5.098 10h13.803Zm-1.865-7a3.5 3.5 0 0 0 4.446 2.86 3.5 3.5 0 0 1-3.29 3.135L18 9H6a3.5 3.5 0 0 1-3.482-3.14A3.5 3.5 0 0 0 6.964 3h10.072Z"
    />
  </svg>
);
export default SvgGate;
