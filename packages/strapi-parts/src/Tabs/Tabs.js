import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { useTabs } from './TabsContext';
import { ButtonText, TableLabel } from '../Text';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { useTabsFocus } from './useTabsFocus';
import { DefaultTabsRow, DefaultTabButton, DefaultTabBox, SimpleTabBox } from './components';

export const Tabs = ({ children, ...props }) => {
  const { id, selectedTabIndex, selectTabIndex, label, variant } = useTabs();
  const tabsRef = useTabsFocus(selectedTabIndex);

  const childrenArray = Children.toArray(children).map((node, index) =>
    cloneElement(node, {
      id: `${id}-${index}`,
      selected: index === selectedTabIndex,
      onClick: () => selectTabIndex(index),
      variant,
    }),
  );

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.ARROW_RIGHT: {
        const nextIndex = selectedTabIndex + 1;
        selectTabIndex(nextIndex >= childrenArray.length ? 0 : nextIndex);

        break;
      }

      case KeyboardKeys.ARROW_LEFT: {
        const nextIndex = selectedTabIndex - 1;
        selectTabIndex(nextIndex < 0 ? childrenArray.length - 1 : nextIndex);

        break;
      }

      case KeyboardKeys.HOME: {
        selectTabIndex(0);

        break;
      }

      case KeyboardKeys.END: {
        selectTabIndex(childrenArray.length - 1);

        break;
      }

      default:
        break;
    }
  };

  if (variant === 'simple') {
    return (
      <div ref={tabsRef} role="tablist" aria-label={label} onKeyDown={handleKeyDown} {...props}>
        {childrenArray}
      </div>
    );
  }

  return (
    <DefaultTabsRow
      ref={tabsRef}
      role="tablist"
      alignItems="flex-end"
      aria-label={label}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {childrenArray}
    </DefaultTabsRow>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Tab = ({ selected, id, children, variant, hasError, ...props }) => {
  const tabId = `${id}-tab`;
  const tabPanelId = `${id}-tabpanel`;

  if (variant === 'simple') {
    let textColor;

    if (hasError) {
      textColor = 'danger600';
    } else if (selected) {
      textColor = 'primary600';
    } else {
      textColor = 'neutral600';
    }

    return (
      <button
        id={tabId}
        role="tab"
        aria-controls={selected ? tabPanelId : undefined}
        tabIndex={selected ? 0 : -1}
        aria-selected={selected}
        type="button"
        {...props}
      >
        <SimpleTabBox padding={4} selected={selected} hasError={hasError}>
          <TableLabel textColor={textColor}>{children}</TableLabel>
        </SimpleTabBox>
      </button>
    );
  }

  if (hasError) {
    console.warn('The "hasError" prop is only available for the "simple" variant.');
  }

  return (
    <DefaultTabButton
      id={tabId}
      role="tab"
      type="button"
      aria-controls={selected ? tabPanelId : undefined}
      tabIndex={selected ? 0 : -1}
      aria-selected={selected}
      {...props}
    >
      <DefaultTabBox padding={selected ? 4 : 3} background={selected ? 'neutral0' : 'neutral100'} selected={selected}>
        <ButtonText textColor={selected ? 'primary700' : 'neutral600'}>{children}</ButtonText>
      </DefaultTabBox>
    </DefaultTabButton>
  );
};

Tab.defaultProps = {
  selected: false,
  id: undefined,
  variant: undefined,
  hasError: false,
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  hasError: PropTypes.bool,
  id: PropTypes.string,
  selected: PropTypes.bool,
  variant: PropTypes.oneOf(['simple']),
};
