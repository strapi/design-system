import React, { useRef, useEffect } from 'react';
import { jsonParseLinter, json } from '@codemirror/lang-json';
import { useCodeMirror, ReactCodeMirrorRef, ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { ViewUpdate } from '@codemirror/view';

import { Field, FieldLabel, FieldError, FieldHint } from '../Field';
import { Stack } from '../Stack';
import { JSONInputContainer } from './JSONInputContainer';
import { markField, addMarks, filterMarks, lineHighlightMark } from './utils/decorationExtension';
import { FlexProps } from '../Flex';

interface JSONInputProps extends Omit<FlexProps, 'onChange'> {
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
  labelAction,
  required = false,
  disabled = false,
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
  const highglightErrorAtLine = (lineNumber: number) => {
    const doc = editorState.current?.doc;

    if (doc) {
      const { text, to: lineEnd } = doc.line(lineNumber);

      const lineStart = lineEnd - text.trimStart().length;

      if (lineEnd > lineStart) {
        editorView.current?.dispatch({
          effects: addMarks.of([lineHighlightMark.range(lineStart, lineEnd)]),
        });
      }
    }
  };

  const clearErrorHighlight = () => {
    const doc = editorState.current?.doc;

    if (doc) {
      const docEnd = doc.length || 0;

      editorView.current?.dispatch({
        effects: filterMarks.of((from, to) => to <= 0 || from >= docEnd),
      });
    }
  };
  /**
   * Checks code editor for valid json input and then highlights any errors
   */
  const lintJSON = ({ state, view }: Pick<ViewUpdate, 'state' | 'view'>) => {
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

  const onCodeMirrorChange: ReactCodeMirrorProps['onChange'] = (currentValue, viewUpdate) => {
    lintJSON(viewUpdate);
    // Call the parent's onChange handler
    onChange(currentValue);
  };

  const onCreateEditor: ReactCodeMirrorProps['onCreateEditor'] = (view, state) => {
    editorView.current = view;
    editorState.current = state;
    // Lint the JSON in case the initial value is invalid
    lintJSON({ view, state });
  };

  const { setContainer } = useCodeMirror({
    value,
    onCreateEditor,
    container: editor.current,
    editable: !disabled,
    extensions: [json(), markField],
    onChange: onCodeMirrorChange,
    theme: 'dark',
    basicSetup: {
      lineNumbers: true,
      bracketMatching: true,
      closeBrackets: true,
      indentOnInput: true,
      syntaxHighlighting: true,
      highlightSelectionMatches: true,
      tabSize: 2,
    },
  });

  const focusInput = () => {
    if (!disabled) {
      // Focus the content editable element nested in the JSONInputContainer ref
      const contentEditable = editor.current?.children[0].children[1].children[1] as HTMLElement | null;
      contentEditable?.focus();
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
