import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTabs } from './TabsContext';
import { ButtonText, TableLabel } from '../Text';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { useTabsFocus } from './useTabsFocus';
import { DefaultTabsRow, DefaultTabButton, DefaultTabBox, SimpleTabBox } from './components';

const TabButton = styled.button`
  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;

export const Tabs = ({ children, ...props }) => {
  const { id, selectedTabIndex, selectTabIndex, label, variant } = useTabs();
  const tabsRef = useTabsFocus(selectedTabIndex);

  const childrenArray = Children.toArray(children).map((node, index) =>
    cloneElement(node, {
      id: `${id}-${index}`,
      selected: index === selectedTabIndex,
      onTabClick: () => selectTabIndex(index),
      variant,
    }),
  );

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.RIGHT: {
        const nextIndex = selectedTabIndex + 1;
        selectTabIndex(nextIndex >= childrenArray.length ? 0 : nextIndex);

        break;
      }

      case KeyboardKeys.LEFT: {
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

export const Tab = ({ disabled, selected, id, children, variant, hasError, onClick, onTabClick, ...props }) => {
  const tabId = `${id}-tab`;
  const tabPanelId = `${id}-tabpanel`;

  const handleClick = (e) => {
    if (disabled) {
      return;
    }

    onTabClick(e);

    if (onClick) {
      onClick(e);
    }
  };

  if (variant === 'simple') {
    let textColor;

    if (hasError) {
      textColor = 'danger600';
    } else if (selected) {
      textColor = 'primary600';
    } else if (disabled) {
      textColor = 'neutral600';
    } else {
      textColor = 'neutral600';
    }

    return (
      <TabButton
        id={tabId}
        role="tab"
        aria-controls={selected ? tabPanelId : undefined}
        tabIndex={selected ? 0 : -1}
        aria-selected={selected}
        type="button"
        onClick={handleClick}
        aria-disabled={disabled}
        {...props}
      >
        <SimpleTabBox padding={4} selected={selected} hasError={hasError}>
          <TableLabel textColor={textColor}>{children}</TableLabel>
        </SimpleTabBox>
      </TabButton>
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
      onClick={handleClick}
      aria-disabled={disabled}
      {...props}
    >
      <DefaultTabBox padding={selected ? 4 : 3} background={selected ? 'neutral0' : 'neutral100'} selected={selected}>
        <ButtonText textColor={selected ? 'primary700' : 'neutral600'}>{children}</ButtonText>
      </DefaultTabBox>
    </DefaultTabButton>
  );
};

Tab.defaultProps = {
  disabled: false,
  selected: false,
  id: undefined,
  onClick: undefined,
  onTabClick: undefined,
  variant: undefined,
  hasError: false,
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  hasError: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onTabClick: PropTypes.func,
  selected: PropTypes.bool,
  variant: PropTypes.oneOf(['simple']),
};
