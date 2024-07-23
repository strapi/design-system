import { styled } from 'styled-components';

import { PolymorphicComponentProps } from '../../types';

type VisuallyHiddenProps<C extends React.ElementType = 'span'> = PolymorphicComponentProps<
  C,
  { children?: React.ReactNode }
>;

const VisuallyHidden = <C extends React.ElementType = 'span'>({ tag, ...props }: VisuallyHiddenProps<C>) => {
  const AsComponent = tag || 'span';

  return <Span {...props} as={AsComponent} />;
};

const Span = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export { VisuallyHidden };
