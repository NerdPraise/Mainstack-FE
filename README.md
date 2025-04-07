# Mainstack

Test for Senior FE Role

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mainstack
```

2. Install dependencies:
```bash
yarn install
```

### Running the Project

- Start the development server:
```bash
yarn dev
```

### IDEAS - Approach
1. Less package installation and Layout implementation to showcase component composition
2. Use context as state management for small project
3. Different tests composition based on module and components
4. No loading state or skeleton

## Testing

The project uses Vitest as the testing framework, along with React Testing Library for component testing.

### Test Structure
1. Modules
Modules tests are organized in the following structure:
```
src/
  tests/
    setup.ts           # Global test setup and configuration
    modules/          # Module-level tests
      components/       # Module Component-level tests
```
2. Components
  Components tests are organized differently to allow for conversion to component libraries:

```
src/
  components/
    <Component Dir>/
      index.tsx
      __tests__
        Component.test.tsx
        __snapshots__
          Component.test.tsx.snap
```
### Running Tests

- Run all tests:
```bash
yarn test
```


### Test Types

1. **Component Tests**
   - Located in `src/components/`
   - Use React Testing Library for rendering and interacting with components
   - Follow the pattern: `ComponentName.test.tsx`
   - Focus on testing component behavior and user interactions

2. **Module Tests**
   - Located in `src/tests/modules/`
   - Test business logic and data transformations
   - Follow the pattern: `moduleName.test.ts`
   - Focus on testing pure functions and module exports


## Development Tools

- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Vitest**: Testing framework
- **React Testing Library**: Component testing utilities

## Project Structure

```
mainstack/
├── src/              # Source code
├── public/           # Static assets
├── tests/            # Test files
├── vite.config.ts    # Vite configuration
├── vitest.config.ts  # Vitest configuration
└── package.json      # Project dependencies and scripts
```
