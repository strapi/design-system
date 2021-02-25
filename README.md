## Installation

```sh
$ git clone git@github.com:strapi/design-system-experiments.git # clone the project locally
$ cd design-system-experiments # moves into the folder
$ yarn # install dependencies
$ yarn storybook # starts the storybook
```

## Testing a specific branch

Make sure to have the project already cloned (see previous point). Then, run the following commands:

```sh
# Inside the folder
$ git checkout BRANCH_NAME # BRANCH_NAME concerns the modifications to tests
$ yarn # reinstall dependencies
$ yarn storybook # start the storybook
```

If you encounter problems doing so, run the following command and retry the previous one:

```sh
$ git reset --hard
```
