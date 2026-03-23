# Contributing to Scope Creep Tracker

Thank you for your interest in contributing!

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/scope-creep-tracker.git`
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Create a branch: `git checkout -b feat/your-feature`

## Branch Naming

- `feat/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation
- `refactor/` — Code refactoring
- `test/` — Tests

## Pull Request Process

1. Ensure tests pass: `npm run test`
2. Ensure build succeeds: `npm run build`
3. Ensure linting passes: `npm run lint`
4. Submit PR with a clear description

## Adding Translations

1. Copy `src/messages/en.json` to `src/messages/[locale].json`
2. Translate all values (keep keys unchanged)
3. Add the locale to `src/i18n/routing.ts`, `middleware.ts`, and layout's `generateStaticParams`

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
