import { Link } from '@strapi/design-system';

interface ViewSourceProps {
  pkg?: 'design-system' | 'icons' | 'primitives';
  path: string;
  branch?: string;
}

const ViewSource = ({ pkg = 'design-system', path, branch = 'main' }: ViewSourceProps) => {
  if (!path) {
    console.warn('ViewSource requires a path prop to be passed.');
    return null;
  }

  let href: string;

  if (pkg === 'icons') {
    href = `https://github.com/strapi/design-system/tree/${branch}/packages/${pkg}/assets/${path}`;
  } else {
    href = `https://github.com/strapi/design-system/tree/${branch}/packages/${pkg}/src/${path}`;
  }

  return (
    <Link marginTop={4} isExternal href={href} target="_blank" rel="noopener noreferrer">
      View source
    </Link>
  );
};

export { ViewSource };
export type { ViewSourceProps };
