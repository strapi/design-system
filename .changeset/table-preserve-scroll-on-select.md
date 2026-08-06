---
'@strapi/design-system': patch
---

**`Table`**: preserve the scroll position when selecting a row far down the list

`RawTable` moved roving focus to the active cell on every index change, including pointer and programmatic ones. Clicking a control (e.g. a row checkbox) low in a scrolled table refocused the roving cell and scrolled it into view, snapping the list back to the top. Focus now follows the roving cell only during keyboard navigation; the element a pointer focuses keeps focus.
