# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server at http://localhost:4200 (auto-reloads)
npm run build      # production build to dist/
npm run watch      # incremental dev build with watch
npm test           # run unit tests via Vitest
```

Angular CLI is also available directly via `npx ng <command>` (e.g. `npx ng generate component foo`).

## Architecture

This is an Angular 21 standalone-component application (no NgModules). The bootstrap chain is `src/main.ts` → `App` component (`src/app/app.ts`) configured via `appConfig` (`src/app/app.config.ts`).

**Key patterns:**
- All components use the standalone API (`imports: [...]` on `@Component`, no `NgModule`).
- Routing is declared in `src/app/app.routes.ts` and provided through `provideRouter(routes)` in `appConfig`. The root template renders only `<router-outlet />`.
- Angular signals are used for reactive state (`signal()` from `@angular/core`).
- Angular Material (v21, Material 3) is included. The global theme is configured once in `src/styles.scss` via `mat.theme()` using CSS custom properties (`--mat-sys-*`). Components should import individual Material modules rather than a barrel.

**Schematics defaults** (set in `angular.json`):
- Style files default to SCSS.
- `skipTests: true` is set for all schematics — generated artifacts won't include `.spec.ts` files by default.

## Code style

Prettier is configured (`.prettierrc`): 100-char line width, single quotes, Angular HTML parser for templates. TypeScript strict mode is fully enabled including `strictTemplates` and `strictInjectionParameters`.