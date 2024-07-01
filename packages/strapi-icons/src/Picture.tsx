import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPicture = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#32324D"
      fillRule="evenodd"
      d="M2.719 19.316V4.682H21.28v14.634H2.72ZM1 3.288c0-.192.154-.348.344-.348h21.312c.19 0 .344.156.344.348V20.71a.346.346 0 0 1-.344.349H1.344a.346.346 0 0 1-.344-.35V3.29Zm14.812 8.02a1.919 1.919 0 1 0 0-3.837 1.919 1.919 0 0 0 0 3.837ZM5.443 17.263h12.783a.547.547 0 0 0 .456-.87l-1.763-2.394a.547.547 0 0 0-.825-.072l-1.812 1.725-4.206-5.71a.547.547 0 0 0-.9.025L4.972 16.42a.547.547 0 0 0 .472.844Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPicture;
