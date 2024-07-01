import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMagic = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="m15.224 15.508-2.213 4.65a.6.6 0 0 1-.977.155l-3.542-3.739a.6.6 0 0 0-.357-.182l-5.107-.668a.6.6 0 0 1-.449-.881l2.462-4.524a.6.6 0 0 0 .062-.396L4.16 4.86a.6.6 0 0 1 .7-.7l5.063.943a.6.6 0 0 0 .396-.062l4.524-2.462a.6.6 0 0 1 .881.45l.668 5.106a.6.6 0 0 0 .182.357l3.739 3.542a.601.601 0 0 1-.155.977l-4.65 2.213a.6.6 0 0 0-.284.284Zm.797 1.927 1.414-1.414 4.243 4.242-1.415 1.415-4.242-4.243Z"
    />
  </svg>
);
export default SvgMagic;
