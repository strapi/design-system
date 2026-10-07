/*
 * Shared, internal parts of the form pickers: Select, Combobox, DatePicker and TimePicker.
 * They are not exported from the `/next` barrel.
 */
import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

/* -------------------------------------------------------------------------------------------------
 * Icons
 *
 * The @strapi/icons components read the styled-components theme, which a page without the old
 * provider does not have, so the few icons that the pickers need are inlined here. Same paths.
 * -----------------------------------------------------------------------------------------------*/

type IconProps = React.ComponentPropsWithoutRef<'svg'>;

const makeIcon = (name: string, path: string) => {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={16}
      height={16}
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={cn('size-4 shrink-0', className)}
      {...props}
    >
      <path d={path} />
    </svg>
  ));
  Icon.displayName = name;

  return Icon;
};

const CaretDownIcon = makeIcon(
  'CaretDownIcon',
  'm26.708 12.708-10 10a1 1 0 0 1-1.415 0l-10-10A1 1 0 0 1 6 11h20a1 1 0 0 1 .707 1.707',
);
const CrossIcon = makeIcon(
  'CrossIcon',
  'M26.061 23.939a1.503 1.503 0 0 1-2.125 2.125L16 18.125l-7.939 7.936a1.503 1.503 0 1 1-2.125-2.125L13.875 16 5.939 8.061a1.503 1.503 0 1 1 2.125-2.125L16 13.875l7.939-7.94a1.502 1.502 0 1 1 2.125 2.125L18.125 16z',
);
const CheckIcon = makeIcon(
  'CheckIcon',
  'm29.061 10.061-16 16a1.5 1.5 0 0 1-2.125 0l-7-7a1.504 1.504 0 0 1 2.125-2.125L12 22.875 26.939 7.939a1.502 1.502 0 1 1 2.125 2.125z',
);
const MinusIcon = makeIcon('MinusIcon', 'M28.5 16a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 1 1 0-3h22a1.5 1.5 0 0 1 1.5 1.5');
const CalendarIcon = makeIcon(
  'CalendarIcon',
  'M26 4h-3V3a1 1 0 0 0-2 0v1H11V3a1 1 0 0 0-2 0v1H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 6H6V6h3v1a1 1 0 0 0 2 0V6h10v1a1 1 0 0 0 2 0V6h3z',
);
const ClockIcon = makeIcon(
  'ClockIcon',
  'M16 3a13 13 0 1 0 13 13A13.013 13.013 0 0 0 16 3m7 14h-7a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v6h6a1 1 0 0 1 0 2',
);
const ChevronLeftIcon = makeIcon(
  'ChevronLeftIcon',
  'M21.061 24.939a1.503 1.503 0 0 1-2.125 2.125l-10-10a1.5 1.5 0 0 1 0-2.125l10-10a1.503 1.503 0 0 1 2.125 2.125L12.125 16z',
);
const ChevronRightIcon = makeIcon(
  'ChevronRightIcon',
  'm23.061 17.061-10 10a1.503 1.503 0 0 1-2.125-2.125L19.875 16l-8.936-8.939a1.502 1.502 0 1 1 2.125-2.125l10 10a1.5 1.5 0 0 1-.003 2.125',
);

/* -------------------------------------------------------------------------------------------------
 * PickerLoader
 *
 * The legacy small Loader: a spinning 2.4rem image announced by an assertive live region.
 * -----------------------------------------------------------------------------------------------*/

const PickerLoader = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ children = 'Loading', className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      data-slot="picker-loader"
      className={cn('inline-flex shrink-0', className)}
      {...props}
    >
      <span className="sr-only">{children}</span>
      <svg
        role="img"
        aria-hidden
        focusable="false"
        viewBox="0 0 63 63"
        fill="currentColor"
        className="size-6 text-primary-600 motion-safe:animate-spin"
      >
        <path d="M42.5563 11.9816C39.484 10.3071 35.8575 9.29097 32.3354 9.13521C28.6443 8.92888 24.8295 9.72318 21.3336 11.4129C20.9123 11.5901 20.5376 11.8101 20.1722 12.0249L20.0108 12.1179C19.8774 12.1951 19.7441 12.2724 19.608 12.3536C19.3253 12.5146 19.0492 12.6744 18.7544 12.8792C18.5463 13.0329 18.3395 13.1759 18.1301 13.323C17.5658 13.7208 16.9868 14.1317 16.4983 14.5979C14.8476 15.9524 13.5571 17.6075 12.6071 18.9214C10.4365 22.1566 9.08622 25.9567 8.80702 29.6143L8.7764 30.1588C8.73328 30.9196 8.68476 31.7057 8.75353 32.4555C8.76648 32.6084 8.7661 32.7638 8.77506 32.914C8.78895 33.229 8.80152 33.5373 8.846 33.8672L9.07396 35.4221C9.09756 35.5764 9.1198 35.7413 9.1633 35.9263L9.65919 37.9272L10.138 39.2823C10.2729 39.6673 10.4158 40.0751 10.6 40.43C12.0292 43.637 14.1425 46.4578 16.7063 48.585C19.0508 50.5296 21.824 52.0023 24.7491 52.8452L26.2371 53.2376C26.3781 53.2693 26.4926 53.2889 26.6031 53.3058L26.7775 53.3311C27.0052 53.3636 27.2195 53.3986 27.4445 53.435C27.8598 53.5076 28.2672 53.5748 28.7079 53.6183L30.5641 53.7229C30.9516 53.7249 31.3352 53.7068 31.7081 53.6874C31.9039 53.681 32.0984 53.6681 32.3288 53.662C34.5253 53.4772 36.5106 53.0634 38.0516 52.4652C38.1769 52.4171 38.3008 52.3796 38.4234 52.3355C38.6727 52.2499 38.9259 52.167 39.1432 52.0599L40.8591 51.2626L42.5702 50.266C42.9009 50.0682 43.0205 49.6414 42.8282 49.2984C42.632 48.9526 42.2034 48.8308 41.8634 49.0166L40.1792 49.9218L38.4995 50.6224C38.3169 50.6953 38.121 50.7534 37.9224 50.8155C37.7838 50.8489 37.6518 50.8983 37.5012 50.9408C36.0711 51.435 34.2445 51.7425 32.244 51.8346C32.0442 51.8383 31.8471 51.8379 31.654 51.8403C31.3051 51.8414 30.9602 51.8451 30.6392 51.8305L28.9177 51.6725C28.5476 51.619 28.1695 51.5427 27.7848 51.4678C27.5639 51.4167 27.3376 51.3737 27.1299 51.3374L26.9529 51.2987C26.8704 51.2834 26.7772 51.2667 26.7333 51.2543L25.3466 50.8322C22.7651 49.9789 20.33 48.5729 18.2942 46.7557C16.1056 44.7951 14.3339 42.2335 13.1742 39.3582C12.0276 36.6013 11.5988 33.2792 11.9716 30.0076C12.3145 27.0213 13.3948 24.1635 15.1858 21.5083C15.3034 21.3339 15.421 21.1596 15.5212 21.0196C16.4309 19.8688 17.5408 18.5589 18.9483 17.496C19.3367 17.1525 19.7862 16.856 20.2611 16.5478C20.4878 16.4009 20.7079 16.2553 20.8907 16.1306C21.0974 16.0048 21.3188 15.8831 21.5348 15.7694C21.6761 15.6975 21.8162 15.619 21.9388 15.5576L22.1002 15.4646C22.4002 15.3037 22.6749 15.1546 22.9908 15.039L24.1186 14.5715C24.3399 14.4844 24.5718 14.4159 24.7997 14.3447C24.953 14.2982 25.0982 14.2635 25.2635 14.2078C25.786 14.0182 26.3283 13.9112 26.9105 13.7965C27.117 13.7571 27.3302 13.7163 27.5608 13.6585C27.7553 13.611 27.9737 13.5969 28.2082 13.5762C28.364 13.5603 28.5172 13.5483 28.6318 13.5333C28.7876 13.5173 28.9342 13.5066 29.0927 13.4867C29.3285 13.4555 29.5456 13.4347 29.7494 13.4337C30.0237 13.44 30.2994 13.4357 30.5777 13.4274C31.0811 13.421 31.5579 13.4197 32.0318 13.4914C34.9664 13.7352 37.7144 14.6085 40.2052 16.0868C42.3489 17.3655 44.2716 19.1525 45.7607 21.264C47.0255 23.0628 47.9756 25.0528 48.4928 27.0393C48.572 27.3176 48.6299 27.5931 48.6839 27.8659C48.7154 28.0428 48.7563 28.2145 48.7892 28.3636C48.8037 28.4541 48.8208 28.5406 48.8445 28.6258C48.8749 28.7443 48.8986 28.864 48.9116 28.9651L48.9793 29.6047C48.9922 29.7748 49.0132 29.9331 49.0301 30.0887C49.0668 30.3268 49.0889 30.5608 49.0964 30.7561L49.1083 31.9001C49.1312 32.3307 49.089 32.7116 49.0522 33.0673C49.0384 33.2598 49.0126 33.4443 49.0123 33.5824C48.9961 33.6926 48.9918 33.7935 48.9836 33.8917C48.9753 34.0072 48.9724 34.1148 48.9414 34.2554L48.5449 36.3059C48.3134 37.8623 49.3793 39.3365 50.9488 39.5822C52.0417 39.7601 53.1536 39.2819 53.7711 38.3664C54.0063 38.0176 54.1604 37.6257 54.2227 37.2064L54.5217 35.2574C54.5514 35.0756 54.572 34.83 54.5846 34.5791L54.6028 34.2338C54.6098 34.0598 54.6223 33.8779 54.6347 33.6788C54.6734 33.1052 54.7163 32.4479 54.6619 31.8058L54.5867 30.4289C54.5622 30.0952 54.5097 29.76 54.4559 29.4181C54.431 29.2572 54.4048 29.0896 54.3826 28.9074L54.2687 28.104C54.2332 27.9244 54.1804 27.7273 54.1329 27.5396L54.0643 27.2454C54.0195 27.071 53.9773 26.8927 53.9338 26.7076C53.8455 26.3309 53.7479 25.9422 53.613 25.5571C52.84 23.0292 51.5383 20.5194 49.8338 18.2799C47.8544 15.682 45.3333 13.5087 42.5563 11.9816Z" />
      </svg>
    </div>
  ),
);
PickerLoader.displayName = 'PickerLoader';

/* -------------------------------------------------------------------------------------------------
 * PickerClearButton
 *
 * The legacy `IconButton size="XS" variant="ghost"`: 0.7rem padding on mobile, 0.2rem from the medium
 * breakpoint, a transparent border, a neutral500 icon and a neutral100 hover.
 * -----------------------------------------------------------------------------------------------*/

interface PickerClearButtonProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'aria-label'> {
  label: string;
}

const PickerClearButton = React.forwardRef<HTMLButtonElement, PickerClearButtonProps>(
  ({ className, label, disabled, onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-slot="picker-clear"
      aria-label={label}
      aria-disabled={disabled || undefined}
      title={label}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-solid border-transparent bg-transparent size-8 text-neutral-500 outline-none hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:bg-neutral-150 aria-disabled:cursor-not-allowed aria-disabled:hover:bg-transparent medium:p-0.5',
        className,
      )}
      onClick={(event) => {
        if (disabled) {
          return;
        }

        onClick?.(event);
      }}
      {...props}
    >
      <CrossIcon />
    </button>
  ),
);
PickerClearButton.displayName = 'PickerClearButton';

/* -------------------------------------------------------------------------------------------------
 * Field frame
 *
 * The legacy bordered box of the Select, Combobox, DatePicker and TimePicker triggers.
 * -----------------------------------------------------------------------------------------------*/

type PickerSize = 'S' | 'M';

const pickerFrameVariants = cva(
  [
    'relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-md border border-solid border-neutral-200 bg-neutral-0 pr-3 pl-4 text-left text-neutral-800',
    'outline-none transition duration-200',
    'focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600',
    'data-invalid:border-danger-600 data-invalid:focus-within:border-danger-600 data-invalid:focus-within:ring-danger-600',
    'data-disabled:cursor-not-allowed data-disabled:bg-neutral-150 data-disabled:text-neutral-600',
  ],
  {
    variants: {
      size: {
        // The 1px removed on mobile compensates for the border, like the legacy `clearableFieldPaddingStyles`
        S: 'py-2 medium:py-1',
        M: 'py-3 medium:py-2',
      },
      // A visible clear button is taller than the text, so the block padding shrinks to keep the height
      compact: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'S', compact: true, className: 'py-1' },
      { size: 'M', compact: true, className: 'py-2' },
    ],
    defaultVariants: {
      size: 'M',
      compact: false,
    },
  },
);

/** The legacy `inputTextStyles`: 1.6rem/2.4rem on mobile, 1.4rem/2.2rem from the medium breakpoint */
const pickerTextClassName = 'text-base leading-6 medium:text-sm medium:leading-5.5';

/** The legacy popover surface of the pickers */
const pickerPopupClassName = cn(
  'rounded-md border border-solid border-neutral-150 bg-neutral-0 text-neutral-800 shadow-filter outline-none',
  'motion-safe:transition motion-safe:duration-200 motion-safe:ease-in-out',
  'data-starting-style:opacity-0 data-[side=bottom]:data-starting-style:-translate-y-2.5 data-[side=top]:data-starting-style:translate-y-2.5',
);

/** The legacy option row of the Select and the Combobox */
const pickerOptionClassName = cn(
  'flex w-full cursor-pointer items-center gap-2 rounded-md border-none bg-neutral-0 px-4 py-2 text-left whitespace-nowrap text-neutral-800 outline-none select-none',
  'text-base medium:text-sm medium:leading-5',
  'hover:bg-primary-100 data-highlighted:bg-primary-100',
  'data-disabled:cursor-not-allowed data-disabled:opacity-50',
);

/* -------------------------------------------------------------------------------------------------
 * Helpers
 * -----------------------------------------------------------------------------------------------*/

/** Reads the text of a React node, so an option without `textValue` still gets a label */
const getNodeText = (node: React.ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return '';
};

/** Calls the IntersectionObserver callback when the sentinel at the end of a scrollable list shows */
const useReachEnd = (
  root: HTMLElement | null,
  sentinel: HTMLElement | null,
  callback: ((entry: IntersectionObserverEntry) => void) | undefined,
  enabled = true,
) => {
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;

  React.useEffect(() => {
    if (!enabled || !root || !sentinel || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only a list that scrolls has an end to reach, like the legacy `useIntersection`
          if (entry.isIntersecting && root.scrollHeight > root.clientHeight) {
            callbackRef.current?.(entry);
          }
        });
      },
      { root, rootMargin: '0px' },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [enabled, root, sentinel]);
};

/* -------------------------------------------------------------------------------------------------
 * State
 * -----------------------------------------------------------------------------------------------*/

/** A controlled or uncontrolled state. `isEqual` skips the updates that do not change the value */
function useControllable<T>(
  prop: T | undefined,
  defaultProp: T,
  onChange?: (value: T) => void,
  isEqual: (a: T, b: T) => boolean = Object.is,
) {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? (prop as T) : uncontrolled;

  const valueRef = React.useRef(value);
  valueRef.current = value;

  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const isEqualRef = React.useRef(isEqual);
  isEqualRef.current = isEqual;

  const setValue = React.useCallback(
    (next: T) => {
      if (isEqualRef.current(next, valueRef.current)) {
        return;
      }

      if (!isControlled) {
        setUncontrolled(next);
      }

      valueRef.current = next;
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [value, setValue] as const;
}

export {
  CalendarIcon,
  CaretDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CrossIcon,
  MinusIcon,
  PickerClearButton,
  PickerLoader,
  getNodeText,
  pickerFrameVariants,
  pickerOptionClassName,
  pickerPopupClassName,
  pickerTextClassName,
  useControllable,
  useReachEnd,
};
export type { PickerClearButtonProps, PickerSize };
