import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldLabel, FieldHint, FieldError } from '../Field';
import { TextareaInput } from './TextareaInput';
import { Stack } from '../Stack';
import { Flex } from '../Flex';
import styled from 'styled-components';
import { useId } from '../helpers/useId';

const TextareaWrapper = styled.div`
  & textarea {
    // TODO: remove when we'll have fonts in the theme
    height: ${80 / 16}rem;
    line-height: ${20 / 16}rem;
  }

  & textarea::placeholder {
    font-weight: 400;
    font-size: ${14 / 16}rem;
    line-height: 1.43;
    color: ${({ theme }) => theme.colors.neutral500};
    opacity: 1;
  }
`;

export const Textarea = React.forwardRef(
  ({ name, hint, error, label, children, labelAction, id, required, ...props }, ref) => {
    const generatedId = useId('textarea', id);

    return (
      <TextareaWrapper>
        <Field name={name} hint={hint} error={error} id={generatedId}>
          <Stack spacing={1}>
            {label && (
              <Flex>
                <FieldLabel required={required} action={labelAction}>
                  {label}
                </FieldLabel>
              </Flex>
            )}
            <TextareaInput ref={ref} as="textarea" value={children} {...props} />
            <FieldHint />
            <FieldError />
          </Stack>
        </Field>
      </TextareaWrapper>
    );
  },
);

Textarea.displayName = 'Textarea';

Textarea.defaultProps = {
  'aria-label': undefined,
  label: undefined,
  labelAction: undefined,
  error: undefined,
  hint: undefined,
  id: undefined,
  children: '',
  required: false,
};

Textarea.propTypes = {
  'aria-label': PropTypes.string,
  children: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};
