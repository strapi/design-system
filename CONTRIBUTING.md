# Contribute to Strapi Design System

The Strapi Design System is an open-source project administered by [the Strapi team](https://strapi.io/company).
We appreciate your interest and efforts to contribute to the Design System.

All efforts to contribute are highly appreciated, we recommend you open an issue prior to spending a lot of time
making a pull request that may not align with the project roadmap.

## Contribution Prerequisites

- You have [Node.js](https://nodejs.org/en/) at version >= v20 and [Yarn](https://yarnpkg.com/en/) at v1.2.0+ installed.
- You are familiar with [Git](https://git-scm.com).

**Before submitting your pull request** make sure the following requirements are fulfilled:

- Fork the repository and create your new branch from `develop`.
- Run `yarn` in the root of the repository.
- If you've fixed a bug or added code that should be tested, please make sure to add tests
- Ensure the following test suites are passing:
  - `yarn test:unit`
- Make sure your code lints by running `yarn lint`.

## Development Workflow

Please follow the instructions below:

### 1. Fork the [repository](https://github.com/strapi/design-system)

[Go to the repository](https://github.com/strapi/design-system) and fork it to your own GitHub account.

### 2. Clone from your repository

```bash
git clone git@github.com:YOUR_USERNAME/design-system.git
cd design-system
```

### 3. Install the dependencies and start Storybook

Go to the root of the repository.

```bash
yarn install
yarn develop
```

Storybook will be running on `localhost:6006` for you to test your changes to components or their documentation.

---

## Git Conventions

### Commit messages

We use the following convention:

```
type: subject

body
```

The goal of this convention is to help us generate changelogs that can be communicated to our users.

#### Type

The types are based on our GitHub label:

- `fix` – When fixing an issue.
- `chore` – When doing some cleanup, working on tooling, some refactoring. (usually reserved for **internal** work)
- `doc` – When writing documentation.
- `feat` – When working on a feature.

#### Subject

The subject of a commit should be a summary of what the commit is about. It should not describe what the code is doing:

- `feat: what the feature is`
- `fix: what the problem is`
- `chore: what the PR is about`
- `doc: what is documented`

Examples:

- `feat: introduce combobox primitive`
- `fix: popover is not correctly aligned`
- `chore: refactor checkbox to use radix`
- `doc: update storybook for button`

> ⚠️ For a `fix` commit the message should explain what the commit is fixing. Not what the solution is.

### Branches

Use `kebab-case` to name your branches: `prefix/branch-name-something`

**Branch naming convention**

- `fix`: When fixing an issue: `fix/some-bug`
- `chore`: When doing some cleanup, working on tooling, some refactoring: `chore/update-dependencies`
- `doc`: When writing documentation: `doc/documentation-subject`
- `feature`: When you are working on a feature. Start by creating a `feature/name-of-feature` branch & create tasks branches with the feature name as prefix:
  - `feature/i18n` is the main feature branch
  - `i18n/init-plugin` is a task for this feature

The most important thing to remember is to make your intention explicit. Try to convey meaning in your branch names.

## Pull Requests

New pull requests should be done either against `main` or against the related feature branch (see [Git Conventions](#branches)). You can reference the Jira task ID in the Pull Request description.

If your pull request is against `main` don't forget to add it to the relevant milestone. If you are not sure which one to select, use the one for the next release.

The PR title need to be as clear as possible for users to understand what the change is.

Once your Pull Request has been reviewed and is ready to be merged you will need to squash all your commits. To do so you can use the `git rebase -i <commit-hash>` or `git reset --soft <commit-hash>` commands.

### Adding Changesets

We use [Changesets](https://github.com/changesets/changesets) to manage our releasees, there's an automated prompt to help you make the right decisions in what your changeset should be, to activate this use the command `yarn release:add`.

You should then select the "bump" type, we use semver versioning which the spec can be found [here](https://semver.org/). The TLDR is:

- patch – you've made a fix
- minor – you've added new backward compatible functionality
- major – you've made a breaking change

If you want to release a pre-release you can signify this by using `yarn prerelease:enter <tag>`, this will set changesets up for pre-releases, a tag could be `beta` for instance. You'll see this error:

```shell
`changeset pre enter` cannot be run when in pre mode
```

if we're already in pre-release mode, this is fine and you should continue.

## Precommit hooks

[Husky](https://typicode.github.io/husky/#/) is used to run handle pre-commit hooks:

- `.husky/pre-commit` -> `eslint` check using `lint-staged`
- `.husky/commit-msg` -> `commitlint` check, configured as described above.

> ⚠️ If your favorite GUI gives you an error when you try to commit, try [this](https://typicode.github.io/husky/#/?id=command-not-found)

---

## Miscellaneous

### Available commands

- `yarn develop` Develop the project.
- `yarn clean` Clean the project (remove dist & node_modules).
- `yarn build` Build the project.
- `yarn lint` Check the codebase for lint errors.
- `yarn format` Automatically fix lint errors.
- `yarn prettier:check` Check the codebase for pretty-ness.
- `yarn prettier:write` Fix any prettier issues.
- `yarn test:ts`: Run the TypeScript tests.
- `yarn test:unit` Run the design system tests.

## Linking the design system

### Strapi monorepo

To link the design system to the Strapi monorepo follow the steps outlined in the [contributor documentation](https://contributor.strapi.io/core/admin/link-strapi-design-system)

### React application

In your local copy of the design system run `yarn build` to generate the bundle.

In your application, link your local copy of the design system with [`yarn link`](https://yarnpkg.com/cli/link):

```
yarn link -r ../<relative-path-to-strapi-design-system>
```

You can also link a local copy of a specific package. For example, if you want to link the package strapi-design-system, you can run:

```
yarn link -r ../<relative-path-to-strapi-design-system>/packages/strapi-design-system
```

You should also remove the webpack alias for `@strapi/design-system` in the Strapi monorepo at `packages/core/admin/webpack.alias.js`

Your application should now be using your local copy of the design system.

To revert back to the released version of the design system use [`yarn unlink`](https://yarnpkg.com/cli/unlink#usage):

```
yarn unlink ../<relative-path-to-strapi-design-system>
```

### If You've Found a Bug

We are using [GitHub Issues](https://github.com/strapi/design-system/issues) to manage our public bugs. We keep a close
eye on this so before filing a new issue, try to make sure the problem does not already exist. You can also use the
[codesandbox template](https://codesandbox.io/s/strapi-design-system-r1vdp) to easily show us the bug.
