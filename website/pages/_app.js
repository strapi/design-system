import { ThemeProvider, lightTheme, SkipToContent } from '@strapi/design-system';
import PropTypes from 'prop-types';

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <SkipToContent>Skip to content</SkipToContent>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default App;
