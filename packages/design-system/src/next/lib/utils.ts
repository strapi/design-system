import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/*
 * tailwind-merge only knows the stock theme. Without this, it reads our shadows (`shadow-table`, ...)
 * as shadow colours and our `text-2xs` as a text colour, so a consumer `shadow-none` or `text-sm`
 * would not replace them
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      shadow: ['filter', 'popup', 'table', 'focus', 'focus-inset'],
      text: ['2xs'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
