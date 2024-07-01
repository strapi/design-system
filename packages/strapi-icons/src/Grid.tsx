import * as React from 'react';
import type { SVGProps } from 'react';
const SvgGrid = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 12 12" {...props}>
    <path
      fill="#8E8EA9"
      d="M.67 5.33h4a.67.67 0 0 0 .66-.66v-4A.67.67 0 0 0 4.67 0h-4A.67.67 0 0 0 0 .67v4a.67.67 0 0 0 .67.66Zm6.66 0h4a.67.67 0 0 0 .67-.66v-4a.67.67 0 0 0-.67-.67h-4a.67.67 0 0 0-.66.67v4a.67.67 0 0 0 .66.66ZM.67 12h4a.67.67 0 0 0 .66-.67v-4a.67.67 0 0 0-.66-.66h-4a.67.67 0 0 0-.67.66v4a.67.67 0 0 0 .67.67Zm6.66 0h4a.67.67 0 0 0 .67-.67v-4a.67.67 0 0 0-.67-.66h-4a.67.67 0 0 0-.66.66v4a.67.67 0 0 0 .66.67Z"
    />
  </svg>
);
export default SvgGrid;
