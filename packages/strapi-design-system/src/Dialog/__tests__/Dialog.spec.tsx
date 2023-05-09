import * as React from 'react';

import { render } from '@test/utils';

import { Button } from '../../Button/Button';
import { Dialog } from '../Dialog';
import { DialogBody } from '../DialogBody';
import { DialogFooter } from '../DialogFooter';

describe('Dialog', () => {
  it('should render Dialog with props', () => {
    const { getByText } = render(
      <Dialog isOpen onClose={jest.fn()} title="Confirmation">
        <DialogBody>are you sure you want to delete this?</DialogBody>
        <DialogFooter
          startAction={<Button variant="tertiary">Cancel</Button>}
          endAction={<Button variant="danger-light">Confirm</Button>}
        />
      </Dialog>,
    );

    expect(getByText('are you sure you want to delete this?')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });
});
