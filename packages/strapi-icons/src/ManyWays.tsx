import * as React from 'react';
import type { SVGProps } from 'react';
const SvgManyWays = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#212134"
      fillRule="evenodd"
      d="M3.6 14.132a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Zm0 1.2a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z"
      clipRule="evenodd"
    />
    <path fill="#212134" d="M6.24 11.011h13.44v1.44H6.24v-1.44Z" />
    <path
      fill="#212134"
      d="m5.872 10.43 8.347-6.176.86 1.163-8.347 6.176-.86-1.162ZM5.9 13.087l8.346 6.177.864-1.168-8.347-6.176-.864 1.167ZM18.72 8.613l5.28 3.12-5.28 3.12v-6.24Z"
    />
    <path
      fill="#212134"
      d="M12.72 2.633 18.82 2 16.43 7.649 12.72 2.633ZM12.72 21.307l6.1.633-2.389-5.649-3.711 5.016Z"
    />
  </svg>
);
export default SvgManyWays;
