import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { Dialog } from '../Dialog';
import { DialogBody } from '../DialogBody';
import { DialogFooter } from '../DialogFooter';
import { Button } from '../../Button/Button';

describe('Dialog', () => {
  it('should render Dialog with props', () => {
    const { getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Dialog isOpen onClose={jest.fn()} title="Confirmation" labelledBy="confirmation">
          <DialogBody>are you sure you want to delete this?</DialogBody>
          <DialogFooter
            startAction={<Button variant="tertiary">Cancel</Button>}
            endAction={<Button variant="danger-light">Confirm</Button>}
          />
        </Dialog>
      </ThemeProvider>,
    );

    expect(getByText('are you sure you want to delete this?')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });
});
