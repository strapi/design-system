export const ellipsisStyle = ({ ellipsis }) =>
  ellipsis &&
  `
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

export const handleColor = ({ theme, textColor }) => theme.colors[textColor || 'neutral800'];
