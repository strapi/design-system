import * as React from 'react';
import type { SVGProps } from 'react';
const SvgExternalLink = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#32324D"
      d="M16.235 2.824a1.412 1.412 0 0 1 0-2.824h6.353C23.368 0 24 .633 24 1.412v6.353a1.412 1.412 0 0 1-2.823 0V4.82l-8.179 8.178a1.412 1.412 0 0 1-1.996-1.996l8.178-8.178h-2.945Zm4.942 10.588a1.412 1.412 0 0 1 2.823 0v9.176c0 .78-.632 1.412-1.412 1.412H1.412C.632 24 0 23.368 0 22.588V1.412C0 .632.632 0 1.412 0h9.176a1.412 1.412 0 0 1 0 2.824H2.824v18.353h18.353v-7.765Z"
    />
  </svg>
);
export default SvgExternalLink;
