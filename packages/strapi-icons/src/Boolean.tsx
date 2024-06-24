import * as React from 'react';
import type { SVGProps } from 'react';
const SvgBoolean = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 32 24" {...props}>
    <rect width={31} height={23} x={0.5} y={0.5} fill="#EAFBE7" stroke="#C6F0C2" rx={2.5} />
    <path
      fill="#328048"
      d="M19.5 7h-7A4.505 4.505 0 0 0 8 11.5c0 2.481 2.019 4.5 4.5 4.5h7c2.481 0 4.5-2.019 4.5-4.5S21.981 7 19.5 7Zm0 8a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
    />
  </svg>
);
export default SvgBoolean;
