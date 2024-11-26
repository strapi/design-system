---
'@strapi/design-system': patch
---

fix: Added missing justify content and align items in Checkbox Indicator

Checkbox was not centered

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

