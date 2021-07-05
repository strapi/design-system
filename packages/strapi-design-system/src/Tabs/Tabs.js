import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { useTabs } from './TabsContext';
import { Row } from '../Row';
import { TextButton } from '../Text';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { useTabsFocus } from './useTabsFocus';

const TabBox = styled(Box)`
  border-bottom: 1px solid ${({ theme, selected }) => (selected ? theme.colors.neutral0 : theme.colors.neutral150)};
`;

const TabButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;

  & + & > ${TabBox} {
    border-left: 1px solid ${({ theme }) => theme.colors.neutral150};
  }

  // Hack preventing the outline from being overflow by the following tab
  outline-offset: -2px;
`;

const TabsRow = styled(Row)`
  & > * {
    flex: 1;
  }

  & ${TabButton}:first-of-type ${TabBox} {
    border-radius: ${({ theme }) => `${theme.borderRadius} 0 0 0`};
  }

  & ${TabButton}:last-of-type ${TabBox} {
    border-radius: ${({ theme }) => `0 ${theme.borderRadius} 0 0`};
  }

  & ${TabButton}[aria-selected="true"] ${TabBox} {
    border-radius: ${({ theme }) => `${theme.borderRadius} ${theme.borderRadius} 0 0`};
  }
`;

export const Tabs = ({ children, ...props }) => {
  const { id, selectedTabIndex, selectTabIndex, label } = useTabs();
  const tabsRef = useTabsFocus(selectedTabIndex);

  const childrenArray = Children.toArray(children).map((node, index) =>
    cloneElement(node, {
      id: `${id}-${index}`,
      selected: index === selectedTabIndex,
      onClick: () => selectTabIndex(index),
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

  return (
    <TabsRow ref={tabsRef} role="tablist" alignItems="flex-end" aria-label={label} onKeyDown={handleKeyDown} {...props}>
      {childrenArray}
    </TabsRow>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Tab = ({ selected, id, children, ...props }) => {
  const tabId = `tab-${id}`;
  const tabPanelId = `tab-panel-${id}`;

  return (
    <TabButton
      id={tabId}
      role="tab"
      aria-controls={selected ? tabPanelId : undefined}
      tabIndex={selected ? 0 : -1}
      aria-selected={selected}
      {...props}
    >
      <TabBox padding={selected ? 4 : 3} background={selected ? 'neutral0' : 'neutral100'} selected={selected}>
        <TextButton as="span" textColor={selected ? 'primary700' : 'neutral600'}>
          {children}
        </TextButton>
      </TabBox>
    </TabButton>
  );
};

Tab.defaultProps = {
  selected: false,
  id: undefined,
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  selected: PropTypes.bool,
};
