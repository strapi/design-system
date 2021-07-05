import React from 'react';
import { Box } from '../Box';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export const Cards = (props) => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.ARROW_RIGHT:
      case KeyboardKeys.DOWN: {
        e.preventDefault();

        const focused = document.activeElement;

        if (focused.tagName.toLowerCase() === 'article') {
          e.preventDefault();

          const allCards = [...e.currentTarget.querySelectorAll('article')];
          const focusedIndex = allCards.findIndex((node) => node === focused);

          const nextIndex = focusedIndex + 1 < allCards.length ? focusedIndex + 1 : 0;
          allCards[nextIndex].focus();
        }
        break;
      }

      case KeyboardKeys.ARROW_LEFT:
      case KeyboardKeys.UP: {
        e.preventDefault();

        const focused = document.activeElement;

        if (focused.tagName.toLowerCase() === 'article') {
          e.preventDefault();

          const allCards = [...e.currentTarget.querySelectorAll('article')];
          const focusedIndex = allCards.findIndex((node) => node === focused);

          const nextIndex = focusedIndex - 1 > -1 ? focusedIndex - 1 : allCards.length - 1;
          allCards[nextIndex].focus();
        }
        break;
      }

      case KeyboardKeys.HOME: {
        const focused = document.activeElement;

        if (focused.tagName.toLowerCase() === 'article') {
          e.preventDefault();

          const allCards = e.currentTarget.querySelectorAll('article');
          allCards.item(0).focus();
        }

        break;
      }

      case KeyboardKeys.END: {
        const focused = document.activeElement;

        if (focused.tagName.toLowerCase() === 'article') {
          e.preventDefault();

          const allCards = e.currentTarget.querySelectorAll('article');
          allCards.item(allCards.length - 1).focus();
        }

        break;
      }

      default:
        break;
    }
  };

  return <Box onKeyDown={handleKeyDown} {...props} />;
};
