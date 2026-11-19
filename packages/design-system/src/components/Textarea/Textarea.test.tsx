import { render } from '@test/utils';

import { Field } from '../Field';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('is described by the hint and the counter of its field', () => {
    const { getByRole } = render(
      <Field.Root id="summary" hint="max. 200 characters" counter="12 / 200">
        <Field.Label>Summary</Field.Label>
        <Textarea />
        <Field.Hint />
      </Field.Root>,
    );

    expect(getByRole('textbox')).toHaveAttribute('aria-describedby', 'summary-hint summary-counter');
  });
});
