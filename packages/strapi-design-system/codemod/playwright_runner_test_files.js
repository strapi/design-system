// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = 'babel';

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let result;

  const s = j.importDeclaration([j.importSpecifier(j.identifier('test'))], j.literal('@playwright/test'));
  const imports = root.find(j.ImportDeclaration);
  const n = imports.length;

  if (n) {
    j(imports.at(n - 1).get()).insertAfter(s);
  } else {
    root.get().node.program.body.unshift(s);
  }

  const newAsyncArrowFunction = (params, body) => {
    const arrowFunc = j.arrowFunctionExpression(params, body);
    arrowFunc.async = true;
    return arrowFunc;
  };

  result = root
    .find(j.ArrowFunctionExpression)
    .forEach((path) => {
      if (path.value.async) {
        j(path).replaceWith(
          newAsyncArrowFunction(
            [{ type: 'ObjectPattern', properties: [{ type: 'Identifier', name: 'page' }] }],
            path.value.body,
          ),
        );
      }
    })
    .toSource();

  result = root
    .find(j.Identifier)
    .forEach((path) => {
      if (['describe', 'beforeEach', 'afterEach', 'beforeAll', 'afterAll'].includes(path.node.name)) {
        j(path).replaceWith(j.identifier('test.' + path.node.name));
      }
      if (path.node.name == 'it') {
        j(path).replaceWith(j.identifier('test'));
      }
    })
    .toSource();

  return result;
}
