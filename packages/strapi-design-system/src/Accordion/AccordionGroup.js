import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export const AccordionGroup = ({ children, ...props }) => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.DOWN: {
        const focused = document.activeElement;

        if (focused.hasAttribute('data-strapi-accordion-toggle')) {
          e.preventDefault();

          const allAccordionToggle = [...e.currentTarget.querySelectorAll('[data-strapi-accordion-toggle]')];
          const focusedIndex = allAccordionToggle.findIndex((node) => node === focused);

          const nextIndex = focusedIndex + 1 < allAccordionToggle.length ? focusedIndex + 1 : 0;
          allAccordionToggle[nextIndex].focus();
        }

        break;
      }

      case KeyboardKeys.UP: {
        const focused = document.activeElement;

        if (focused.hasAttribute('data-strapi-accordion-toggle')) {
          e.preventDefault();

          const allAccordionToggle = [...e.currentTarget.querySelectorAll('[data-strapi-accordion-toggle]')];
          const focusedIndex = allAccordionToggle.findIndex((node) => node === focused);

          const nextIndex = focusedIndex - 1 > -1 ? focusedIndex - 1 : allAccordionToggle.length - 1;
          allAccordionToggle[nextIndex].focus();
        }

        break;
      }

      case KeyboardKeys.HOME: {
        const focused = document.activeElement;

        if (focused.hasAttribute('data-strapi-accordion-toggle')) {
          e.preventDefault();

          const allAccordionToggle = e.currentTarget.querySelectorAll('[data-strapi-accordion-toggle]');
          allAccordionToggle.item(0).focus();
        }

        break;
      }

      case KeyboardKeys.END: {
        const focused = document.activeElement;

        if (focused.hasAttribute('data-strapi-accordion-toggle')) {
          e.preventDefault();

          const allAccordionToggle = e.currentTarget.querySelectorAll('[data-strapi-accordion-toggle]');
          allAccordionToggle.item(allAccordionToggle.length - 1).focus();
        }

        break;
      }

      default:
        break;
    }
  };

  return (
    <div onKeyDown={handleKeyDown} {...props}>
      {children}
    </div>
  );
};

AccordionGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
