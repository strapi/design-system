import * as React from 'react';
import type { SVGProps } from 'react';
const SvgParagraph = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path fill="#181826" d="M3 4h18v2H3V4Zm0 15h14v2H3v-2Zm0-5h18v2H3v-2Zm0-5h14v2H3V9Z" />
  </svg>
);
export default SvgParagraph;
