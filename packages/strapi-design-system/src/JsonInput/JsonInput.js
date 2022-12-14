import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { addMarks, filterMarks, lineHighlightMark } from './decorationExtension';
import jsonlint from './utils/jsonLint';
import { JsonComponent } from './JsonComponent';

const WAIT = 500;

export const JsonInput = ({ id, value: jsonObject, theme, onChange, editable, onError }) => {
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

      // callback to update error in parent, Error: This doesn't match the JSON format
      onError();
    }
  };

  const handleValidateJson = (value) => {
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
    handleValidateJson(currentValue);
  };

  const onCreateEditor = (view, state) => {
    editorView.current = view;
    editorState.current = state;
  };

  return (
    <JsonComponent
      id={id}
      value={value}
      theme={theme}
      editable={editable}
      onChange={handleChange}
      onCreateEditor={onCreateEditor}
    />
  );
};

JsonInput.defaultProps = {
  id: undefined,
  value: {},
  theme: 'dark',
  editable: false,
  onChange() {},
  onError() {},
};

JsonInput.propTypes = {
  onChange: PropTypes.func,
  onError: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  theme: PropTypes.oneOf(['dark', 'light']),
  editable: PropTypes.bool,
  id: PropTypes.string,
};
