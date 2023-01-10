import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jsonParseLinter, json } from '@codemirror/lang-json';
import { useCodeMirror } from '@uiw/react-codemirror';

import { Field, FieldLabel, FieldError, FieldHint } from '../Field';
import { Stack } from '../Stack';
import { JSONInputContainer } from './JSONInputContainer';
import { markField, addMarks, filterMarks, lineHighlightMark } from './utils/decorationExtension';

export const JSONInput = ({
  label,
  value,
  error,
  hint,
  required,
  theme,
  onChange,
  disabled,
  labelAction,
  ...boxProps
}) => {
  const editor = useRef();
  const editorState = useRef(null);
  const editorView = useRef(null);

  const getContentAtLine = (line) => {
    return editorState.current?.doc?.line(line);
  };

  /**
   * @description
   * Determines the line to highlight when validateJSON finds an error via jsonParseLinter()
   * @param {number} lineNumber Code editor line number
   */
  const highglightErrorAtLine = (lineNumber) => {
    const { text, to: lineEnd } = getContentAtLine(lineNumber);
    const lineStart = lineEnd - text.trimStart().length;

    if (lineEnd > lineStart) {
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

  /**
   * @description
   * Checks code editor for valid json input and then handles any errors
   * @param {object} viewUpdate
   * @property {object} viewUpdate.view Code editor view https://codemirror.net/docs/ref/#view.EditorView
   * @property {object} viewUpdate.state Code editor state https://codemirror.net/docs/ref/#state.EditorState
   */
  const validateJSON = (viewUpdate) => {
    const { view, state } = viewUpdate;
    editorView.current = view;
    editorState.current = state;

    clearErrorHighlight();

    // Function calls json.parse and returns error message + position
    const lintJSON = jsonParseLinter();
    const lintErrors = lintJSON(view);

    if (lintErrors.length) {
      highglightErrorAtLine(state.doc.lineAt(lintErrors[0].from).number);
    }
  };

  const handleChange = (currentValue, viewUpdate) => {
    validateJSON(viewUpdate);

    // Call the parent's onChange handler
    onChange(currentValue);
  };

  const onCreateEditor = (view, state) => {
    editorView.current = view;
    editorState.current = state;
    validateJSON({ view, state });
  };

  const { setContainer } = useCodeMirror({
    theme,
    value,
    onCreateEditor,
    onChange: handleChange,
    editable: !disabled,
    container: editor.current,
    extensions: [json(), markField],
    basicSetup: {
      lineNumbers: true,
      bracketMatching: true,
      closeBrackets: true,
      indentOnInput: true,
      syntaxHighlighting: true,
      highlightSelectionMatches: true,
      tabSize: 2,
      defaultCharacterWidth: 5,
    },
  });

  useEffect(() => {
    const currentEditor = editor.current;

    if (currentEditor) {
      setContainer(editor.current);
    }
  }, [setContainer]);

  return (
    <Field error={error} hint={hint} required={required}>
      <Stack spacing={1}>
        {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}
        <JSONInputContainer ref={editor} hasError={error} hasRadius alignItems="stretch" fontSize={2} {...boxProps} />
        <FieldError />
        <FieldHint />
      </Stack>
    </Field>
  );
};

JSONInput.defaultProps = {
  label: undefined,
  labelAction: undefined,
  value: '',
  error: undefined,
  hint: undefined,
  required: false,
  theme: 'dark',
  disabled: false,
  onChange() {},
};

JSONInput.propTypes = {
  label: PropTypes.string,
  labelAction: PropTypes.element,
  value: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  required: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
