import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, FieldLabel, FieldError } from '../Field';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { addMarks, filterMarks, lineHighlightMark } from './decorationExtension';
import jsonlint from './utils/jsonLint';
import { JsonComponent } from './JsonComponent';

const WAIT = 500;

const StyledBox = styled(Box)`
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid ${({ theme, error }) => (error ? theme.colors.danger600 : 'transparent')};
`;

export const InputJSON = ({ id, label, value: jsonObject, error, theme, onChange, editable }) => {
  const editorState = useRef(null);
  const editorView = useRef(null);
  const timerRef = useRef();
  const value = JSON.stringify(jsonObject, null, 2);

  const getContentAtLine = (line) => {
    return editorState.current?.doc?.line(line);
  };

  const markSelection = ({ message }) => {
    let line = parseInt(message.split(':')[0].split('line ')[1], 10);
    const { text, to: lineEnd } = getContentAtLine(line);
    const lineStart = lineEnd - text.trimStart().length;

    if (lineEnd > lineStart)
      editorView.current.dispatch({
        effects: addMarks.of([lineHighlightMark.range(lineStart, lineEnd)]),
      });
  };

  const clearErrorHighlight = () => {
    const docEnd = editorState.current?.doc?.length || 0;
    editorView.current.dispatch({
      effects: filterMarks.of((from, to) => to <= 0 || from >= docEnd),
    });
  };

  const validateJSON = (value) => {
    try {
      const formattedData = jsonlint.parse(value);

      // callback to update json in parent
      onChange(formattedData);
    } catch (error) {
      markSelection(error);
    }
  };

  const handleValidateJSON = (value) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (value) {
      timerRef.current = setTimeout(() => validateJSON(value), WAIT);
    }
  };

  const handleChange = (currentValue, viewUpdate) => {
    const { view, state } = viewUpdate;
    editorView.current = view;
    editorState.current = state;
    clearErrorHighlight();
    handleValidateJSON(currentValue);
  };

  const onCreateEditor = (view, state) => {
    editorView.current = view;
    editorState.current = state;
  };

  return (
    <Field error={error}>
      <Stack spacing={1}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <StyledBox error={error}>
          <JsonComponent
            id={id}
            value={value}
            theme={theme}
            editable={editable}
            onChange={handleChange}
            onCreateEditor={onCreateEditor}
          />
        </StyledBox>
        <FieldError />
      </Stack>
    </Field>
  );
};

InputJSON.defaultProps = {
  id: undefined,
  label: undefined,
  value: {},
  error: undefined,
  theme: 'dark',
  editable: false,
  onChange() {},
};

InputJSON.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  theme: PropTypes.oneOf(['dark', 'light']),
  editable: PropTypes.bool,
  onChange: PropTypes.func,
};
