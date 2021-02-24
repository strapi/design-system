import * as React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

export const Default = () => {
  const [selected, setSelected] = React.useState<string | undefined>();

  return (
    <div>
      <label id="trophy-champions">Trophy champion</label>

      <RadioGroup labelledBy="trophy-champions" onSelect={setSelected} value={selected}>
        <label htmlFor="first">Mario</label>
        <Radio value="first" id="first" />

        <label htmlFor="second">Luigi</label>
        <Radio value="second" id="second" />

        <label htmlFor="third">Wario</label>
        <Radio value="third" id="third" />
      </RadioGroup>
    </div>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/PICiE8O4NLrHO1lhJftLdE/Design-System-%E2%9C%85?node-id=815%3A800',
  },
};

export const Disabled = () => {
  const [selected, setSelected] = React.useState<string | undefined>();

  return (
    <div>
      <label id="trophy-champions">Trophy champion</label>

      <RadioGroup labelledBy="trophy-champions" onSelect={setSelected} value={selected}>
        <label htmlFor="first">Mario</label>
        <Radio value="first" id="first" />

        <label htmlFor="second">Luigi</label>
        <Radio value="second" id="second" disabled={true} />

        <label htmlFor="third">Wario</label>
        <Radio value="third" id="third" />
      </RadioGroup>
    </div>
  );
};

Disabled.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/PICiE8O4NLrHO1lhJftLdE/Design-System-%E2%9C%85?node-id=815%3A800',
  },
};

export const LSize = () => {
  const [selected, setSelected] = React.useState<string | undefined>();

  return (
    <div>
      <label id="trophy-champions">Trophy champion</label>

      <RadioGroup labelledBy="trophy-champions" onSelect={setSelected} value={selected} size="L">
        <label htmlFor="first">Mario</label>
        <Radio value="first" id="first" />

        <label htmlFor="second">Luigi</label>
        <Radio value="second" id="second" />

        <label htmlFor="third">Wario</label>
        <Radio value="third" id="third" />
      </RadioGroup>
    </div>
  );
};

LSize.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/PICiE8O4NLrHO1lhJftLdE/Design-System-%E2%9C%85?node-id=815%3A800',
  },
};

export default {
  title: 'Radio',
  component: Radio,
  decorators: [withDesign],
} as Meta;
