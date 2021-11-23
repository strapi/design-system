import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = ({ meta }) => {
  return (
    <NextHead>
      <html lang="en" />
      <title>{meta?.title}</title>
      <meta content={meta?.description} name="description" />
      <meta property="og:type" content={meta?.type} />
      <meta property="og:site_name" content="Strapi Design System" />
      <meta property="og:description" content={meta?.description} />
      <meta property="og:title" content={meta?.title} />
    </NextHead>
  );
};

Head.propTypes = {
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
  }),
};

Head.defaultProps = {
  meta: {
    title: 'Strapi Design System',
    description: '',
    type: 'website',
  },
};

export default Head;
