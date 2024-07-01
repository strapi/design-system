import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCodeSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 32 32" {...props}>
    <path fill="#D9822F" d="M0 4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M17.143 18.659v2.912l6.856-3.878v-2.815L17.143 11v2.906l4.16 2.38-4.16 2.373Zm-2.287 0-4.16-2.374 4.16-2.38V11L8 14.877v2.816l6.856 3.878v-2.912Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCodeSquare;
