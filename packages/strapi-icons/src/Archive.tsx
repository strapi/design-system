import * as React from 'react';
import type { SVGProps } from 'react';
const SvgArchive = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M3 10h18v10.004c0 .55-.445.996-.993.996H3.993A.994.994 0 0 1 3 20.004V10Zm6 2v2h6v-2H9ZM2 4c0-.552.455-1 .992-1h18.016c.548 0 .992.444.992 1v4H2V4Z"
    />
  </svg>
);
export default SvgArchive;
