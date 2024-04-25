import { Typography, TypographyProps } from '@strapi/design-system';
import styled, { css } from 'styled-components';

const H1 = (props: TypographyProps) => (
  <Typography as="h1" variant="alpha" textColor="neutral800" marginBottom="0.5em" {...props} />
);

const H2 = (props: TypographyProps) => (
  <Typography as="h2" variant="beta" textColor="neutral800" marginBottom="1em" marginTop="2em" {...props} />
);

const H3 = (props: TypographyProps) => (
  <Typography as="h3" variant="delta" textColor="neutral800" marginBottom="1em" marginTop="1.4em" {...props} />
);

const H4 = (props: TypographyProps) => (
  <Typography
    as="h4"
    variant="epsilon"
    textColor="neutral800"
    marginBottom="1em"
    marginTop="1.4em"
    fontWeight="bold"
    {...props}
  />
);

const P = (props: TypographyProps) => <Paragraph as="p" variant="epsilon" textColor="neutral700" {...props} />;

const codeStyles = css`
  color: ${({ theme }) => theme.colors.neutral700};
  background-color: ${({ theme }) => theme.colors.neutral200};
  border: none;
  padding: 0.6rem;
`;

const Paragraph = styled(Typography)`
  & code {
    ${codeStyles}
  }

  & + & {
    margin-block-start: 1.5em;
  }
`;

const Li = (props: TypographyProps) => <ListItem as="li" variant="epsilon" textColor="neutral700" {...props} />;

const ListItem = styled(Typography)`
  & code {
    ${codeStyles}
  }
`;

export { H1, H2, H3, H4, P, Li };
