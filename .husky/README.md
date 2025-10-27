# Git Hooks with Husky

This directory contains Git hooks managed by [Husky](https://typicode.github.io/husky/).

## Pre-commit Hook

The pre-commit hook automatically runs before each commit to ensure code quality:

1. **Builds the project** (`pnpm run build`)
   - Catches MDX syntax errors
   - Validates Vue components
   - Ensures all documentation examples work

If the build fails, the commit will be blocked until errors are fixed.

## Setup for Team Members

Hooks are automatically installed when running:

```bash
pnpm install
```

The `prepare` script in `package.json` handles this automatically.

## Benefits

✅ Prevents broken builds from being committed
✅ Catches errors early in development
✅ Maintains code quality across the team
✅ Reduces failed CI/CD builds

## Bypassing Hooks (Emergency Only)

If you absolutely need to bypass the pre-commit hook:

```bash
git commit --no-verify -m "your message"
```

**Note:** Only use this in emergencies. Your commit may break the build.
