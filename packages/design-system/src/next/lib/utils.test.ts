import { cn } from './utils';

describe('cn', () => {
  it('lets a consumer class replace a legacy shadow', () => {
    expect(cn('shadow-table', 'shadow-none')).toBe('shadow-none');
    expect(cn('shadow-focus-inset', 'shadow-popup')).toBe('shadow-popup');
  });

  it('keeps a shadow and a shadow colour apart', () => {
    expect(cn('shadow-filter', 'shadow-neutral-200')).toBe('shadow-filter shadow-neutral-200');
  });

  it('reads text-2xs as a font size', () => {
    expect(cn('text-2xs', 'text-sm')).toBe('text-sm');
    expect(cn('text-2xs', 'text-neutral-600')).toBe('text-2xs text-neutral-600');
  });
});
