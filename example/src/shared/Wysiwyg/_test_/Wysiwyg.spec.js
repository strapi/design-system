import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../../../../packages/strapi-parts/src/ThemeProvider';
import { lightTheme } from '../../../../../packages/strapi-parts/src/themes';
import { Wysiwyg } from '../index';

describe('Wysiwyg', () => {
  it('should render the Wysiwyg', () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={'hello world'} placeholder={'hello world'}/>
      </ThemeProvider>
    );

    expect(getByText('hello world')).toBeInTheDocument()
    expect(container.firstChild).toMatchInlineSnapshot();
  })
})