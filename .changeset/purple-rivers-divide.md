---
'@strapi/design-system': patch
---

fix: Checkbox Item Not Centered

Added justify-content: center and align-items: center to Checkbox Indicator component

Original:

const CheckboxIndicator = styled(Checkbox.Indicator)`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

Updated:

const CheckboxIndicator = styled(Checkbox.Indicator)`
  width: 100%;
  height: 100%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

