import { Typography } from '@strapi/design-system';
import { styled } from 'styled-components';

const TEXT_VARIANTS = ['alpha', 'beta', 'delta', 'epsilon', 'omega', 'pi', 'sigma'] as const;

const SAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog';

const Typescale = () => {
  return (
    <TypeGrid>
      {TEXT_VARIANTS.map((style) => (
        <>
          <Typography variant="sigma" textAlign="right" textColor="neutral600">
            {style}
          </Typography>
          <Typography variant={style}>{SAMPLE_TEXT}</Typography>
        </>
      ))}
    </TypeGrid>
  );
};

const TypeGrid = styled.dl`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-column-gap: 3.2rem;
  grid-row-gap: 6rem;
  align-items: end;
  margin-block: 4rem;
`;

export { Typescale };
