import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      fillRule="evenodd"
      d="M3.869 2.99V0h2.9v2.99h10.463V0h2.9v2.99h.629c2.768 0 3.203.498 3.239 2.926V21c0 2.124-.191 3-2.802 3H2.818C.208 24 0 23.363 0 20.785V6.21c.035-2.049.233-3.22 3.001-3.22h.868ZM2.32 20.369c0 .811.245.865.776.865h17.905c.53 0 .68-.012.68-.825V8.233c-.015-.627-.219-.737-.631-.737H2.907c-.413 0-.592.09-.587.573v12.3Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCalendar;
