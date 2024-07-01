import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCast = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-6c0-.67-.051-1.338-.153-2H20V5H4v3.153A13.1 13.1 0 0 0 2 8V4a1 1 0 0 1 1-1Zm10 18h-2a9 9 0 0 0-9-9v-2c6.075 0 11 4.925 11 11Zm-4 0H7a5 5 0 0 0-5-5v-2a7 7 0 0 1 7 7Zm-4 0H2v-3a3 3 0 0 1 3 3Zm9.373-4A13.033 13.033 0 0 0 6 8.627V7h12v10h-3.627Z"
    />
  </svg>
);
export default SvgCast;
