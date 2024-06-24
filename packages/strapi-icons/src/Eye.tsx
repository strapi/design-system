import * as React from 'react';
import type { SVGProps } from 'react';
const SvgEye = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path fill="#212134" d="M15.2 12a3.2 3.2 0 1 1-6.399 0 3.2 3.2 0 0 1 6.4 0Z" />
    <path
      fill="#212134"
      fillRule="evenodd"
      d="M18.78 6.103c1.923 1.243 3.64 2.981 4.963 5.027a1.61 1.61 0 0 1 .005 1.738c-1.318 2.063-3.031 3.807-4.954 5.046-2.12 1.364-4.475 2.086-6.81 2.086-2.388 0-4.683-.7-6.816-2.082-1.894-1.225-3.593-2.966-4.914-5.032a1.596 1.596 0 0 1 .032-1.777C1.89 8.811 3.734 7.027 5.77 5.805 7.767 4.608 9.858 4 11.984 4c2.317 0 4.667.728 6.795 2.103Zm-9.446 9.888a4.8 4.8 0 1 0 5.334-7.982 4.8 4.8 0 0 0-5.334 7.982Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgEye;
