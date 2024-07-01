import * as React from 'react';
import type { SVGProps } from 'react';
const SvgDuplicate = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M1.056 24h15.906c.583 0 1.056-.473 1.056-1.056V7.028c0-.583-.473-1.056-1.056-1.056H1.056C.473 5.972 0 6.445 0 7.028v15.916C0 23.527.473 24 1.056 24Z"
    />
    <path
      fill="#212134"
      d="M8.094 2.111h13.795v13.795h-1.127v2.112h2.182A1.056 1.056 0 0 0 24 16.962V1.056A1.056 1.056 0 0 0 22.944 0H7.038a1.056 1.056 0 0 0-1.056 1.056v2.252h2.112V2.11Z"
    />
  </svg>
);
export default SvgDuplicate;
