import React from 'react';
import PropTypes from 'prop-types';
import { useAccordion } from './AccordionContext';

export const AccordionContent = ({ children, ...props }) => {
  const { expanded, id } = useAccordion();

  if (!expanded) {
    return null;
  }

  const idContent = `accordion-content-${id}`;
  const ariaLabelId = `accordion-label-${id}`;
  const ariaDescriptionId = `accordion-desc-${id}`;

  return (
    <div role="region" id={idContent} aria-labelledby={ariaLabelId} aria-describedby={ariaDescriptionId} {...props}>
      {children}
    </div>
  );
};

AccordionContent.propTypes = {
  children: PropTypes.node.isRequired,
};
