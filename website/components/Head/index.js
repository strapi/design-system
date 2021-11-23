import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = ({ title, description, type }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Strapi Design System" />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
    </NextHead>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
};

Head.defaultProps = {
  title: 'Strapi Design System',
  description: '',
  type: 'website',
};

export default Head;
