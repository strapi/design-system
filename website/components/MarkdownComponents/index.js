import { Box } from '@strapi/design-system';
import { ColorShades } from './ColorShades';
import { ColorSummary } from './ColorSummary';
import { H1, H2, P, Strong, Em, Blockquote } from './Typography';

const components = {
  /** Typography Components */
  h1: H1,
  h2: H2,
  p: P,
  strong: Strong,
  em: Em,
  blockquote: Blockquote,

  /** Generic Components */
  img(props) {
    return (
      <Box paddingBottom={10}>
        <img width="100%" height="100%" alt={props.alt} {...props} />
      </Box>
    );
  },

  /** Very Specific Components */
  ColorShades,
  ColorSummary,
};

export default components;
