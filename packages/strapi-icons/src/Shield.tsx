import * as React from 'react';
import type { SVGProps } from 'react';
const SvgShield = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      fillRule="evenodd"
      d="M11.738 23.966C4.905 21.624 0 18.49 0 11.043V3.772c0-.331.275-.6.615-.6C4.971 3.17 9.159 1.792 11.647.074A.516.516 0 0 1 11.942 0h.115c.103 0 .21.016.295.074 2.535 1.72 6.676 3.096 11.033 3.098.34 0 .615.269.615.6v7.271c0 7.447-4.906 10.582-11.739 12.923a.63.63 0 0 1-.204.034h-.115a.631.631 0 0 1-.204-.034Zm.16-11.175c-2.944 0-5.334 1.153-5.334 4.003H17.23c0-2.85-2.39-4.003-5.333-4.003ZM12 6.188a2.501 2.501 0 0 1 0 5 2.501 2.501 0 0 1 0-5Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgShield;
