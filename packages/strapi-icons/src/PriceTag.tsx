import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPriceTag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="m10.9 2.1 9.9 1.415 1.413 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1Zm2.828 8.486a2 2 0 1 0 2.828-2.83 2 2 0 0 0-2.828 2.83Z"
    />
  </svg>
);
export default SvgPriceTag;
