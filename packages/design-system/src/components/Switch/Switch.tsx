import * as React from 'react';

import * as Switch from '@radix-ui/react-switch';
import { composeEventHandlers } from '@strapi/ui-primitives';
import { styled } from 'styled-components';

import { useControllableState } from '../../hooks/useControllableState';
import { Flex } from '../../primitives/Flex';
import { Typography, TypographyComponent } from '../../primitives/Typography';

interface SwitchProps extends Omit<Switch.SwitchProps, 'children'> {
  onLabel?: string;
  offLabel?: string;
  visibleLabels?: boolean;
}

const SwitchImpl = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      visibleLabels,
      onLabel = 'On',
      offLabel = 'Off',
      onCheckedChange: onCheckedChangeProp,
      checked: checkedProp,
      defaultChecked,
      disabled,
      ...restProps
    },
    forwardedRef,
  ) => {
    const [internalChecked, setInternalChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked,
    });

    const handleCheckChange: SwitchProps['onCheckedChange'] = (checked) => {
      setInternalChecked(checked);
    };

    return (
      <Flex gap={3}>
        <SwitchRoot
          ref={forwardedRef}
          onCheckedChange={composeEventHandlers(onCheckedChangeProp, handleCheckChange)}
          checked={internalChecked}
          disabled={disabled}
          {...restProps}
        >
          <SwitchThumb />
        </SwitchRoot>
        {visibleLabels ? (
          <LabelTypography aria-hidden data-disabled={disabled} data-state={internalChecked ? 'checked' : 'unchecked'}>
            {internalChecked ? onLabel : offLabel}
          </LabelTypography>
        ) : null}
      </Flex>
    );
  },
);

const SwitchRoot = styled(Switch.Root)`
  width: 4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.danger500};

  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.colors.success500};
  }

  &[data-disabled] {
    background-color: ${({ theme }) => theme.colors.neutral300};
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: ${(props) => props.theme.transitions.backgroundColor};
  }
`;

const SwitchThumb = styled(Switch.Thumb)`
  display: block;
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neutral0};
  transform: translateX(4px);

  &[data-state='checked'] {
    transform: translateX(20px);
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: transform ${(props) => props.theme.motion.timings['120']}
      ${(props) => props.theme.motion.easings.authenticMotion};
  }
`;

const LabelTypography = styled<TypographyComponent>(Typography)`
  color: ${(props) => props.theme.colors.danger600};

  &[data-state='checked'] {
    color: ${(props) => props.theme.colors.success600};
  }

  &[data-disabled='true'] {
    color: ${({ theme }) => theme.colors.neutral500};
  }
`;

export { SwitchImpl as Switch };
export type { SwitchProps };
