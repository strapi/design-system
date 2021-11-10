import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = ({ meta }) => {
  return (
    <NextHead>
      <title>{meta?.title}</title>
      <meta content={meta?.description} name="description" />
      <meta property="og:type" content={meta?.type} />
      <meta property="og:site_name" content="Strapi Design System" />
      <meta property="og:description" content={meta?.description} />
      <meta property="og:title" content={meta?.title} />
    </NextHead>
  );
};

Head.protoTypes = {
  meta: PropTypes.object,
};

export default Head;
