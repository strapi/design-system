import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { debounce } from 'tiny-throttle';
import { Field, FieldLabel, FieldError, FieldHint } from '../Field';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { addMarks, filterMarks, lineHighlightMark } from './decorationExtension';
import * as jsonlint from './utils/jsonLint';
import { JsonComponent } from './JsonComponent';

const WAIT = 500;

const StyledBox = styled(Box)`
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 1px solid ${({ theme, error }) => (error ? theme.colors.danger600 : 'transparent')};
`;

export const InputJSON = ({ id, label, value, error, hint, required, theme, onChange, editable }) => {
  const editorState = useRef(null);
  const editorView = useRef(null);

  const getContentAtLine = (line) => {
    return editorState.current?.doc?.line(line);
  };

  /**
   * markSelection: highlights the error message by extracting line number from error message thrown by jsonlint.parse()
   * Error message format ex: "`Parse error on line 8:\n...:5, "b":6, }]\n---------------------^\nExpecting 'STRING', got '}'`"
   */
  const markSelection = ({ message }) => {
    const errorMessageWithLineNumber = message.split(':')[0];
    const errorLine = errorMessageWithLineNumber.split('line ')[1];
    const line = parseInt(errorLine, 10) || 0;

    if (line) {
      const { text, to: lineEnd } = getContentAtLine(line);
      const lineStart = lineEnd - text.trimStart().length;

      if (lineEnd > lineStart)
        editorView.current?.dispatch({
          effects: addMarks.of([lineHighlightMark.range(lineStart, lineEnd)]),
        });
    }
  };

  const clearErrorHighlight = () => {
    const docEnd = editorState.current?.doc?.length || 0;
    editorView.current?.dispatch({
      effects: filterMarks.of((from, to) => to <= 0 || from >= docEnd),
    });
  };

  const validateJSON = (value) => {
    try {
      return jsonlint.parse(value);
    } catch (error) {
      markSelection(error);
    }

    return null;
  };

  const validateJSONOnChange = async (currentValue, viewUpdate) => {
    const { view, state } = viewUpdate;
    editorView.current = view;
    editorState.current = state;
    clearErrorHighlight();
    const parsedJson = await validateJSON(currentValue);

    // onChange callback to update parsed json in parent
    if (parsedJson) onChange(parsedJson);
  };

  /**
   * debounceValidateJSON: to debounce onchange validating json.
   */
  const debounceValidateJSON = debounce(validateJSONOnChange, WAIT);

  const onCreateEditor = (view, state) => {
    editorView.current = view;
    editorState.current = state;
  };

  /**
   * debounceValidateJSONOnLoad: On load, if there is a wrong json string, we need to validate it and highlight in the editor,
   * but createEditor callback which gets fired after useEffect, so delay helps to get the editor state here.
   */
  const debounceValidateJSONOnLoad = debounce(validateJSON, WAIT);

  useEffect(() => {
    debounceValidateJSONOnLoad(value);
  }, [value, debounceValidateJSONOnLoad]);

  return (
    <Field error={error} hint={hint} required={required}>
      <Stack spacing={1}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <StyledBox error={error}>
          <JsonComponent
            id={id}
            value={value}
            theme={theme}
            editable={editable}
            onChange={(currentValue, viewUpdate) => {
              debounceValidateJSON(currentValue, viewUpdate);
            }}
            onCreateEditor={onCreateEditor}
          />
        </StyledBox>
        <FieldError />
        <FieldHint />
      </Stack>
    </Field>
  );
};

InputJSON.defaultProps = {
  id: undefined,
  label: undefined,
  value: '',
  error: undefined,
  hint: undefined,
  required: false,
  theme: 'dark',
  editable: false,
  onChange() {},
};

InputJSON.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  required: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
  editable: PropTypes.bool,
  onChange: PropTypes.func,
};
