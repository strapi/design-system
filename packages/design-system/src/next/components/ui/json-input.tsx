import * as React from 'react';

import { cn } from '@/lib/utils';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { StateEffect, StateField, type Range } from '@codemirror/state';
import { Decoration, EditorView, type ViewUpdate } from '@codemirror/view';
import { useCodeMirror, type ReactCodeMirrorProps } from '@uiw/react-codemirror';

import { useFieldControl } from './field';

/* -------------------------------------------------------------------------------------------------
 * Error line highlight
 * -----------------------------------------------------------------------------------------------*/

const addMarks = StateEffect.define<Range<Decoration>[]>();
const filterMarks = StateEffect.define<(from: number, to: number, value: Decoration) => boolean>();

const lineHighlightMark = Decoration.mark({
  attributes: { style: 'background-color: yellow; color: black' },
});

const markField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(value, transaction) {
    let decorations = value.map(transaction.changes);

    transaction.effects.forEach((effect) => {
      if (effect.is(addMarks)) {
        decorations = decorations.update({ add: effect.value, sort: true });
      } else if (effect.is(filterMarks)) {
        decorations = decorations.update({ filter: effect.value });
      }
    });

    return decorations;
  },
  provide: (field) => EditorView.decorations.from(field),
});

/* -------------------------------------------------------------------------------------------------
 * JSONInput
 * -----------------------------------------------------------------------------------------------*/

interface JSONInputProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  value?: string;
  disabled?: boolean;
  /**
   * Called with the text of the editor on every change.
   */
  onChange?: (value: string) => void;
  /**
   * Marks the editor as invalid. Inside a `Field`, the `error` of the field does it.
   */
  hasError?: boolean;
  required?: boolean;
}

interface JSONInputRef extends Partial<HTMLElement> {
  focus(): void;
}

/**
 * A JSON code editor (CodeMirror) with line numbers, bracket matching and a highlight on the first line that
 * does not parse. It keeps a dark look in both colour schemes.
 */
const JSONInput = React.forwardRef<JSONInputRef, JSONInputProps>(
  (
    {
      className,
      hasError,
      required: requiredProp,
      id: idProp,
      value = '',
      disabled = false,
      onChange,
      'aria-describedby': describedByProp,
      ...props
    },
    forwardedRef,
  ) => {
    const {
      id,
      required,
      invalid,
      'aria-describedby': describedBy,
    } = useFieldControl({
      id: idProp,
      required: requiredProp,
      hasError,
      'aria-describedby': describedByProp,
    });

    const editorView = React.useRef<EditorView>();

    const highlightErrorAtLine = (view: EditorView, lineNumber: number) => {
      const { text, to: lineEnd } = view.state.doc.line(lineNumber);
      const lineStart = lineEnd - text.trimStart().length;

      if (lineEnd > lineStart) {
        view.dispatch({ effects: addMarks.of([lineHighlightMark.range(lineStart, lineEnd)]) });
      }
    };

    const clearErrorHighlight = (view: EditorView) => {
      const docEnd = view.state.doc.length || 0;

      view.dispatch({ effects: filterMarks.of((from, to) => to <= 0 || from >= docEnd) });
    };

    /**
     * Highlights the first line that `JSON.parse` rejects
     */
    const lintJSON = ({ view }: Pick<ViewUpdate, 'view'>) => {
      editorView.current = view;

      clearErrorHighlight(view);

      const lintErrors = jsonParseLinter()(view);

      if (lintErrors.length) {
        highlightErrorAtLine(view, view.state.doc.lineAt(lintErrors[0].from).number);
      }
    };

    const handleChange: ReactCodeMirrorProps['onChange'] = (currentValue, viewUpdate) => {
      lintJSON(viewUpdate);
      onChange?.(currentValue);
    };

    const handleCreateEditor: ReactCodeMirrorProps['onCreateEditor'] = (view) => {
      // Lint the JSON in case the initial value is invalid
      lintJSON({ view });
    };

    const { setContainer, view } = useCodeMirror({
      value,
      onCreateEditor: handleCreateEditor,
      editable: !disabled,
      extensions: [json(), markField],
      onChange: handleChange,
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

    React.useImperativeHandle(
      forwardedRef,
      () => ({
        ...view?.dom,
        focus() {
          view?.focus();
        },
        scrollIntoView(args?: boolean | ScrollIntoViewOptions) {
          view?.dom.scrollIntoView(args);
        },
      }),
      [view],
    );

    return (
      <div
        ref={setContainer}
        data-slot="json-input"
        data-invalid={invalid ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        id={id}
        aria-required={required}
        aria-describedby={describedBy}
        className={cn(
          'flex items-stretch rounded-md text-base medium:text-sm medium:leading-tight',
          // The editor keeps a dark look in both schemes, so the colours are the light neutral-800 and neutral-700
          '[&_.cm-editor]:w-full [&_.cm-editor]:rounded-md [&_.cm-editor]:bg-[#32324d] [&_.cm-editor]:outline-none',
          '[&_.cm-gutters]:bg-[#4a4a6a] [&_.cm-activeLineGutter]:bg-[#4a4a6a]',
          '[&_.cm-scroller]:rounded-md [&_.cm-scroller]:border [&_.cm-scroller]:border-solid [&_.cm-scroller]:transition [&_.cm-scroller]:duration-200',
          invalid
            ? '[&_.cm-scroller]:border-danger-600 [&_.cm-scroller:focus-within]:ring-2 [&_.cm-scroller:focus-within]:ring-danger-600'
            : '[&_.cm-scroller]:border-neutral-200 [&_.cm-scroller:focus-within]:border-primary-600 [&_.cm-scroller:focus-within]:ring-2 [&_.cm-scroller:focus-within]:ring-primary-600',
          disabled ? '[&_.cm-editor]:cursor-not-allowed' : '[&_.cm-editor]:cursor-text',
          className,
        )}
        {...props}
      />
    );
  },
);

JSONInput.displayName = 'JSONInput';

export { JSONInput };
export type { JSONInputProps, JSONInputRef };
