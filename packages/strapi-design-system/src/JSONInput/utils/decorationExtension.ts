import { StateField, StateEffect, Range } from '@codemirror/state';
import { EditorView, Decoration } from '@codemirror/view';

// Effects can be attached to transactions to communicate with the extension
const addMarks = StateEffect.define<Range<Decoration>[]>();
const filterMarks = StateEffect.define<(from: number, to: number, value: Decoration) => boolean>();

const lineHighlightMark = Decoration.mark({
  attributes: { style: 'background-color: yellow; color: black' },
});

const markField = StateField.define({
  // Start with an empty set of decorations
  create() {
    return Decoration.none;
  },
  // This is called whenever the editor updates it computes the new set
  update(value, transaction) {
    // Move the decorations to account for document changes
    value = value.map(transaction.changes);
    transaction.effects.forEach((effect) => {
      if (effect.is(addMarks)) {
        value = value.update({
          add: effect.value,
          sort: true,
        });
      } else if (effect.is(filterMarks)) {
        value = value.update({ filter: effect.value });
      }
    });

    return value;
  },
  // Indicate that this field provides a set of decorations
  provide: (f) => EditorView.decorations.from(f),
});

export { addMarks, filterMarks, lineHighlightMark, markField };
