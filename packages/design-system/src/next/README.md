# The `/next` tree

Experimental Strapi Design System using Tailwind CSS and shadcn.

## Important rules to keep in mind

### Every shadcn component gets a `React.forwardRef` wrapper

The shadcn registry output assumes React 19, where `ref` is a plain prop. On React 18 a function component does not receive `ref` in its props, so a component without the wrapper loses its ref. Add the wrapper to each component that the CLI generates. Remove the wrappers if the package moves to React 19.
