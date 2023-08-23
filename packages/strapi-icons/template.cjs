function template(
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl }
) {
  const iconName = componentName + 'SVG';
  const styleName = componentName + 'Wrapper';
  const exportName = componentName + 'Export';
  const svgIconComponent = '<' + iconName + ' {...props} />';
  const wrapperComponentStart = '<' + styleName + ' color={color} colors={colors}>';
  const wrapperComponentEnd = '</' + styleName + '>';
  const toRender = wrapperComponentStart + svgIconComponent + wrapperComponentEnd;

  return tpl`
    import * as React from 'react';
    import styled from 'styled-components';

    const ${iconName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};

    const ${styleName} = styled(${iconName})\`
      \${({ theme, color }) => \`
    color: \${theme.colors[color]};
  \`};

      \${({ theme, colors }) => \`
    \${Object.entries(colors).map(([name, value]) => \`
      --var-color-\${name}: \${theme.colors[value]};
    \`)}
  \`};
    \`;

    const ${exportName} = ({ colors, color, ...props }: { colors?: object; color?: string }) => (${toRender});

    export default ${exportName};
  `;
}

module.exports = template;
