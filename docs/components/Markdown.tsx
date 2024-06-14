import { Markdown as MarkdownImpl } from '@storybook/blocks';
import { BaseLink } from '@strapi/design-system';
import { styled, css } from 'styled-components';

import { DeprecationNotice } from './DeprecationNotice';
import { Image } from './Image';
import { TypeTable } from './TypeTable';
import { H1, H2, H3, H4, Li, P } from './Typography';
import { ViewSource } from './ViewSource';

/* -------------------------------------------------------------------------------------------------
 * List
 * -----------------------------------------------------------------------------------------------*/

const listStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces[2]};
  margin-inline-start: ${({ theme }) => theme.spaces[0]};
  margin-inline-end: ${({ theme }) => theme.spaces[0]};
  padding-inline-start: ${({ theme }) => theme.spaces[2]};
  margin-block: 2rem;

  ol,
  ul {
    margin-block-start: ${({ theme }) => theme.spaces[0]};
    margin-block-end: ${({ theme }) => theme.spaces[0]};
  }

  li {
    margin-inline-start: ${({ theme }) => theme.spaces[3]};
  }
`;

const Orderedlist = styled.ol`
  list-style: decimal;
  ${listStyle}
`;

const Unorderedlist = styled.ul`
  list-style: disc;
  ${listStyle}
`;

/* -------------------------------------------------------------------------------------------------
 * Anchor
 * -----------------------------------------------------------------------------------------------*/

const Anchor = styled(BaseLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary700};

  & > code {
    color: inherit;
  }

  &:visited {
    color: ${({ theme }) => theme.colors.primary700};
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Divide
 * -----------------------------------------------------------------------------------------------*/

const Divider = styled.hr`
  margin-block: 4rem;
`;

/* -------------------------------------------------------------------------------------------------
 * Markdown
 * -----------------------------------------------------------------------------------------------*/

const BASE_MARKDOWN_OVERRIDES = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  img: Image,
  ul: Unorderedlist,
  ol: Orderedlist,
  li: Li,
  // Must use target="_parent" to open links in the same window otherwise the iframes start nesting.
  a: (props) => <Anchor {...props} target="_parent" />,
  hr: Divider,
};

const Markdown = (props) => {
  return (
    <MarkdownImpl
      {...props}
      options={{
        overrides: BASE_MARKDOWN_OVERRIDES,
      }}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * MARKDOWN_OVERRIDES
 * -----------------------------------------------------------------------------------------------*/

const MARKDOWN_OVERRIDES = {
  ...BASE_MARKDOWN_OVERRIDES,
  ViewSource,
  DeprecationNotice,
  Markdown,
  TypeTable,
};

export { Markdown, MARKDOWN_OVERRIDES };
