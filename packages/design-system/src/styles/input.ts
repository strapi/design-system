import { DefaultTheme, css } from 'styled-components';

/* -------------------------------------------------------------------------------------------------
 * Input Text Styles
 * -----------------------------------------------------------------------------------------------*/

/**
 * Shared text styles for input components (Combobox, Select, DatePicker, TimePicker)
 * Mobile: 1.6rem / 2.4rem
 * Above small breakpoint: 1.4rem / 2.2rem
 */
export const inputTextStyles = css`
  font-size: 1.6rem;
  line-height: 2.4rem;

  ${({ theme }: { theme: DefaultTheme }) => theme.breakpoints.medium} {
    font-size: 1.4rem;
    line-height: 2.2rem;
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Trigger Padding Styles
 * -----------------------------------------------------------------------------------------------*/
interface ClearableFieldPaddingProps {
  $size?: 'S' | 'M';
  $hasValue?: boolean;
  $hasClear?: boolean;
  theme: DefaultTheme;
}

/**
 * Shared padding styles for clearable elements (Combobox, Select, DatePicker, TimePicker)
 */
export const clearableFieldPaddingStyles = ({
  $size = 'M',
  $hasValue = false,
  $hasClear = false,
  theme,
}: ClearableFieldPaddingProps) => {
  switch ($size) {
    case 'S':
      return css`
        padding-block: calc(
          ${$hasValue && $hasClear ? theme.spaces[1] : theme.spaces[2]} - 1px
        ); // 1px to compensate for the border

        ${theme.breakpoints.medium} {
          padding-block: ${theme.spaces[1]};
        }
      `;
    default:
      return css`
        padding-block: calc(
          ${$hasValue && $hasClear ? theme.spaces[2] : theme.spaces[3]} - 1px
        ); // 1px to compensate for the border

        ${theme.breakpoints.medium} {
          padding-block: ${theme.spaces[2]};
        }
      `;
  }
};
