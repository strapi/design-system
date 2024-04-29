import { Typography, TypographyComponent, TypographyProps } from '@strapi/design-system';
import { styled, css } from 'styled-components';

const H1 = (props: TypographyProps) => (
  <Typography {...props} tag="h1" variant="alpha" textColor="neutral800" marginBottom="0.5em" />
);

const H2 = (props: TypographyProps) => (
  <Typography {...props} tag="h2" variant="beta" textColor="neutral800" marginBottom="1em" marginTop="2em" />
);

const H3 = (props: TypographyProps) => (
  <Typography
    {...props}
    tag="h3"
    variant="delta"
    textColor="neutral800"
    marginBottom="1em"
    marginTop="1.4em"
    fontSize={4}
  />
);

const H4 = (props: TypographyProps) => (
  <Typography
    {...props}
    tag="h4"
    variant="epsilon"
    textColor="neutral800"
    marginBottom="1em"
    marginTop="1.4em"
    fontWeight="semiBold"
  />
);

const P = (props: TypographyProps) => (
  <Paragraph {...props} tag="p" variant="epsilon" textColor="neutral700" fontSize={2} />
);

const codeStyles = css`
  color: ${({ theme }) => theme.colors.neutral700};
  background-color: ${({ theme }) => theme.colors.neutral200};
  border: none;
  padding: 0.6rem;
`;

const Paragraph = styled<TypographyComponent<'p'>>(Typography)`
  & code {
    ${codeStyles}
  }

  & + & {
    margin-block-start: 1.5em;
  }
`;

const Li = (props: TypographyProps) => <ListItem tag="li" variant="epsilon" textColor="neutral700" {...props} />;

const ListItem = styled(Typography)`
  & code {
    ${codeStyles}
  }
`;

export { H1, H2, H3, H4, P, Li };
