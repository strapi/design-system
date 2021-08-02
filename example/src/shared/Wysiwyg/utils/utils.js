export const replaceText = (markdownName, textToChange) => {
  let editedText;

  switch (markdownName) {
    case 'Strikethrough':
      editedText = `~~${textToChange}~~`;
      break;
    case 'Bold':
      editedText = `**${textToChange}**`;
      break;
    case 'Italic':
      editedText = `_${textToChange}_`;
      break;
    case 'Underline':
      editedText = `<u>${textToChange}</u>`;
      break;
    case 'Code':
      editedText = `\`\`\`${textToChange}\`\`\``;
      break;
    case 'Link':
      editedText = `[${textToChange}](link)`;
      break;
    case 'Quote':
      editedText = `>${textToChange}`;
      break;
    default:
      editedText = textToChange;
  }
  return editedText
};

export const insertText = (markdownName) => {
  let editedText;
  //object to calculate text that will be selected after insert of markdown
  let selection = {start: markdownName.length, end: 0}

  switch (markdownName) {
    case 'Strikethrough':
      editedText = `~~${markdownName}~~`;
      selection.end = 2;
      break;
    case 'Bold':
      editedText = `**${markdownName}**`;
      selection.end = 2;
      break;
    case 'Italic':
      editedText = `_${markdownName}_`;
      selection.end = 1;
      break;
    case 'alt':
      editedText = `[${markdownName}]()`;
      selection.end = 3;
      break;
    case 'Underline':
      editedText = `<u>${markdownName}</u>`;
      selection.end = 4;
      break;
    case 'Code':
      editedText = `\`\`\`${markdownName}\`\`\``;
      selection.end = 3;
      break;
    case 'Link':
      editedText = `[${markdownName}](link)`;
      selection.end = 7;
      break;
    case 'Quote':
      editedText = `>${markdownName}`;
      selection.end = 0;
      break;
    default:
      editedText = '';
  }
  return {editedText, selection}
};

export const insertListOrTitle = (markdown, lineContent) => {
  let textToInsert;

  switch(markdown) {
    case "BulletList":
      textToInsert = '- ';
      break;
    case "NumberList":
      textToInsert = '1. ';
      break;
    case "h1":
      textToInsert = '# ';
      break;
    case "h2":
      textToInsert = '## ';
      break;
    case "h3":
      textToInsert = '### ';
      break;
    case "h4":
      textToInsert = '#### ';
      break;
    case "h5":
      textToInsert = '##### ';
      break;
    case "h6":
      textToInsert = '###### ';
      break;
    default:
      return;
  }
  
  return textToInsert;
}