import { lightTheme } from '../../themes';
import { handleResponsiveValues, type ResponsiveProps } from '../handleResponsiveValues';

describe('handleResponsiveValues', () => {
  describe('spaces', () => {
    it('should handle simple string values', () => {
      const values = { padding: '1rem', margin: '4px' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
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
      const values = { padding: 2, margin: 4 };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
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
      const values = {
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
      };
      const result = handleResponsiveValues(values, lightTheme);
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
      const values = {
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
      };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
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
      const values = {
        padding: { initial: ['4rem'], medium: ['2rem', '4rem', '8rem'], large: 6 },
        margin: { initial: 2, medium: [2, '4px'], large: [6, '4px', 8] },
        marginTop: { initial: 4, medium: '1rem', large: '22px' },
      };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
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
      const values = {
        padding: ['2rem', '4rem', '8rem'],
        margin: [2, '4px'],
        paddingTop: { initial: '4rem', medium: 4, large: 6 },
        marginTop: 1,
      };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
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
      const values = { background: 'neutral600', borderColor: 'warning600' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
        "background: #666687;
        border-color: #d9822f;"
      `);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        background: {
          initial: 'primary600',
          small: 'secondary600',
          medium: 'neutral600',
          large: 'neutral800',
        },
        color: {
          initial: 'danger600',
          small: 'pink',
          large: 3,
        },
      };
      // @ts-expect-error at "large: 3", Type 'number' is not assignable to type 'string'
      const result = handleResponsiveValues(values, lightTheme);
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
      const values = { gap: 4 };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"gap: 16px;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        gap: {
          initial: 1,
          small: 2,
          medium: 3,
          large: '24px',
        },
      };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
        "gap: 4px;
        @media(min-width: 520px){ gap: 8px; }
        @media(min-width: 768px){ gap: 12px; }
        @media(min-width: 1280px){ gap: 24px; }"
      `);
    });
  });

  describe('font sizes', () => {
    it('should handle simple fontSize values', () => {
      const values = { fontSize: 2 };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"font-size: 1.4rem;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        fontSize: {
          initial: 2,
          small: 3,
          medium: '14px',
          large: 5,
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "font-size: 1.4rem;
        @media(min-width: 520px){ font-size: 1.6rem; }
        @media(min-width: 768px){ font-size: 14px; }
        @media(min-width: 1280px){ font-size: 3.2rem; }"
      `);
    });
  });

  describe('font weights', () => {
    it('should handle simple fontWeight values', () => {
      const values = { fontWeight: 'bold' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"font-weight: 600;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        fontWeight: {
          initial: 'regular',
          small: 'semiBold',
          medium: 'bold',
          large: 850,
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "font-weight: 400;
        @media(min-width: 520px){ font-weight: 500; }
        @media(min-width: 768px){ font-weight: 600; }
        @media(min-width: 1280px){ font-weight: 850; }"
      `);
    });
  });

  describe('line heights', () => {
    it('should handle simple lineHeight values', () => {
      const values = { lineHeight: 1.5 };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"line-height: 1.5;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        lineHeight: {
          initial: 2,
          small: 1.22,
          medium: 3,
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "line-height: 1.25;
        @media(min-width: 520px){ line-height: 1.22; }
        @media(min-width: 768px){ line-height: 1.33; }
        @media(min-width: 1280px){ line-height: invalidValue; }"
      `);
    });
  });

  describe('zIndices', () => {
    it('should handle simple zIndex values', () => {
      const values = { zIndex: 'modal' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"z-index: 310;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        zIndex: {
          initial: 'navigation',
          small: 9,
          medium: 'tooltip',
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "z-index: 100;
        @media(min-width: 520px){ z-index: 9; }
        @media(min-width: 768px){ z-index: 1000; }
        @media(min-width: 1280px){ z-index: invalidValue; }"
      `);
    });
  });

  describe('shadows', () => {
    it('should handle simple shadow values', () => {
      const values = { shadow: 'filterShadow' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(
        `"box-shadow: 0px 1px 4px rgba(33, 33, 52, 0.1);"`,
      );
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        shadow: {
          initial: 'filterShadow',
          small: 'focusShadow',
          medium: 3,
          large: '0px 1px 4px rgba(33, 33, 52, 0.1)',
        },
      };
      // @ts-expect-error at "medium: 3", Type 'number' is not assignable to type 'string'
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "box-shadow: 0px 1px 4px rgba(33, 33, 52, 0.1);
        @media(min-width: 520px){ box-shadow: 0px 0px 6px rgba(76, 191, 255, 0.75); }
        @media(min-width: 768px){ box-shadow: 3; }
        @media(min-width: 1280px){ box-shadow: 0px 1px 4px rgba(33, 33, 52, 0.1); }"
      `);
    });
  });

  describe('display', () => {
    it('should handle simple display values', () => {
      const values = { display: 'flex' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"display: flex;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        display: {
          initial: 'block',
          small: 'grid',
          medium: 'flex',
          large: 2,
        },
      };
      // @ts-expect-error at "large: 2", Type 'number' is not assignable to type 'string'
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "display: block;
        @media(min-width: 520px){ display: grid; }
        @media(min-width: 768px){ display: flex; }
        @media(min-width: 1280px){ display: 2; }"
      `);
    });
  });

  describe('pointer events', () => {
    it('should handle simple pointerEvents values', () => {
      const values: ResponsiveProps = { pointerEvents: 'none' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"pointer-events: none;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values: ResponsiveProps = {
        pointerEvents: {
          // @ts-expect-error at "initial: 1", Type 'number' is not assignable to type 'string'
          initial: 1,
          small: 'none',
          medium: 'all',
          large: 'auto',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "pointer-events: 1;
        @media(min-width: 520px){ pointer-events: none; }
        @media(min-width: 768px){ pointer-events: all; }
        @media(min-width: 1280px){ pointer-events: auto; }"
      `);
    });
  });

  describe('cursor', () => {
    it('should handle simple cursor values', () => {
      const values = { cursor: 'pointer' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"cursor: pointer;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        cursor: {
          initial: 'auto',
          small: 'pointer',
          medium: 'move',
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "cursor: auto;
        @media(min-width: 520px){ cursor: pointer; }
        @media(min-width: 768px){ cursor: move; }
        @media(min-width: 1280px){ cursor: invalidValue; }"
      `);
    });
  });

  describe('position', () => {
    it('should handle simple position values', () => {
      const values: ResponsiveProps = { position: 'absolute' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"position: absolute;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values: ResponsiveProps = {
        position: {
          initial: 'absolute',
          small: 'relative',
          medium: 'fixed',
          large: 'sticky',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "position: absolute;
        @media(min-width: 520px){ position: relative; }
        @media(min-width: 768px){ position: fixed; }
        @media(min-width: 1280px){ position: sticky; }"
      `);
    });
  });

  describe('overflow', () => {
    it('should handle simple overflow values', () => {
      const values = { overflow: 'hidden' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"overflow: hidden;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        overflow: {
          initial: 'auto',
          small: 'hidden',
          medium: 'visible',
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "overflow: auto;
        @media(min-width: 520px){ overflow: hidden; }
        @media(min-width: 768px){ overflow: visible; }
        @media(min-width: 1280px){ overflow: invalidValue; }"
      `);
    });
  });

  describe('transition', () => {
    it('should handle simple transition values', () => {
      const values = { transition: 'all 0.3s ease-in-out' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"transition: all 0.3s ease-in-out;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        transition: {
          initial: 'all 0.3s ease-in-out',
          small: 'transform 0.5s ease-in-out',
          medium: 'opacity 0.2s ease-in-out',
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "transition: all 0.3s ease-in-out;
        @media(min-width: 520px){ transition: transform 0.5s ease-in-out; }
        @media(min-width: 768px){ transition: opacity 0.2s ease-in-out; }
        @media(min-width: 1280px){ transition: invalidValue; }"
      `);
    });
  });

  describe('transform', () => {
    it('should handle simple transform values', () => {
      const values = { transform: 'translateX(50%)' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"transform: translateX(50%);"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        transform: {
          initial: 'translateX(50%)',
          small: 'translateY(50%)',
          medium: 'rotate(45deg)',
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "transform: translateX(50%);
        @media(min-width: 520px){ transform: translateY(50%); }
        @media(min-width: 768px){ transform: rotate(45deg); }
        @media(min-width: 1280px){ transform: invalidValue; }"
      `);
    });
  });

  describe('animation', () => {
    it('should handle simple animation values', () => {
      const values = { animation: 'spin 2s linear infinite' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"animation: spin 2s linear infinite;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        animation: {
          initial: 'spin 2s linear infinite',
          small: 'fade 1s ease-in-out infinite',
          medium: 'slide 0.5s ease-in-out infinite',
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "animation: spin 2s linear infinite;
        @media(min-width: 520px){ animation: fade 1s ease-in-out infinite; }
        @media(min-width: 768px){ animation: slide 0.5s ease-in-out infinite; }
        @media(min-width: 1280px){ animation: invalidValue; }"
      `);
    });
  });

  describe('text align', () => {
    it('should handle simple textAlign values', () => {
      const values: ResponsiveProps = { textAlign: 'center' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"text-align: center;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values: ResponsiveProps = {
        textAlign: {
          initial: 'left',
          small: 'center',
          medium: 'right',
          large: 'end',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "text-align: left;
        @media(min-width: 520px){ text-align: center; }
        @media(min-width: 768px){ text-align: right; }
        @media(min-width: 1280px){ text-align: end; }"
      `);
    });
  });

  describe('text transform', () => {
    it('should handle simple textTransform values', () => {
      const values: ResponsiveProps = { textTransform: 'uppercase' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"text-transform: uppercase;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values: ResponsiveProps = {
        textTransform: {
          initial: 'none',
          small: 'uppercase',
          medium: 'capitalize',
          large: 'lowercase',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "text-transform: none;
        @media(min-width: 520px){ text-transform: uppercase; }
        @media(min-width: 768px){ text-transform: capitalize; }
        @media(min-width: 1280px){ text-transform: lowercase; }"
      `);
    });
  });

  describe('flex', () => {
    it('should handle simple flex values', () => {
      const values = { flex: '1 1 auto' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"flex: 1 1 auto;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        flex: {
          initial: '1 1 auto',
          small: '0 1 auto',
          medium: '1 0 auto',
          large: 1,
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "flex: 1 1 auto;
        @media(min-width: 520px){ flex: 0 1 auto; }
        @media(min-width: 768px){ flex: 1 0 auto; }
        @media(min-width: 1280px){ flex: 1; }"
      `);
    });
  });

  describe('flex grow', () => {
    it('should handle simple flexGrow values', () => {
      const values = { grow: 1 };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"flex-grow: 1;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        grow: {
          initial: 1,
          small: 0,
          medium: 2,
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "flex-grow: 1;
        @media(min-width: 520px){ flex-grow: 0; }
        @media(min-width: 768px){ flex-grow: 2; }
        @media(min-width: 1280px){ flex-grow: invalidValue; }"
      `);
    });
  });

  describe('flex basis', () => {
    it('should handle simple flexBasis values', () => {
      const values = { basis: 'auto' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"flex-basis: auto;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        basis: {
          initial: 'auto',
          small: '100%',
          medium: '50%',
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "flex-basis: auto;
        @media(min-width: 520px){ flex-basis: 100%; }
        @media(min-width: 768px){ flex-basis: 50%; }
        @media(min-width: 1280px){ flex-basis: invalidValue; }"
      `);
    });
  });

  describe('flex shrink', () => {
    it('should handle simple flexShrink values', () => {
      const values = { shrink: 1 };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"flex-shrink: 1;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        shrink: {
          initial: 1,
          small: 0,
          medium: 2,
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "flex-shrink: 1;
        @media(min-width: 520px){ flex-shrink: 0; }
        @media(min-width: 768px){ flex-shrink: 2; }
        @media(min-width: 1280px){ flex-shrink: invalidValue; }"
      `);
    });
  });

  describe('positions: top bottom left right', () => {
    it('should handle simple position values', () => {
      const values = { top: 2, bottom: 3 };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
        "top: 8px;
        bottom: 12px;"
      `);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        top: {
          initial: 0,
          medium: 2,
          large: 'invalidValue',
        },
        right: {
          initial: 1,
          medium: 3,
          large: '2rem',
        },
        bottom: {
          initial: 2,
          small: '50%',
          medium: 4,
          large: '40px',
        },
        left: {
          small: '50%',
          medium: 5,
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "top: 0;
        right: 4px;
        bottom: 8px;
        @media(min-width: 520px){ bottom: 50%;
        left: 50%; }
        @media(min-width: 768px){ top: 8px;
        right: 12px;
        bottom: 16px;
        left: 20px; }
        @media(min-width: 1280px){ top: invalidValue;
        right: 2rem;
        bottom: 40px; }"
      `);
    });
  });

  describe('width height', () => {
    it('should handle simple width height values', () => {
      const values = { width: '100%', height: 'auto' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
        "width: 100%;
        height: auto;"
      `);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        width: {
          initial: '100%',
          small: '50%',
          medium: 2,
          large: 'invalidValue',
        },
        height: {
          initial: 'auto',
          small: '50%',
          medium: '100%',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "width: 100%;
        height: auto;
        @media(min-width: 520px){ width: 50%;
        height: 50%; }
        @media(min-width: 768px){ width: 8px;
        height: 100%; }
        @media(min-width: 1280px){ width: invalidValue; }"
      `);
    });

    it('should handle min max width height values with different breakpoints', () => {
      const values = {
        maxWidth: {
          initial: 'auto',
          small: '50%',
          medium: '100%',
          large: 'invalidValue',
        },
        minHeight: {
          initial: 2,
          small: '50%',
          medium: '100%',
          large: '3',
        },
        maxHeight: {
          initial: 4,
          small: '50%',
          medium: 'auto',
        },
        minWidth: {
          initial: '100%',
          small: '50%',
          medium: 'auto',
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "max-width: auto;
        min-height: 8px;
        max-height: 16px;
        min-width: 100%;
        @media(min-width: 520px){ max-width: 50%;
        min-height: 50%;
        max-height: 50%;
        min-width: 50%; }
        @media(min-width: 768px){ max-width: 100%;
        min-height: 100%;
        max-height: auto;
        min-width: auto; }
        @media(min-width: 1280px){ max-width: invalidValue;
        min-height: 12px;
        min-width: invalidValue; }"
      `);
    });
  });

  describe('border radius', () => {
    it('should handle simple borderRadius values', () => {
      const values = { borderRadius: 2 };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"border-radius: 8px;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        borderRadius: {
          initial: 2,
          small: 4,
          medium: '1rem',
          large: 6,
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "border-radius: 8px;
        @media(min-width: 520px){ border-radius: 16px; }
        @media(min-width: 768px){ border-radius: 1rem; }
        @media(min-width: 1280px){ border-radius: 24px; }"
      `);
    });
  });

  describe('border width', () => {
    it('should handle simple borderWidth values', () => {
      const values = { borderWidth: 2 };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"border-width: 8px;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        borderWidth: {
          initial: 2,
          small: 4,
          medium: '8px',
          large: 6,
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "border-width: 8px;
        @media(min-width: 520px){ border-width: 16px; }
        @media(min-width: 768px){ border-width: 8px; }
        @media(min-width: 1280px){ border-width: 24px; }"
      `);
    });
  });

  describe('border style', () => {
    it('should handle simple borderStyle values', () => {
      const values = { borderStyle: 'solid' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"border-style: solid;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values = {
        borderStyle: {
          initial: 'solid',
          small: 'dashed',
          medium: 'dotted',
          large: 'invalidValue',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "border-style: solid;
        @media(min-width: 520px){ border-style: dashed; }
        @media(min-width: 768px){ border-style: dotted; }
        @media(min-width: 1280px){ border-style: invalidValue; }"
      `);
    });
  });

  describe('flex direction', () => {
    it('should handle simple flexDirection values', () => {
      const values: ResponsiveProps = { flexDirection: 'row', display: 'flex' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`
        "flex-direction: row;
        display: flex;"
      `);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values: ResponsiveProps = {
        flexDirection: {
          initial: 'row',
          small: 'column',
          medium: 'row-reverse',
        },
        display: 'flex',
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "flex-direction: row;
        display: flex;
        @media(min-width: 520px){ flex-direction: column; }
        @media(min-width: 768px){ flex-direction: row-reverse; }"
      `);
    });
  });

  describe('flex wrap', () => {
    it('should handle simple flexWrap values', () => {
      const values: ResponsiveProps = { flexWrap: 'wrap' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"flex-wrap: wrap;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values: ResponsiveProps = {
        flexWrap: {
          initial: 'wrap',
          small: 'nowrap',
          medium: 'wrap-reverse',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "flex-wrap: wrap;
        @media(min-width: 520px){ flex-wrap: nowrap; }
        @media(min-width: 768px){ flex-wrap: wrap-reverse; }"
      `);
    });
  });

  describe('justify content', () => {
    it('should handle simple justifyContent values', () => {
      const values: ResponsiveProps = { justifyContent: 'center' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"justify-content: center;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values: ResponsiveProps = {
        justifyContent: {
          initial: 'center',
          small: 'flex-start',
          medium: 'flex-end',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "justify-content: center;
        @media(min-width: 520px){ justify-content: flex-start; }
        @media(min-width: 768px){ justify-content: flex-end; }"
      `);
    });
  });

  describe('align items', () => {
    it('should handle simple alignItems values', () => {
      const values: ResponsiveProps = { alignItems: 'center' };
      expect(handleResponsiveValues(values, lightTheme)).toMatchInlineSnapshot(`"align-items: center;"`);
    });

    it('should handle responsive values with different breakpoints', () => {
      const values: ResponsiveProps = {
        alignItems: {
          initial: 'center',
          small: 'flex-start',
          medium: 'flex-end',
        },
      };
      const result = handleResponsiveValues(values, lightTheme);
      expect(result).toMatchInlineSnapshot(`
        "align-items: center;
        @media(min-width: 520px){ align-items: flex-start; }
        @media(min-width: 768px){ align-items: flex-end; }"
      `);
    });
  });
});
