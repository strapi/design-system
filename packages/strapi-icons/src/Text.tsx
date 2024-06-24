import * as React from 'react';
import type { SVGProps } from 'react';
const SvgText = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 32 24" {...props}>
    <rect width={31} height={23} x={0.5} y={0.5} fill="#EAFBE7" stroke="#C6F0C2" rx={2.5} />
    <path
      fill="#328048"
      d="M8.62 16h1.857l.627-2.05h2.982l.627 2.05h1.863l-2.941-8.455h-2.08L8.619 16Zm3.925-6.768h.105l1.032 3.393h-2.174l1.037-3.393ZM21.65 16.1c1.612 0 2.62-1.26 2.62-3.323v-.011c0-2.075-.985-3.323-2.62-3.323-.884 0-1.605.434-1.933 1.137h-.106V7.082h-1.71V16h1.71v-1.002h.106c.334.697 1.02 1.102 1.933 1.102Zm-.585-1.418c-.903 0-1.471-.715-1.471-1.899v-.011c0-1.184.574-1.91 1.47-1.91.903 0 1.465.726 1.465 1.904v.011c0 1.19-.556 1.905-1.465 1.905Z"
    />
  </svg>
);
export default SvgText;
