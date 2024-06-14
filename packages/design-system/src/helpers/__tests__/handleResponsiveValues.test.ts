import { lightTheme } from '../../themes';
import { handleResponsiveValues } from '../handleResponsiveValues';

describe('handleResponsiveValues', () => {
  describe('spaces', () => {
    it('should handle simple string values', () => {
      expect(handleResponsiveValues({ padding: '1rem', margin: '4px' }, lightTheme)).toMatchInlineSnapshot(`
              "padding-block-start: 1rem;
              padding-inline-end: 1rem;
              padding-block-end: 1rem;
              padding-inline-start: 1rem;
              margin-block-start: 4px;
              margin-inline-end: 4px;
              margin-block-end: 4px;
              margin-inline-start: 4px;"
          `);
    });

    it('should handle simple space values from theme', () => {
      expect(handleResponsiveValues({ padding: 2, margin: 4 }, lightTheme)).toMatchInlineSnapshot(`
              "padding-block-start: 8px;
              padding-inline-end: 8px;
              padding-block-end: 8px;
              padding-inline-start: 8px;
              margin-block-start: 16px;
              margin-inline-end: 16px;
              margin-block-end: 16px;
              margin-inline-start: 16px;"
          `);
    });

    it('should handle responsive values with different breakpoints', () => {
      const result = handleResponsiveValues(
        {
          padding: {
            initial: 1,
            small: 2,
            medium: 3,
            large: 4,
          },
          margin: {
            initial: 2,
            small: 4,
            medium: 6,
            large: 8,
          },
        },
        lightTheme,
      );
      expect(result).toMatchInlineSnapshot(`
              "padding-block-start: 4px;
              padding-inline-end: 4px;
              padding-block-end: 4px;
              padding-inline-start: 4px;
              margin-block-start: 8px;
              margin-inline-end: 8px;
              margin-block-end: 8px;
              margin-inline-start: 8px;
              @media(min-width: 520px){ padding-block-start: 8px;
              padding-inline-end: 8px;
              padding-block-end: 8px;
              padding-inline-start: 8px;
              margin-block-start: 16px;
              margin-inline-end: 16px;
              margin-block-end: 16px;
              margin-inline-start: 16px; }
              @media(min-width: 768px){ padding-block-start: 12px;
              padding-inline-end: 12px;
              padding-block-end: 12px;
              padding-inline-start: 12px;
              margin-block-start: 24px;
              margin-inline-end: 24px;
              margin-block-end: 24px;
              margin-inline-start: 24px; }
              @media(min-width: 1280px){ padding-block-start: 16px;
              padding-inline-end: 16px;
              padding-block-end: 16px;
              padding-inline-start: 16px;
              margin-block-start: 40px;
              margin-inline-end: 40px;
              margin-block-end: 40px;
              margin-inline-start: 40px; }"
          `);
    });

    it('should handle responsive values with mixed prop type', () => {
      expect(
        handleResponsiveValues(
          {
            padding: {
              initial: 1,
              small: 2,
              medium: '1rem',
              large: 4,
            },
            // CSS specificity wont work here, so padding-right has to be after padding
            paddingRight: {
              initial: 2,
              small: 4,
              medium: 6,
              large: '8px',
            },
            margin: 2,
            marginTop: {
              initial: 1,
              small: '2rem',
            },
          },
          lightTheme,
        ),
      ).toMatchInlineSnapshot(`
              "padding-block-start: 4px;
              padding-inline-end: 8px;
              padding-block-end: 4px;
              padding-inline-start: 4px;
              margin-block-start: 4px;
              margin-inline-end: 8px;
              margin-block-end: 8px;
              margin-inline-start: 8px;
              @media(min-width: 520px){ padding-block-start: 8px;
              padding-inline-end: 16px;
              padding-block-end: 8px;
              padding-inline-start: 8px;
              margin-block-start: 2rem; }
              @media(min-width: 768px){ padding-block-start: 1rem;
              padding-inline-end: 24px;
              padding-block-end: 1rem;
              padding-inline-start: 1rem; }
              @media(min-width: 1280px){ padding-block-start: 16px;
              padding-inline-end: 8px;
              padding-block-end: 16px;
              padding-inline-start: 16px; }"
          `);
    });

    it('should handle responsive values with breakpoint array values', () => {
      expect(
        handleResponsiveValues(
          {
            padding: { initial: ['4rem'], medium: ['2rem', '4rem', '8rem'], large: 6 },
            margin: { initial: 2, medium: [2, '4px'], large: [6, '4px', 8] },
            marginTop: { initial: 4, medium: '1rem', large: '22px' },
          },
          lightTheme,
        ),
      ).toMatchInlineSnapshot(`
              "padding-block-start: 4rem;
              padding-inline-end: 4rem;
              padding-block-end: 4rem;
              padding-inline-start: 4rem;
              margin-block-start: 16px;
              margin-inline-end: 8px;
              margin-block-end: 8px;
              margin-inline-start: 8px;
              @media(min-width: 768px){ padding-block-start: 2rem;
              padding-inline-end: 4rem;
              padding-block-end: 8rem;
              padding-inline-start: 4rem;
              margin-block-start: 1rem;
              margin-inline-end: 4px;
              margin-block-end: 8px;
              margin-inline-start: 4px; }
              @media(min-width: 1280px){ padding-block-start: 24px;
              padding-inline-end: 24px;
              padding-block-end: 24px;
              padding-inline-start: 24px;
              margin-block-start: 22px;
              margin-inline-end: 4px;
              margin-block-end: 40px;
              margin-inline-start: 4px; }"
          `);
    });

    it('should handle simple value array and map to logical props wherever required', () => {
      expect(
        handleResponsiveValues(
          {
            padding: ['2rem', '4rem', '8rem'],
            margin: [2, '4px'],
            paddingTop: { initial: '4rem', medium: 4, large: 6 },
            marginTop: 1,
          },
          lightTheme,
        ),
      ).toMatchInlineSnapshot(`
              "padding-block-start: 4rem;
              padding-inline-end: 4rem;
              padding-block-end: 8rem;
              padding-inline-start: 4rem;
              margin-block-start: 4px;
              margin-inline-end: 4px;
              margin-block-end: 8px;
              margin-inline-start: 4px;
              @media(min-width: 768px){ padding-block-start: 16px; }
              @media(min-width: 1280px){ padding-block-start: 24px; }"
          `);
    });
  });

  describe('colors', () => {
    it('should handle simple color values', () => {
      expect(handleResponsiveValues({ background: 'neutral600', borderColor: 'warning600' }, lightTheme))
        .toMatchInlineSnapshot(`
        "background: #666687;
        border-color: #d9822f;"
      `);
    });

    it('should handle responsive values with different breakpoints', () => {
      const result = handleResponsiveValues(
        {
          background: {
            initial: 'primary600',
            small: 'secondary600',
            medium: 'neutral600',
            large: 'neutral800',
          },
          color: {
            initial: 'danger600',
            small: 'pink',
            // @ts-expect-error at "large: 3", Type 'number' is not assignable to type 'string'
            large: 3,
          },
        },
        lightTheme,
      );
      expect(result).toMatchInlineSnapshot(`
        "background: #4945ff;
        color: #d02b20;
        @media(min-width: 520px){ background: #0c75af;
        color: pink; }
        @media(min-width: 768px){ background: #666687; }
        @media(min-width: 1280px){ background: #32324d;
        color: 3; }"
      `);
    });
  });

  describe('gap', () => {
    it('should handle simple gap values', () => {
      expect(handleResponsiveValues({ gap: 4 }, lightTheme)).toMatchInlineSnapshot(`"gap: 16px;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      expect(
        handleResponsiveValues(
          {
            gap: {
              initial: 1,
              small: 2,
              medium: 3,
              large: '24px',
            },
          },
          lightTheme,
        ),
      ).toMatchInlineSnapshot(`
        "gap: 4px;
        @media(min-width: 520px){ gap: 8px; }
        @media(min-width: 768px){ gap: 12px; }
        @media(min-width: 1280px){ gap: 24px; }"
      `);
    });
  });

  describe('font sizes', () => {
    it('should handle simple fontSize values', () => {
      expect(handleResponsiveValues({ fontSize: 2 }, lightTheme)).toMatchInlineSnapshot(`"font-size: 1.4rem;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      expect(
        handleResponsiveValues(
          {
            fontSize: {
              initial: 2,
              small: 3,
              medium: '14px',
              large: 5,
            },
          },
          lightTheme,
        ),
      ).toMatchInlineSnapshot(`
        "font-size: 1.4rem;
        @media(min-width: 520px){ font-size: 1.6rem; }
        @media(min-width: 768px){ font-size: 14px; }
        @media(min-width: 1280px){ font-size: 3.2rem; }"
      `);
    });
  });

  describe('font weights', () => {
    it('should handle simple fontWeight values', () => {
      expect(handleResponsiveValues({ fontWeight: 'bold' }, lightTheme)).toMatchInlineSnapshot(`"font-weight: 600;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      expect(
        handleResponsiveValues(
          {
            fontWeight: {
              initial: 'regular',
              small: 'semiBold',
              medium: 'bold',
              large: 850,
            },
          },
          lightTheme,
        ),
      ).toMatchInlineSnapshot(`
        "font-weight: 400;
        @media(min-width: 520px){ font-weight: 500; }
        @media(min-width: 768px){ font-weight: 600; }
        @media(min-width: 1280px){ font-weight: 850; }"
      `);
    });
  });

  describe('line heights', () => {
    it('should handle simple lineHeight values', () => {
      expect(handleResponsiveValues({ lineHeight: 1.5 }, lightTheme)).toMatchInlineSnapshot(`"line-height: 1.5;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      expect(
        handleResponsiveValues(
          {
            lineHeight: {
              initial: 2,
              small: 1.22,
              medium: 3,
              large: 'invalidValue',
            },
          },
          lightTheme,
        ),
      ).toMatchInlineSnapshot(`
        "line-height: 1.25;
        @media(min-width: 520px){ line-height: 1.22; }
        @media(min-width: 768px){ line-height: 1.33; }
        @media(min-width: 1280px){ line-height: invalidValue; }"
      `);
    });
  });

  describe('zIndices', () => {
    it('should handle simple zIndex values', () => {
      expect(handleResponsiveValues({ zIndex: 'modal' }, lightTheme)).toMatchInlineSnapshot(`"z-index: 310;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      expect(
        handleResponsiveValues(
          {
            zIndex: {
              initial: 'navigation',
              small: 9,
              medium: 'tooltip',
              large: 'invalidValue',
            },
          },
          lightTheme,
        ),
      ).toMatchInlineSnapshot(`
        "z-index: 100;
        @media(min-width: 520px){ z-index: 9; }
        @media(min-width: 768px){ z-index: 1000; }
        @media(min-width: 1280px){ z-index: invalidValue; }"
      `);
    });
  });

  describe('shadows', () => {
    it('should handle simple shadow values', () => {
      expect(handleResponsiveValues({ boxShadow: 'filterShadow' }, lightTheme)).toMatchInlineSnapshot(
        `"box-shadow: 0px 1px 4px rgba(33, 33, 52, 0.1);"`,
      );
    });

    it('should handle responsive values with different breakpoints', () => {
      expect(
        handleResponsiveValues(
          {
            boxShadow: {
              initial: 'filterShadow',
              small: 'focusShadow',
              // @ts-expect-error at "medium: 3", Type 'number' is not assignable to type 'string'
              medium: 3,
              large: '0px 1px 4px rgba(33, 33, 52, 0.1)',
            },
          },
          lightTheme,
        ),
      ).toMatchInlineSnapshot(`
        "box-shadow: 0px 1px 4px rgba(33, 33, 52, 0.1);
        @media(min-width: 520px){ box-shadow: 0px 0px 6px rgba(76, 191, 255, 0.75); }
        @media(min-width: 768px){ box-shadow: 3; }
        @media(min-width: 1280px){ box-shadow: 0px 1px 4px rgba(33, 33, 52, 0.1); }"
      `);
    });
  });

  describe('text decoration', () => {
    it('should handle simple text decoration values', () => {
      const values = { textDecoration: 'underline' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"text-decoration: underline;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        textDecoration: {
          initial: 'none',
          small: 'underline',
          medium: 'overline',
        },
      };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
        "text-decoration: none;
        @media(min-width: 520px){ text-decoration: underline; }
        @media(min-width: 768px){ text-decoration: overline; }"
      `);
    });
  });
});
