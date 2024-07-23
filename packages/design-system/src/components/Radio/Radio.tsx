import * as React from 'react';

import * as RadioGroup from '@radix-ui/react-radio-group';
import { styled } from 'styled-components';

import { useId } from '../../hooks/useId';
import { Flex } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';
import { ANIMATIONS } from '../../styles/motion';

/* -------------------------------------------------------------------------------------------------
 * Group
 * -----------------------------------------------------------------------------------------------*/

type GroupElement = HTMLDivElement;

interface GroupProps extends RadioGroup.RadioGroupProps {}

const Group = React.forwardRef<GroupElement, GroupProps>((props, forwardedRef) => {
  return <RadioGroupRoot ref={forwardedRef} {...props} />;
});

const RadioGroupRoot = styled(RadioGroup.Root)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spaces[3]};
`;

/* -------------------------------------------------------------------------------------------------
 * Item
 * -----------------------------------------------------------------------------------------------*/

type ItemElement = HTMLButtonElement;

interface ItemProps extends RadioGroup.RadioGroupItemProps {}

const Item = React.forwardRef<ItemElement, ItemProps>(({ children, id: idProp, ...restProps }, forwardedRef) => {
  const id = useId(idProp);

  return (
    <Flex gap={2}>
      <RadioGroupItem id={id} ref={forwardedRef} {...restProps}>
        <RadioGroupIndicator />
      </RadioGroupItem>
      <Typography tag="label" htmlFor={id}>
        {children}
      </Typography>
    </Flex>
  );
});

const RadioGroupItem = styled(RadioGroup.Item)`
  background: ${(props) => props.theme.colors.neutral0};
  width: 2rem;
  height: 2rem;
  flex: 0 0 2rem;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.neutral300};
  position: relative;
  z-index: 0;

  @media (prefers-reduced-motion: no-preference) {
    transition: border-color ${(props) => props.theme.motion.timings['120']}
      ${(props) => props.theme.motion.easings.easeOutQuad};
  }

  &[data-state='checked'] {
    border: 1px solid ${(props) => props.theme.colors.primary600};
  }

  &[data-disabled] {
    background-color: ${(props) => props.theme.colors.neutral200};
  }

  /* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
`;

const RadioGroupIndicator = styled(RadioGroup.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &[data-state='checked'] {
    @media (prefers-reduced-motion: no-preference) {
      animation: ${ANIMATIONS.popIn} ${(props) => props.theme.motion.timings['200']};
    }
  }

  &::after {
    content: '';
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primary600};
  }
`;

export { Group, Item };
export type { GroupElement, GroupProps, ItemElement, ItemProps };
