import { render } from '@test/utils';

import { Button } from '../../Button';
import { ModalLayout, ModalHeader, ModalBody, ModalFooter } from '../index';

describe('ModalLayout', () => {
  it('should render component and match snapshot', () => {
    render(
      <ModalLayout onClose={() => jest.fn()} labelledBy="title">
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Hello World</ModalBody>
        <ModalFooter
          startActions={
            <Button onClick={() => jest.fn} variant="tertiary">
              Cancel
            </Button>
          }
          endActions={
            <>
              <Button variant="secondary">Add new stuff</Button>
              <Button onClick={() => jest.fn()}>Finish</Button>
            </>
          }
        />
      </ModalLayout>,
    );

    expect(document.body).toMatchSnapshot();
  });
});
