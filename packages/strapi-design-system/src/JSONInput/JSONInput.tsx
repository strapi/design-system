import React, { useRef, useEffect } from 'react';
import { jsonParseLinter, json } from '@codemirror/lang-json';
import { useCodeMirror, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { EditorState, Line } from '@codemirror/state';

import { Field, FieldLabel, FieldError, FieldHint } from '../Field';
import { Stack } from '../Stack';
import { JSONInputContainer } from './JSONInputContainer';
import { markField, addMarks, filterMarks, lineHighlightMark } from './utils/decorationExtension';
import { FlexProps } from '../Flex';

export interface JSONInputProps extends Omit<FlexProps, 'onChange'> {
  label?: string;
  value?: string;
  error?: string | boolean;
  hint?: string | React.ReactNode | React.ReactNode[];
  required?: boolean;
  disabled?: boolean;
  labelAction?: React.ReactNode;
  onChange?: (value: string) => void;
}

export const JSONInput = ({
  label,
  value,
  error,
  hint,
  required,
  disabled,
  labelAction,
  onChange = () => null,
  ...boxProps
}: JSONInputProps) => {
  const editor = useRef<ReactCodeMirrorRef['editor']>();
  const editorState = useRef<ReactCodeMirrorRef['state']>();
  const editorView = useRef<ReactCodeMirrorRef['view']>();
  const hasError = Boolean(error);

  /**
   * Determines the line to highlight when lintJSON finds an error via jsonParseLinter()
   */
  const highglightErrorAtLine = (lineNumber) => {
    const { text, to: lineEnd } = editorState.current?.doc?.line(lineNumber) as Line;
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
   * Checks code editor for valid json input and then highlights any errors
   */
  const lintJSON = ({ state, view }: { state: EditorState; view: EditorView }) => {
    editorView.current = view;
    editorState.current = state;

    clearErrorHighlight();
    // Function calls json.parse and returns error message + position
    const lintJSONForErrrors = jsonParseLinter();
    const lintErrors = lintJSONForErrrors(view);

    if (lintErrors.length) {
      highglightErrorAtLine(state.doc.lineAt(lintErrors[0].from).number);
    }
  };

  const handleChange = (currentValue, viewUpdate) => {
    lintJSON(viewUpdate);
    // Call the parent's onChange handler
    onChange(currentValue);
  };

  const onCreateEditor = (view, state) => {
    editorView.current = view;
    editorState.current = state;
    lintJSON({ view, state });
  };

  const { setContainer } = useCodeMirror({
    value,
    container: editor.current,
    theme: 'dark',
    onChange: handleChange,
    editable: !disabled,
    extensions: [json(), markField],
    onCreateEditor,
  });

  const focusInput = () => {
    if (!disabled) {
      // Focus the content editable element nested in the JSONInputContainer ref
      editor.current.children[0].children[1].children[1].focus();
    }
  };

  useEffect(() => {
    const currentEditor = editor.current;

    if (currentEditor) {
      setContainer(currentEditor);
    }
  }, [setContainer]);

  return (
    <Field error={error} hint={hint} required={required}>
      <Stack spacing={1}>
        {label && (
          <FieldLabel onClick={focusInput} action={labelAction}>
            {label}
          </FieldLabel>
        )}
        <JSONInputContainer
          ref={editor}
          hasError={hasError}
          alignItems="stretch"
          fontSize={2}
          hasRadius
          {...boxProps}
        />
        <FieldError />
        <FieldHint />
      </Stack>
    </Field>
  );
};
