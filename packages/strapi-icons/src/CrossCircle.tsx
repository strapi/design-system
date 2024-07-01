import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCrossCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      fillRule="evenodd"
      d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Zm-8.806-4 .806.806L12.806 12 16 15.194l-.806.806L12 12.806 8.806 16 8 15.194 11.194 12 8 8.806 8.806 8 12 11.194 15.194 8Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCrossCircle;
