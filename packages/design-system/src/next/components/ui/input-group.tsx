import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { inputBoxClassName, inputVariants } from './input';

/**
 * A bordered box that holds a control (`InputGroupInput` or `InputGroupTextarea`) and addons around it.
 * It takes the legacy input look, and the error and disabled looks from the control inside.
 * For a single input with start and end actions, prefer `Input`.
 */
const InputGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="input-group"
        role="group"
        className={cn(
          inputBoxClassName,
          'group/input-group has-[[data-slot=input-group-control][aria-invalid=true]]:border-danger-600 has-[[data-slot=input-group-control][aria-invalid=true]]:focus-within:ring-danger-600 has-[[data-slot=input-group-control]:disabled]:bg-neutral-150 has-[[data-slot=input-group-control]:disabled]:text-neutral-600',
          'has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col has-[>textarea]:items-stretch',
          className,
        )}
        {...props}
      />
    );
  },
);

InputGroup.displayName = 'InputGroup';

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 text-sm text-neutral-500 select-none group-has-[:disabled]/input-group:cursor-not-allowed [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        'inline-start': 'order-first ps-4',
        'inline-end': 'order-last pe-4',
        'block-start': 'order-first w-full justify-start px-4 pt-3',
        'block-end': 'order-last w-full justify-start px-4 pb-3',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
);

const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & VariantProps<typeof inputGroupAddonVariants>
>(({ className, align = 'inline-start', onClick, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        onClick?.(event);

        if ((event.target as HTMLElement).closest('button')) {
          return;
        }

        event.currentTarget.parentElement?.querySelector<HTMLElement>('input, textarea')?.focus();
      }}
      {...props}
    />
  );
});

InputGroupAddon.displayName = 'InputGroupAddon';

const inputGroupButtonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-solid border-transparent bg-transparent text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:bg-neutral-150 disabled:cursor-not-allowed disabled:text-neutral-600 [&_svg]:shrink-0 [&_svg]:text-neutral-500',
  {
    variants: {
      // Only the legacy ghost look. The prop stays so the shadcn call sites (`variant="ghost"`) keep working
      variant: {
        ghost: '',
      },
      size: {
        xs: 'h-6 px-2',
        sm: 'h-8 px-4',
        'icon-xs': 'size-8 medium:size-6',
        'icon-sm': 'size-10 medium:size-8',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'xs',
    },
  },
);

type InputGroupButtonProps = Omit<ButtonPrimitive.Props, 'className' | 'type'> &
  VariantProps<typeof inputGroupButtonVariants> & {
    className?: string;
    type?: 'button' | 'submit' | 'reset';
  };

const InputGroupButton = React.forwardRef<HTMLButtonElement, InputGroupButtonProps>(
  ({ className, type = 'button', variant = 'ghost', size = 'xs', ...props }, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        type={type}
        data-slot="input-group-button"
        data-size={size}
        className={cn(inputGroupButtonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

InputGroupButton.displayName = 'InputGroupButton';

const InputGroupText = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="input-group-text"
        className={cn(
          "flex items-center gap-2 text-sm text-neutral-600 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      />
    );
  },
);

InputGroupText.displayName = 'InputGroupText';

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> & { size?: 'S' | 'M' }
>(({ className, size = 'M', ...props }, ref) => {
  return (
    <input
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        inputVariants({ size }),
        'flex-1 group-has-[>[data-align=inline-start]]/input-group:ps-2 group-has-[>[data-align=inline-end]]/input-group:pe-2',
        className,
      )}
      {...props}
    />
  );
});

InputGroupInput.displayName = 'InputGroupInput';

const InputGroupTextarea = React.forwardRef<HTMLTextAreaElement, React.ComponentPropsWithoutRef<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="input-group-control"
        className={cn(
          'block min-h-26 w-full flex-1 resize-none rounded-md border-none bg-inherit p-4 text-base leading-snug text-neutral-800 outline-none focus:outline-none placeholder:text-neutral-600 placeholder:opacity-100 disabled:cursor-not-allowed small:text-sm',
          className,
        )}
        {...props}
      />
    );
  },
);

InputGroupTextarea.displayName = 'InputGroupTextarea';

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupButtonVariants,
};
