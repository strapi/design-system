import * as React from 'react';
import type { SVGProps } from 'react';
const SvgWalk = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="m7.617 8.712 3.205-2.328c.36-.263.797-.398 1.243-.384a2.616 2.616 0 0 1 2.427 1.82c.186.583.356.977.51 1.182A4.992 4.992 0 0 0 19 11v2a6.987 6.987 0 0 1-5.402-2.547l-.697 3.955 2.061 1.73 2.223 6.108-1.88.684-2.04-5.604-3.39-2.845a2 2 0 0 1-.713-1.904l.509-2.885-.677.492-2.127 2.928-1.618-1.176L7.6 8.7l.017.012ZM13.5 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm-2.972 13.181-3.214 3.83-1.532-1.285 2.976-3.546.746-2.18 1.791 1.5-.767 1.681Z"
    />
  </svg>
);
export default SvgWalk;
