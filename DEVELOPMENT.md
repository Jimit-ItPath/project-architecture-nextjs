# Development Setup Documentation

This project is configured with ESLint, Prettier, and Husky for code quality and consistency.

## Tools Configured

### ESLint

- **Purpose**: Code linting and error detection
- **Config**: `eslint.config.mjs`
- **Rules**: Next.js recommended + TypeScript + Prettier integration
- **Commands**:
  - `npm run lint` - Check for linting errors
  - `npm run lint:fix` - Fix auto-fixable linting errors

### Prettier

- **Purpose**: Code formatting
- **Config**: `.prettierrc`
- **Ignore**: `.prettierignore`
- **Commands**:
  - `npm run prettier` - Check code formatting
  - `npm run prettier:fix` - Fix formatting issues
  - `npm run format` - Run both Prettier and ESLint fixes

### Husky

- **Purpose**: Git hooks for pre-commit validation
- **Config**: `.husky/` directory
- **Hooks**:
  - `pre-commit`: Runs lint-staged
  - `commit-msg`: Validates commit message format

### Lint-staged

- **Purpose**: Run linting/formatting only on staged files
- **Config**: `package.json` under `lint-staged` key
- **Actions**:
  - JS/TS files: ESLint fix + Prettier format
  - JSON/MD/CSS files: Prettier format

## Usage

### Development Workflow

1. Make your changes
2. Stage files with `git add`
3. Commit with conventional format: `git commit -m "feat: add new feature"`
4. Pre-commit hook automatically runs linting and formatting

### Manual Commands

```bash
# Check and fix all formatting issues
npm run format

# Only check formatting
npm run prettier

# Only check linting
npm run lint

# Fix formatting only
npm run prettier:fix

# Fix linting only
npm run lint:fix
```

### Commit Message Format

Use conventional commits format:

type(scope): description

Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert
Example: feat(auth): add user login functionality

## VS Code Integration

The project includes VS Code settings for:

- Format on save
- ESLint auto-fix on save
- Recommended extensions

### Recommended Extensions

- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- TypeScript Importer (ms-vscode.vscode-typescript-next)

## Configuration Files

- `.prettierrc` - Prettier configuration
- `.prettierignore` - Files to ignore for Prettier
- `eslint.config.mjs` - ESLint configuration
- `.husky/pre-commit` - Pre-commit hook script
- `.husky/commit-msg` - Commit message validation
- `.vscode/settings.json` - VS Code workspace settings
- `.vscode/extensions.json` - Recommended extensions
- `package.json` - Scripts and lint-staged configuration
