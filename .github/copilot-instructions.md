# GitHub Copilot Instructions

You are assisting with development of this Home Assistant Lovelace custom card project.
The codebase is TypeScript + Lit and builds with Rollup.

Use these instructions as project-specific guardrails when generating, editing, or reviewing code.

## Quick reference

### Core commands

```bash
npm ci
npm run start
npm run build
npm run lint
```

### Primary files

- `src/mmwave-card.ts` — main card implementation
- `src/editor.ts` — visual editor (`LovelaceCardEditor`)
- `src/types.ts` — card config and type definitions
- `src/action-handler-directive.ts` — tap/hold/double-tap directive
- `src/localize/localize.ts` — localization helper
- `src/localize/languages/en.json` and `src/localize/languages/nb.json` — translation files
- `rollup.config.js` and `rollup.config.dev.js` — production and dev build config

## Architecture and patterns

- The custom element is `custom:mmwave-card`.
- Prefer Lit 3 patterns and idiomatic web component structure.
- Keep configuration shape centralized in `src/types.ts`.
- Keep editor schema and defaults aligned with runtime card behavior.
- Keep feature logic in small, readable helpers instead of long monolithic methods.

## TypeScript standards

- Use strict, explicit typing; avoid `any` unless there is no practical alternative.
- Use `import type` for type-only imports where appropriate.
- Validate and narrow optional config fields before use.
- Keep public API names stable unless explicitly requested to change them.

## Lit and component guidance

- Use `@property` for public reactive inputs and `@state` for internal state.
- Avoid direct DOM mutation when Lit reactivity can handle updates.
- Preserve existing card/editor lifecycle behavior.
- For card config, validate early in `setConfig` and throw actionable errors.
- Keep `getCardSize` deterministic and aligned with rendered density.

## Home Assistant integration

- Use Home Assistant helpers and conventions from `custom-card-helpers`.
- Ensure tap, hold, and double-tap actions are wired through existing action patterns.
- Support unavailable/loading/error states gracefully.
- Keep Lovelace config compatibility in mind when changing schema or defaults.

## Localization and copy

- Do not hardcode user-facing strings when a localize key should be used.
- Add new translation keys to both language files currently in the repo (`en.json`, `nb.json`).
- Keep copy concise, sentence case, and user-facing.
- Favor consistent terminology across card UI and editor labels.

## Styling and UX

- Respect Home Assistant theme variables and CSS custom properties.
- Avoid hardcoded colors when theme tokens can be used.
- Keep spacing and typography consistent with existing card styles.
- Ensure layouts work in both compact and wider dashboard widths.

## Build and quality expectations

- Keep `npm run lint` clean for changed code.
- Ensure `npm run build` succeeds after non-trivial changes.
- Do not introduce unrelated refactors in focused changes.
- If updating build tooling, keep dev and prod Rollup configs consistent.

## Safe change workflow

1. Read adjacent code before editing.
2. Implement the smallest viable change.
3. Run relevant checks (`npm run lint`, `npm run build`, or targeted command).
4. Update docs/README when behavior or config changes.
5. Summarize what changed and why.

## Pull request guidance

- Keep PRs focused to one logical change.
- Include screenshots or short clips for visible UI/editor changes.
- Document config changes and migration notes when applicable.
- Call out any follow-up work explicitly instead of bundling extra scope.

## Avoid these common issues

- Breaking editor/card config parity
- Adding untyped dynamic config access
- Hardcoding text instead of localization keys
- Overriding theme behavior with fixed styles
- Changing output filenames or card tag without explicit request
