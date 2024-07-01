import * as React from 'react';
import type { SVGProps } from 'react';
const SvgStrapi = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 80 80" {...props}>
    <path
      fill="#4945FF"
      d="M0 27.7c0-13 0-19.6 4-23.6C8.2 0 14.8 0 27.8 0h24.6C65.4 0 72 0 76 4c4 4.2 4 10.8 4 23.8v24.6c0 13 0 19.6-4 23.6-4.2 4-10.8 4-23.8 4H27.7c-13 0-19.6 0-23.6-4C0 71.8 0 65.2 0 52.2V27.7Z"
    />
    <path fill="#fff" fillRule="evenodd" d="M55.2 24.3h-27V38H42v13.7h13.7V24.8c0-.3-.2-.5-.5-.5Z" clipRule="evenodd" />
    <path fill="#fff" d="M41.5 38h.5v.5h-.5z" />
    <path
      fill="#9593FF"
      d="M28.3 38h13.2c.3 0 .5.2.5.5v13.2H28.8a.5.5 0 0 1-.5-.5V38ZM42 51.7h13.7L42.5 65c-.2.2-.5 0-.5-.2v-13ZM28.3 38H15.2a.3.3 0 0 1-.2-.5l13.3-13.2V38Z"
    />
  </svg>
);
export default SvgStrapi;
