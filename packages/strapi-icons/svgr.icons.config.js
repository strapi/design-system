// https://react-svgr.com/docs/options/
module.exports = {
  dimensions: true,
  icon: 16,
  svgProps: { fill: '{fill}', stroke: '{stroke}' },
  jsxRuntime: 'automatic',
  outDir: './src/icons',
  ref: true,
  typescript: true,
  prettier: false,
  template: ({ imports, componentName, jsx, exports }, { tpl }) => {
    return tpl`
  ${imports};
  import { DefaultTheme, useTheme } from 'styled-components';

  interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'fill' | 'stroke'> {
    /**
     * @default "currentColor"
     */
    fill?: keyof DefaultTheme['colors'] |  (string & {});
    stroke?: keyof DefaultTheme['colors'] | (string & {});
  }
  
  const ${componentName} = ({ fill: fillProp = "currentColor", stroke: strokeProp, ...props }: IconProps, ref: Ref<SVGSVGElement>) => {
    const { colors } = useTheme()

    const fill = fillProp && fillProp in colors ? colors[fillProp as keyof DefaultTheme['colors']] : fillProp;
    const stroke = strokeProp && strokeProp in colors ? colors[strokeProp as keyof DefaultTheme['colors']] : strokeProp;

    return (
      ${jsx}
    );
  };
   
  ${exports};
  `;
  },
};
