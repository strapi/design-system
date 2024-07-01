import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPlaySquare = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 32 32" {...props}>
    <path fill="#66B7F1" d="M0 4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M12 10.921a.5.5 0 0 1 .773-.419l8.582 5.579a.5.5 0 0 1 0 .838l-8.582 5.579a.5.5 0 0 1-.773-.42V10.922Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPlaySquare;
