import * as React from 'react';

import { css, styled } from 'styled-components';

import { createContext } from '../../helpers/context';
import { useComposedRefs } from '../../hooks/useComposeRefs';
import { useId } from '../../hooks/useId';
import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';
import { Typography, TypographyProps } from '../../primitives/Typography';
import { inputFocusStyle } from '../../themes';
import { AccessibleIcon } from '../../utilities/AccessibleIcon';

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface FieldContextValue {
  /**
   * @default false
   */
  error?: string | boolean;
  /**
   * @default null
   */
  hint?: React.ReactNode;
  id?: string;
  labelNode?: HTMLLabelElement;
  name?: string;
  /**
   * @default false
   */
  required?: boolean;
  setLabelNode?: (node: HTMLLabelElement) => void;
}

const [FieldProvider, useField] = createContext<FieldContextValue>('Field', {});

interface RootProps extends FlexProps, Omit<Partial<FieldContextValue>, 'labelNode' | 'setLabelNode'> {
  children: React.ReactNode;
}

const Root = React.forwardRef<HTMLDivElement, RootProps>(
  ({ children, name, error = false, hint, id, required = false, ...props }, ref) => {
    const generatedId = useId(id);
    const [labelNode, setLabelNode] = React.useState<HTMLLabelElement>();

    return (
      <FieldProvider
        name={name}
        id={generatedId}
        error={error}
        hint={hint}
        required={required}
        labelNode={labelNode}
        setLabelNode={setLabelNode}
      >
        <Flex direction="column" alignItems="stretch" gap={1} ref={ref} {...props}>
          {children}
        </Flex>
      </FieldProvider>
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * Label
 * -----------------------------------------------------------------------------------------------*/

interface LabelProps extends Omit<TypographyProps<'label'>, 'tag' | 'htmlFor'> {
  action?: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ children, action, ...props }, ref) => {
  const { id, required, setLabelNode } = useField('Label');

  const composedRefs = useComposedRefs(ref, setLabelNode);

  if (!children) {
    return null;
  }

  return (
    <TypographyLabel
      ref={composedRefs}
      variant="pi"
      textColor="neutral800"
      fontWeight="bold"
      {...props}
      id={`${id}-label`}
      htmlFor={id}
      tag="label"
      ellipsis
    >
      {children}
      {required && (
        <Typography aria-hidden lineHeight="1em" textColor="danger600">
          *
        </Typography>
      )}
      {action && <LabelAction marginLeft={1}>{action}</LabelAction>}
    </TypographyLabel>
  );
});

const TypographyLabel = styled(Typography)`
  display: flex;
`;

const LabelAction = styled<FlexComponent>(Flex)`
  line-height: 0;
  color: ${({ theme }) => theme.colors.neutral500};
`;

/* -------------------------------------------------------------------------------------------------
 * Input
 * -----------------------------------------------------------------------------------------------*/

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  disabled?: boolean;
  endAction?: React.ReactNode;
  /**
   * If you're not using this in the FieldProvider
   * you can provide the error state manually
   */
  hasError?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * @default "M"
   */
  size?: 'S' | 'M';
  startAction?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      endAction,
      startAction,
      disabled = false,
      onChange,
      hasError: hasErrorProp,
      required: requiredProp,
      className,
      size = 'M',
      ...props
    },
    ref,
  ) => {
    const { id, error, hint, name, required } = useField('Input');

    let ariaDescription: string | undefined;

    if (error) {
      ariaDescription = `${id}-error`;
    } else if (hint) {
      ariaDescription = `${id}-hint`;
    }

    const hasError = Boolean(error);
    const endActionRef = React.useRef<HTMLDivElement>(null);
    const inputElementRef = React.useRef<HTMLInputElement>(null);
    const inputRef = useComposedRefs(inputElementRef, ref);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (!disabled && onChange) {
        onChange(e);
      }
    };

    React.useLayoutEffect(() => {
      if (endActionRef.current && inputElementRef.current) {
        const endActionWidth = endActionRef.current.offsetWidth;
        const inputElement = inputElementRef.current;
        if (inputElement) {
          const inputPadding = endActionWidth + 8 + 16; // adjust padding 8px gap + 16px right padding
          inputElement.style.paddingRight = `${inputPadding}px`;
        }
      }
    }, [endAction]);

    return (
      <InputWrapper
        gap={2}
        justifyContent="space-between"
        $hasError={hasError || hasErrorProp}
        $disabled={disabled}
        $size={size}
        $hasLeftAction={Boolean(startAction)}
        $hasRightAction={Boolean(endAction)}
        className={className}
      >
        {startAction}
        <InputElement
          id={id}
          name={name}
          ref={inputRef}
          $size={size}
          aria-describedby={ariaDescription}
          aria-invalid={hasError || hasErrorProp}
          aria-disabled={disabled}
          disabled={disabled}
          data-disabled={disabled ? '' : undefined}
          onChange={handleChange}
          aria-required={required || requiredProp}
          $hasLeftAction={Boolean(startAction)}
          $hasRightAction={Boolean(endAction)}
          {...props}
        />
        {endAction && <EndAction ref={endActionRef}>{endAction}</EndAction>}
      </InputWrapper>
    );
  },
);

const InputElement = styled.input<{
  $size: InputProps['size'];
  $hasLeftAction: boolean;
  $hasRightAction: boolean;
}>`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: ${(props) => (props['aria-disabled'] ? 'not-allowed' : undefined)};

  color: ${({ theme }) => theme.colors.neutral800};
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes[2]};
  line-height: 2.2rem;
  display: block;
  width: 100%;
  background: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral600};
    opacity: 1;
  }

  &[aria-disabled='true'] {
    color: inherit;
  }

  //focus managed by InputWrapper
  &:focus {
    outline: none;
    box-shadow: none;
  }

  ${(props) => {
    switch (props.$size) {
      case 'S':
        return css`
          padding-inline-start: ${props.$hasLeftAction ? 0 : props.theme.spaces[4]};
          padding-inline-end: ${props.$hasRightAction ? 0 : props.theme.spaces[4]};
          padding-block: ${props.theme.spaces[1]};
        `;
      default:
        return css`
          padding-inline-start: ${props.$hasLeftAction ? 0 : props.theme.spaces[4]};
          padding-inline-end: ${props.$hasRightAction ? 0 : props.theme.spaces[4]};
          padding-block: ${props.theme.spaces[2]};
        `;
    }
  }}
`;

const EndAction = styled(Flex)`
  position: absolute;
  right: ${({ theme }) => theme.spaces[4]};
  top: 50%;
  transform: translateY(-50%);
`;

const InputWrapper = styled<FlexComponent>(Flex)<{
  $disabled?: boolean;
  $hasError?: boolean;
  $size: InputProps['size'];
  $hasLeftAction: boolean;
  $hasRightAction: boolean;
}>`
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  padding-inline-start: ${({ $hasLeftAction, theme }) => ($hasLeftAction ? theme.spaces[4] : 0)};
  position: relative;

  ${inputFocusStyle()}
  ${({ theme, $disabled }) =>
    $disabled
      ? css`
          color: ${theme.colors.neutral600};
          background: ${theme.colors.neutral150};
        `
      : undefined};
`;

/* -------------------------------------------------------------------------------------------------
 * Hint
 * -----------------------------------------------------------------------------------------------*/

const Hint = () => {
  const { id, hint, error } = useField('Hint');

  if (!hint || error) {
    return null;
  }

  return (
    <Typography variant="pi" tag="p" id={`${id}-hint`} textColor="neutral600">
      {hint}
    </Typography>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Error
 * -----------------------------------------------------------------------------------------------*/

const Error = () => {
  const { id, error } = useField('Error');

  if (!error || typeof error !== 'string') {
    return null;
  }

  return (
    <Typography variant="pi" tag="p" id={`${id}-error`} textColor="danger600" data-strapi-field-error>
      {error}
    </Typography>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Action
 * -----------------------------------------------------------------------------------------------*/

interface ActionProps extends Omit<FlexProps<'button'>, 'tag' | 'type'> {
  label: string;
  children: React.ReactNode;
}

const Action = React.forwardRef<HTMLButtonElement, ActionProps>(({ label, children, ...props }, ref) => (
  <FieldActionWrapper
    justifyContent="unset"
    background="transparent"
    borderStyle="none"
    {...props}
    type="button"
    tag="button"
    ref={ref}
  >
    <AccessibleIcon label={label}>{children}</AccessibleIcon>
  </FieldActionWrapper>
));

const FieldActionWrapper = styled<FlexComponent<'button'>>(Flex)`
  font-size: 1.6rem;
  padding: 0;
`;

type Props = RootProps;

export { Root, Label, Input, Hint, Error, Action, useField };
export type { Props, LabelProps, InputProps, ActionProps };
