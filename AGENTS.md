# Alexblog

Node `26.13.0` (`.node-version`), package manager `pnpm@12.16.1`. Do not use npm.

Nuxt 4 + `@vuetify/v0` (https://0.vuetifyjs.com/). This is not Vuetify 3/4 and not Naive UI.

- UI languages are `en` and `fr` only, via `@nuxtjs/i18n`. No other locales. Pages that use `$t` are not vapor: Form/Input and i18n stay on the Virtual DOM. Theme follows `prefers-color-scheme` and locale follows the browser until the header tumbler writes `theme` or `lang`.
- Interfaces: `Form`, `Input`, `Button` from `@vuetify/v0`. Do not hand-roll selection, form, or dialog behavior if the `vuetify0` skill already names it.
- `Button.Root` always sets `type="button"`. Form submit is a native `<button type="submit">`.
- CSS: BEM (`block`, `block__element`, `block--modifier`) with native nesting (`& .block__element`, `&.block__element--modifier`). Do not concatenate `&__` or `&--`: the browser drops those rules. A scoped child component is `&:deep(child)`, not a bare nested `:deep()`. No Sass, no tag selectors for component styles.
- Home duck: WebGPU scene in `app/duck/` via `vgpu`, not mounted on `/` for now. `.wgsl` imports need `@vgpu/wgsl` as a direct dependency (same release as `vgpu`) and `wgslVitePlugin()` in `nuxt.config.ts`. The mesh is the CC0 Poly Haven rubber duck in `public/duck/`.
- Home intro: `HomeIntro` in `app/components/home/Intro.vue`. Shout name, greeting in column 2, cutout duck on a plate that follows the theme (`light-dark` yellow / primary), bio overlapping the plate, scribble behind the name. Portrait asset is `public/intro-duck.png` (logo with the pink field removed).
- Gutter flock: repeating rubber-duck mask on the canvas outside `.shell`, rotated 20°. Tile is the CC0 OpenClipart duck (`public/icons/duck.png`, from Wikimedia `File:Rubber_duck.svg`). Hidden when the column fills the viewport. Drifts at `--flock-rate` (0.04 of document scroll) on a scroll timeline; static under reduced motion or without scroll timelines.
- Scrollbar: webkit only, in `app/assets/css/main.css`. Opaque canvas track, yellow thumb, no arrow buttons. Hidden below `40rem` and on coarse pointers.
- Skeleton: static posts in `app/data/posts.ts`. Registration does not persist. There is no Postgres schema.
- Postgres language server: `postgres-language-server lsp-proxy`, config `postgres-language-server.jsonc`, connection disabled.
- Project skills: `.agents/skills/vuetify0`, `.agents/skills/supabase-postgres-best-practices`. Nuxt has no official skill — do not install third-party ones.
