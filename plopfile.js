const HandleBars = require('handlebars');

HandleBars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Component name',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/strapi-design-system/src/{{name}}/index.js',
        templateFile: 'plop-templates/root.hbs',
      },
      {
        type: 'add',
        path: 'packages/strapi-design-system/src/{{name}}/{{name}}.js',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: 'packages/strapi-design-system/src/{{name}}/{{name}}.stories.mdx',
        templateFile: 'plop-templates/stories.hbs',
      },
      {
        type: 'add',
        path: 'packages/strapi-design-system/src/{{name}}/__tests__/{{name}}.spec.js',
        templateFile: 'plop-templates/unit-test.hbs',
      },
      {
        type: 'add',
        path: 'packages/strapi-design-system/src/{{name}}/__tests__/{{name}}.e2e.js',
        templateFile: 'plop-templates/e2e-test.hbs',
      },
    ],
  });
};
