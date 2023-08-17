function template(
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl }
) {
  const iconName = componentName + 'Component';
  const styleName = componentName + 'Wrapper';
  const svgIconComponent = '<' + iconName + ' {...props} />';
  const wrapperComponentStart = '<' + styleName + ' colors={colors}>';
  const wrapperComponentEnd = '</' + styleName + '>';
  const toRender = wrapperComponentStart + svgIconComponent + wrapperComponentEnd;

  return tpl`
    import * as React from 'react';
    import styled from 'styled-components';

    const ${styleName} = styled.div\`
      \${({ theme, color }) => \`
        color: \${theme.colors[color]};
      \`};

      \${({ theme, colors }) => \`
        \${Object.entries(colors).map(([name, value], index) => \`
          --var-color-\${color.name}: \${theme.colors[value]};
        \`)}
      \`};
    \`;

    const ${iconName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};

    export default ({ colors, color, ...props }) => (${toRender});
  `;
}

module.exports = template;
