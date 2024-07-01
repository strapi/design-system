import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCrop = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      d="M20.571 21.429h-3.428V24h3.428v-2.571ZM20.571 17.143V3.429H7.714v3.428h9.429v10.286H6.857V0H3.43v3.429H0v3.428h3.429v13.714H24v-3.428h-3.429Z"
    />
  </svg>
);
export default SvgCrop;
