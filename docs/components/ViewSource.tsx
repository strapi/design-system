import { Link } from '@strapi/design-system';

interface ViewSourceProps {
  pkg?: 'design-system' | 'icons' | 'primitives';
  path: string;
}

const ViewSource = ({ pkg = 'design-system', path }: ViewSourceProps) => {
  if (!path) {
    console.warn('ViewSource requires a path prop to be passed.');

    return null;
  }

  return (
    <Link
      marginTop={4}
      isExternal
      href={`https://github.com/strapi/design-system/tree/releases/2.0.0/packages/${pkg}/${pkg === 'icons' ? 'assets' : 'src'}/${path}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View source
    </Link>
  );
};

export { ViewSource };
export type { ViewSourceProps };
