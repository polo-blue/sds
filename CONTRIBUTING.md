# Contributing to Spoko Design System

## 🚀 Automated Release Process

This project uses **semantic-release** for fully automated version management and package publishing.

### How It Works

1. **Conventional Commits** - All commits must follow the conventional commit format
2. **Automated Versioning** - Version bumps are determined automatically from commit messages
3. **Automated Publishing** - Packages are published to npm automatically on main branch
4. **Changelog Generation** - CHANGELOG.md is automatically updated with each release

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | **MINOR** (0.1.0) |
| `fix` | Bug fix | **PATCH** (0.0.1) |
| `perf` | Performance improvement | **PATCH** (0.0.1) |
| `refactor` | Code refactoring | **PATCH** (0.0.1) |
| `style` | Code style changes | **PATCH** (0.0.1) |
| `docs` | Documentation changes | **PATCH** (0.0.1) |
| `test` | Test changes | **No release** |
| `ci` | CI/CD changes | **No release** |
| `chore` | Maintenance tasks | **No release** |

#### Breaking Changes

For **MAJOR** version bumps, include `BREAKING CHANGE:` in the commit footer:

```
feat!: remove deprecated HandDrive numeric API

BREAKING CHANGE: HandDrive component now only accepts 'lhd' | 'rhd' strings instead of numbers
```

### Examples

#### ✅ Good Commit Messages

```bash
# New component (minor release)
feat(components): add Button component with variants

# Bug fix (patch release)
fix(HandDrive): handle null values correctly

# Breaking change (major release)
feat!: update HandDrive API to use strings

BREAKING CHANGE: handDrive prop now accepts 'lhd' | 'rhd' instead of 1 | 2

# Documentation update (patch release)
docs: update HandDrive component examples

# No release
test: add HandDrive component tests
chore: update dependencies
```

#### ❌ Bad Commit Messages

```bash
# Too vague
fix: bug fix

# No conventional format
Updated the HandDrive component

# Missing type
add new button component
```

### Release Branches

| Branch | Purpose | Release Type |
|--------|---------|--------------|
| `main` | Production releases | **Stable** |
| `next` | Next major version | **Pre-release** |
| `beta` | Beta features | **Pre-release** |

### Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feat/new-component
   ```

2. **Make Changes & Commit**
   ```bash
   git add .
   git commit -m "feat(components): add NewComponent with TypeScript support"
   ```

3. **Push & Create PR**
   ```bash
   git push origin feat/new-component
   # Create PR to main branch
   ```

4. **Merge to Main**
   - Once PR is approved and merged to `main`
   - GitHub Actions will automatically:
     - Analyze commit messages
     - Determine version bump
     - Update package.json
     - Generate CHANGELOG.md
     - Create GitHub release
     - Publish to npm

### Manual Release (if needed)

```bash
# Install dependencies
pnpm install

# Run semantic-release locally
pnpm run semantic-release
```

### Setup Requirements

#### GitHub Repository Secrets

Add these secrets to your GitHub repository settings:

1. **NPM_TOKEN** - npm authentication token
   ```bash
   # Create npm token
   npm login
   npm token create --access=public
   ```

2. **GITHUB_TOKEN** - Automatically provided by GitHub Actions

#### npm Authentication

Make sure your npm account has publish access to the `spoko-design-system` package.

### Version History

All releases are automatically documented in:
- [CHANGELOG.md](./CHANGELOG.md) - Detailed changelog
- [GitHub Releases](https://github.com/polo-blue/sds/releases) - Release notes
- [npm Versions](https://www.npmjs.com/package/spoko-design-system?activeTab=versions) - Published versions

### Troubleshooting

#### Release Didn't Trigger
- Check commit message follows conventional format
- Ensure commit was pushed to `main` branch
- Check GitHub Actions logs

#### Release Failed
- Check NPM_TOKEN is valid and has publish permissions
- Verify package.json version is correct
- Check for breaking changes in dependencies

#### Skip Release
Add `[skip ci]` to commit message to skip release:
```bash
git commit -m "docs: update README [skip ci]"
```

## 📦 Package Information

- **Current Version**: ![npm version](https://img.shields.io/npm/v/spoko-design-system)
- **Downloads**: ![npm downloads](https://img.shields.io/npm/dm/spoko-design-system)
- **License**: MIT
- **Repository**: https://github.com/polo-blue/sds