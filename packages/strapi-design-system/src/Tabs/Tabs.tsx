import React, { Children, cloneElement, useEffect, useRef } from 'react';

import { useCallbackRef } from '@strapi/ui-primitives';
import styled from 'styled-components';

import { DefaultTabsRow, DefaultTabButton, DefaultTabBox, SimpleTabBox } from './components';
import { useTabs } from './TabsContext';
import type { FlexProps } from '../Flex';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { Typography } from '../Typography';

const useTabsFocus = (selectedTabIndex, onTabChange) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  const handleTabChange = useCallbackRef(onTabChange);

  useEffect(() => {
    if (!tabsRef.current) return;

    // We don't' want to send the focus to the tab when it mounts
    // It could break the navigating flow of the users if the focus was supposed to be
    // on another element
    if (mountedRef.current) {
      const nextFocusEl = tabsRef.current.querySelector<HTMLButtonElement>('[tabindex="0"]');

      if (nextFocusEl) {
        nextFocusEl.focus();
        handleTabChange(selectedTabIndex);
      }
    }

    if (!mountedRef.current) {
      mountedRef.current = true;
    }
  }, [selectedTabIndex, handleTabChange]);

  return tabsRef;
};

const TabButton = styled.button`
  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;

interface TabsProps extends FlexProps {
  children: React.ReactNode;
}

export const Tabs = ({ children, ...props }: TabsProps) => {
  const { id, selectedTabIndex, selectTabIndex, label, variant, onTabChange } = useTabs();
  const tabsRef = useTabsFocus(selectedTabIndex, onTabChange);

  const childrenArray = Children.toArray(children).map((node, index) =>
    cloneElement(node as React.ReactElement, {
      id: `${id}-${index}`,
      index,
      selectedTabIndex,
      onTabClick: () => selectTabIndex(index),
      variant,
    }),
  );

  const handleKeyDown = (e) => {
    const hasAllChildrenDisabled = childrenArray.every((node) => node.props.disabled);

    if (hasAllChildrenDisabled) {
      return;
    }

    switch (e.key) {
      case KeyboardKeys.RIGHT: {
        const nextWantedIndex = selectedTabIndex + 1;
        const findNextIndex = (ref) => {
          const isDisabled = childrenArray[ref].props.disabled;

          if (!isDisabled) {
            return ref;
          }

          if (ref === childrenArray.length - 1) {
            return findNextIndex(0);
          }

          return findNextIndex(ref + 1);
        };

        const nextIndex = findNextIndex(nextWantedIndex >= childrenArray.length ? 0 : nextWantedIndex);

        selectTabIndex(nextIndex);

        break;
      }

      case KeyboardKeys.LEFT: {
        const nextWantedIndex = selectedTabIndex - 1;
        const findNextIndex = (ref) => {
          const isDisabled = childrenArray[ref].props.disabled;

          if (!isDisabled) {
            return ref;
          }

          if (ref === 0) {
            return findNextIndex(childrenArray.length - 1);
          }

          return findNextIndex(ref - 1);
        };
        const nextIndex = findNextIndex(nextWantedIndex < 0 ? childrenArray.length - 1 : nextWantedIndex);

        selectTabIndex(nextIndex);

        break;
      }

      case KeyboardKeys.HOME: {
        const nextIndex = childrenArray.findIndex((node) => !node.props.disabled);

        selectTabIndex(nextIndex);

        break;
      }

      case KeyboardKeys.END: {
        const arrayOfChildrenProps = childrenArray.map((node, index) => ({ isDisabled: node.props.disabled, index }));
        const firstNonDisabledChildren = arrayOfChildrenProps.reverse().find(({ isDisabled }) => !isDisabled);

        if (firstNonDisabledChildren) {
          selectTabIndex(firstNonDisabledChildren.index);
        }

        break;
      }

      default:
        break;
    }
  };

  if (variant === 'simple') {
    return (
      // TODO: This needs to be reviewed how to handle correctly since it's supposed to have focus.
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
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

interface TabProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  hasError?: boolean;
  id?: string;
  index?: number;
  onTabClick?: () => void;
  selectedTabIndex?: number;
  variant?: 'simple';
}

export const Tab = ({
  disabled = false,
  id,
  children,
  variant,
  hasError = false,
  index,
  selectedTabIndex,
  onTabClick,
  ...props
}: TabProps) => {
  const tabId = `${id}-tab`;
  const tabPanelId = `${id}-tabpanel`;
  const selected = index === selectedTabIndex;

  const handleClick = () => {
    if (disabled) {
      return;
    }

    if (onTabClick) {
      onTabClick();
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
          <Typography variant="sigma" textColor={textColor}>
            {children}
          </Typography>
        </SimpleTabBox>
      </TabButton>
    );
  }

  if (hasError) {
    console.warn('The "hasError" prop is only available for the "simple" variant.');
  }

  const showRightBorder = selectedTabIndex && selectedTabIndex - 1 === index;

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
      showRightBorder={Boolean(showRightBorder)}
      {...props}
    >
      <DefaultTabBox padding={selected ? 4 : 3} background={selected ? 'neutral0' : 'neutral100'} selected={selected}>
        <Typography fontWeight="bold" textColor={selected ? 'primary700' : 'neutral600'}>
          {children}
        </Typography>
      </DefaultTabBox>
    </DefaultTabButton>
  );
};
