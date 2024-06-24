import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLandscape = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      fillRule="evenodd"
      d="M4.3.6a.9.9 0 1 0 0 1.8h15.311a.9.9 0 1 0 0-1.8H4.301Zm17.1 3.7A1.6 1.6 0 0 1 23 5.9v15.5a1.6 1.6 0 0 1-1.6 1.6H2.6A1.601 1.601 0 0 1 1 21.4V5.915C1 5.03 1.716 4.3 2.6 4.3h18.8ZM5.032 19.18h14.336l-3.136-3.205-1.792 1.831-4.032-4.12-5.376 5.494Zm13.44-8.697c0 1.282-.985 2.289-2.24 2.289-1.254 0-2.24-1.007-2.24-2.29 0-1.281.986-2.288 2.24-2.288 1.255 0 2.24 1.007 2.24 2.289Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLandscape;
