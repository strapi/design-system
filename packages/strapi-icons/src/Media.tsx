import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMedia = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 32 24" {...props}>
    <rect width={31} height={23} x={0.5} y={0.5} fill="#F6ECFC" stroke="#E0C1F4" rx={2.5} />
    <path
      fill="#9736E8"
      fillRule="evenodd"
      d="M22 8.759a2 2 0 0 0-2-2h-8c-1.105 0-2 .902-2 2.006v6.068a2 2 0 0 0 .985 1.724l3.66-3.74 3.31 3.381 1.471-1.502 1.731 1.769c.51-.363.843-.958.843-1.632V8.76ZM18.5 9c-.84 0-1.5.66-1.5 1.5s.66 1.5 1.5 1.5 1.5-.66 1.5-1.5S19.34 9 18.5 9Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgMedia;
