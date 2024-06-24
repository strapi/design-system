import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLayout = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      fillRule="evenodd"
      d="M2.182 0A2.182 2.182 0 0 0 0 2.182v19.636C0 23.023.977 24 2.182 24h19.636A2.182 2.182 0 0 0 24 21.818V2.182A2.182 2.182 0 0 0 21.818 0H2.182Zm9.354 11.987h7.539c.314 0 .55.209.55.549v6.539c0 .34-.236.55-.55.55h-7.539c-.34 0-.55-.236-.55-.55v-6.539c0-.34.236-.55.55-.55Zm-6.638-2.27h14.177c.314 0 .549-.209.549-.549v-4.27c0-.34-.21-.549-.55-.549H4.899c-.313 0-.549.21-.549.55v4.269c0 .34.236.55.55.55Zm3.27 9.907h-3.27a.536.536 0 0 1-.549-.55v-6.538c0-.34.236-.55.55-.55h3.269c.34 0 .55.21.55.55v6.539c0 .34-.236.55-.55.55Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLayout;
