# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `yarn develop` - Start development mode with file watching across all packages
- `yarn watch` - Alternative watch command for development
- `yarn build` - Build all packages using Turbo
- `yarn clean` - Clean dist and node_modules across all packages

### Testing
- `yarn test:unit` - Run Jest unit tests across all packages
- `yarn test:ts` - Run TypeScript type checking across all packages
- Individual package testing: `cd packages/design-system && yarn test:unit`

### Code Quality
- `yarn lint` - Run ESLint across all packages
- `yarn format` - Auto-fix linting issues
- `yarn prettier:check` - Check code formatting
- `yarn prettier:write` - Auto-format code

### Release Management
- `yarn release:add` - Add a changeset for versioning
- `yarn release:version` - Bump versions based on changesets
- `yarn release:publish` - Build, test, and publish packages

## Architecture Overview

This is a **monorepo** using **Yarn workspaces** and **Turbo** for build orchestration. The design system is built with **React**, **TypeScript**, and **styled-components**.

### Key Packages
- `packages/design-system/` - Main design system package (`@strapi/design-system`)
  - Components built with **Radix UI primitives** and styled-components
  - Exports themes, utilities, and all UI components
- `packages/icons/` - Icon package (`@strapi/icons`) 
  - SVG icons generated from assets using SVGR
  - Separate build process: generates React components from SVG assets
- `packages/primitives/` - UI primitives package (`@strapi/ui-primitives`)
- `docs/` - **Storybook documentation** and component stories

### Component Architecture
- Components are organized in `packages/design-system/src/components/`
- Each component follows pattern: `ComponentName/ComponentName.tsx` + `index.ts`
- Uses **Radix UI** as foundation for accessible component behavior
- **styled-components** for styling with theme support
- TypeScript for type safety

### Testing Strategy
- **Jest** with **@testing-library/react** for unit tests
- **jsdom** environment for component testing
- **SWC** for fast TypeScript/JSX transformation
- Module name mapping allows testing packages in isolation

### Theming System
- Theme objects in `packages/design-system/src/themes/`
- Light and dark theme support
- Theme consumed via styled-components ThemeProvider

### Build Process
- **Turbo** orchestrates builds with proper dependency ordering
- Icons package has special build: SVG → React components via SVGR
- **pack-up** (Strapi's build tool) for package bundling
- Outputs both ESM and CommonJS formats

### Monorepo Structure
```
packages/
├── design-system/     # Main UI components
├── icons/            # Icon components (auto-generated)
├── primitives/       # Base UI primitives
├── strapi-design-system/  # Legacy package
└── strapi-icons/     # Legacy package
docs/                 # Storybook documentation
```

## Development Notes

- **Icon generation**: Icons are built from SVG assets in `packages/icons/assets/` using SVGR
- **Cross-package dependencies**: design-system depends on icons and primitives
- **Testing**: Use package-specific test commands for faster iteration during development
- **Changeset workflow**: Use changesets for version management and changelog generation