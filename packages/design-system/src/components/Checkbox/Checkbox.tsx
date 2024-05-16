import * as React from 'react';

import * as Checkbox from '@radix-ui/react-checkbox';
import { styled, useTheme } from 'styled-components';

import { useComposedRefs } from '../../hooks/useComposeRefs';
import { useControllableState } from '../../hooks/useControllableState';
import { useId } from '../../hooks/useId';
import { Box, BoxProps } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

/* -------------------------------------------------------------------------------------------------
 * CheckIcon
 * -----------------------------------------------------------------------------------------------*/

const CheckIcon = ({ fill, ...props }: BoxProps<'svg'>) => {
  const { colors } = useTheme();

  return (
    <Box
      tag="svg"
      viewBox="0 0 10 8"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill ? colors[fill] : undefined}
      {...props}
    >
      <path d="M8.55323 0.396973C8.63135 0.316355 8.76051 0.315811 8.83931 0.395768L9.86256 1.43407C9.93893 1.51157 9.93935 1.6359 9.86349 1.7139L4.06401 7.67724C3.9859 7.75755 3.85707 7.75805 3.77834 7.67834L0.13866 3.99333C0.0617798 3.91549 0.0617102 3.79032 0.138504 3.7124L1.16213 2.67372C1.24038 2.59432 1.36843 2.59422 1.4468 2.67348L3.92174 5.17647L8.55323 0.396973Z" />
    </Box>
  );
};

/* -------------------------------------------------------------------------------------------------
 * CheckboxEl
 * -----------------------------------------------------------------------------------------------*/

interface CheckboxElProps extends Checkbox.CheckboxProps {}

type CheckboxElement = HTMLButtonElement;

const CheckboxEl = React.forwardRef<CheckboxElement, CheckboxElProps>(
  ({ defaultChecked, checked: checkedProp, onCheckedChange, ...props }, forwardedRef) => {
    const checkboxRef = React.useRef<CheckboxElement>(null!);
    const [checked, setChecked] = useControllableState({
      defaultProp: defaultChecked,
      prop: checkedProp,
      onChange: onCheckedChange,
    });

    const composedRefs = useComposedRefs(checkboxRef, forwardedRef);

    return (
      <CheckboxRoot ref={composedRefs} checked={checked} onCheckedChange={setChecked} {...props}>
        <Checkbox.Indicator>
          {checked === true ? <CheckIcon width="1rem" fill="neutral0" /> : null}
          {checked === 'indeterminate' ? (
            <Box height="2px" width="1rem" background="neutral0" borderRadius="1px" />
          ) : null}
        </Checkbox.Indicator>
      </CheckboxRoot>
    );
  },
);

const CheckboxRoot = styled(Checkbox.Root)`
  background: ${(props) => props.theme.colors.neutral0};
  width: 2rem;
  height: 2rem;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.colors.neutral300};
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  // this ensures the checkbox is always a square even in flex-containers.
  flex: 0 0 2rem;

  @media (prefers-reduced-motion: no-preference) {
    transition:
      border-color ${(props) => props.theme.motion.timings['120']} ${(props) => props.theme.motion.easings.easeOutQuad},
      ${(props) => props.theme.transitions.backgroundColor};
  }

  &[data-state='checked'],
  &[data-state='indeterminate'] {
    border: 1px solid ${(props) => props.theme.colors.primary600};
    background-color: ${(props) => props.theme.colors.primary600};
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

/* -------------------------------------------------------------------------------------------------
 * Checkbox
 * -----------------------------------------------------------------------------------------------*/

interface CheckboxProps extends CheckboxElProps {}

const CheckboxImpl = React.forwardRef<CheckboxElement, CheckboxProps>(({ children, ...restProps }, forwardedRef) => {
  const labelId = useId(restProps.id);

  if (!children) {
    return <CheckboxEl ref={forwardedRef} {...restProps} />;
  }

  return (
    <Flex gap={2}>
      <CheckboxEl id={labelId} {...restProps} />
      <Typography tag="label" textColor="neutral800" htmlFor={labelId}>
        {children}
      </Typography>
    </Flex>
  );
});

export { CheckboxImpl as Checkbox };
export type { CheckboxProps, CheckboxElProps, CheckboxElement };
