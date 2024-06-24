import * as React from 'react';
import type { SVGProps } from 'react';
const SvgChartPie = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M11 2.05V13h10.95c-.501 5.053-4.765 9-9.95 9-5.523 0-10-4.477-10-10 0-5.185 3.947-9.449 9-9.95Zm2-1.507C18.553 1.02 22.979 5.447 23.457 11H13V.543Z"
    />
  </svg>
);
export default SvgChartPie;
