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
- Routing is declared in `src/app/app.routes.ts` and provided through `provideRouter(routes)` in `appConfig`. All routes are lazy-loaded via `loadComponent`.
- Reactive state uses Angular signals (`signal()`, `computed()`, `toSignal()`). No BehaviorSubject, no async pipe where a signal works.
- HTTP is RxJS-based in services (`of().pipe(delay(500))` simulating real endpoints); converted to signals at the component boundary via `toSignal()`.
- Angular Material (v21, Material 3, azure/blue theme) — import individual Material modules per component, never a barrel. Global theme configured in `src/styles.scss` via `mat.theme()` using `--mat-sys-*` CSS custom properties.
- Component inputs/outputs use the signal API: `input()` / `input.required()` / `output()` — not `@Input`/`@Output` decorators.

## Folder structure

```
src/app/
├── core/
│   ├── models/        # patient.model.ts — Patient, Appointment, form interfaces
│   ├── services/      # appointments.service.ts
│   └── mocks/         # patients.mock.ts, appointments.mock.ts
├── shared/
│   └── ui/
│       └── appointment-status-badge/   # reused across multiple pages
└── features/
    ├── dashboard/                      # /dashboard route
    │   ├── dashboard.component.ts
    │   └── ui/                         # presentational components for this page only
    │       ├── patient-list/
    │       └── appointment-preview/
    └── appointment-detail/             # /appointment/:id route
        ├── appointment-detail.component.ts
        └── ui/                         # presentational components for this page only
            ├── patient-info/
            └── appointment-form/
```

**Naming convention:** `features/<page>/` holds the routed component; `features/<page>/ui/` holds presentational components scoped to that page; `shared/ui/` holds components reused across multiple pages.

## Schematics defaults

Set in `angular.json` — style files default to SCSS, `skipTests: true` for all schematics.

## Code style

Prettier (`.prettierrc`): 100-char line width, single quotes, Angular HTML parser for templates. TypeScript strict mode fully enabled including `strictTemplates` and `strictInjectionParameters`.
