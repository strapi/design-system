import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = ({ title, description, type, image }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Strapi Design System" />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="200" />
    </NextHead>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
};

Head.defaultProps = {
  title: 'Strapi Design System - design principles and guidelines',
  description:
    'Welcome on the Strapi Design System website! It provides guidelines and tools to help anyone smoothly contribute to Strapi and efficiently build plugins.',
  type: 'website',
  image: 'https://design-system.strapi.io/strapi-design-system-cover.png',
};

export default Head;
