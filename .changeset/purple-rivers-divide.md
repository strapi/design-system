---
'@strapi/design-system': patch
---

fix: Checkbox Item Not Centered

Added justify-content: center and align-items: center to Checkbox Indicator component

Original:

const CheckboxIndicator = styled(Checkbox.Indicator)`  width: 100%;
  height: 100%;
  cursor: pointer;`;

Updated:

const CheckboxIndicator = styled(Checkbox.Indicator)`

- display: inline-flex;
- pointer-events: auto !important;
  width: 100%;
  height: 100%;
  cursor: pointer;
- justify-content: center;
- align-items: center;
  `;

Refactored inline styling and added it to checkbox indicator stype component

Original:

      <CheckboxIndicator style={{ display: 'inline-flex', pointerEvents: 'auto'}} forceMount>

Updated:

      <CheckboxIndicator forceMount>
