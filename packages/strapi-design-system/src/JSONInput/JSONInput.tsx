import * as React from 'react';

import { jsonParseLinter, json } from '@codemirror/lang-json';
import type { ViewUpdate } from '@codemirror/view';
import { useCodeMirror, ReactCodeMirrorRef, ReactCodeMirrorProps } from '@uiw/react-codemirror';
import styled from 'styled-components';

import { markField, addMarks, filterMarks, lineHighlightMark } from './utils/decorationExtension';
import { FieldProps } from '../Field';
import { Flex, FlexProps } from '../Flex';
import { useComposedRefs } from '../hooks/useComposeRefs';
import { inputFocusStyle } from '../themes';

interface JSONInputProps extends Omit<FlexProps, 'onChange'>, Pick<FieldProps, 'error'> {
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

interface JSONInputRef extends Partial<HTMLElement> {
  focus(): void;
}

const JSONInput = React.forwardRef<JSONInputRef, JSONInputProps>(
  ({ error, value = '', disabled = false, onChange = () => null, ...boxProps }, forwardedRef) => {
    const editor = React.useRef<ReactCodeMirrorRef['editor']>();
    const editorState = React.useRef<ReactCodeMirrorRef['state']>();
    const editorView = React.useRef<ReactCodeMirrorRef['view']>();
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

    const { setContainer, view } = useCodeMirror({
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

    const composedRefs = useComposedRefs(editor, setContainer);

    React.useImperativeHandle(
      forwardedRef,
      () => ({
        ...view?.dom,
        focus() {
          if (view) {
            view.focus();
          }
        },
        scrollIntoView(args?: boolean | ScrollIntoViewOptions) {
          if (view) {
            view.dom.scrollIntoView(args);
          }
        },
      }),
      [view],
    );

    return (
      <JSONInputContainer
        ref={composedRefs}
        hasError={hasError}
        alignItems="stretch"
        fontSize={2}
        hasRadius
        {...boxProps}
      />
    );
  },
);

const JSONInputContainer = styled(Flex)<{ hasError: boolean }>`
  line-height: ${({ theme }) => theme.lineHeights[2]};

  .cm-editor {
    /** 
     * Hard coded since the color is the same between themes,
     * theme.colors.neutral800 changes between themes 
     */
    background-color: #32324d;
    width: 100%;
    outline: none;
  }

  .cm-scroller {
    border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
    /* inputFocusStyle will receive hasError prop */
    ${inputFocusStyle()}
  }

  .cm-editor,
  .cm-scroller {
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  .cm-gutters,
  .cm-activeLineGutter {
    /** 
     * Hard coded since the color is the same between themes,
     * theme.colors.neutral700 changes between themes 
     */
    background-color: #4a4a6a;
  }
`;

export { JSONInput };
export type { JSONInputProps, JSONInputRef };
