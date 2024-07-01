import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPuzzle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 25 25" {...props}>
    <path
      fill="#212134"
      fillRule="evenodd"
      d="m13.58.448 3.177 3.176L18.66 1.72a3.267 3.267 0 1 1 4.62 4.62l-1.904 1.904 3.175 3.175a1.528 1.528 0 0 1 0 2.162l-3.175 3.175L20.2 15.58a3.267 3.267 0 1 0-4.62 4.62l1.177 1.177-3.176 3.176a1.528 1.528 0 0 1-2.162 0l-3.175-3.175-1.902 1.902a3.267 3.267 0 1 1-4.62-4.62l1.902-1.902-3.176-3.176a1.528 1.528 0 0 1 0-2.162l3.176-3.176L4.8 9.42a3.267 3.267 0 0 0 4.62-4.62L8.244 3.623 11.419.448a1.528 1.528 0 0 1 2.162 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPuzzle;
