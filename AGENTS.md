# Alexblog

Node `26.13.0` (`.node-version`), package manager `pnpm@12.16.1`. Do not use npm.

Nuxt 4 + `@vuetify/v0` (https://0.vuetifyjs.com/). This is not Vuetify 3/4 and not Naive UI.

- UI languages are `en` and `fr` only, via `@nuxtjs/i18n`. No other locales. Pages that use `$t` are not vapor: Form/Input and i18n stay on the Virtual DOM.
- Interfaces: `Form`, `Input`, `Button` from `@vuetify/v0`. Do not hand-roll selection, form, or dialog behavior if the `vuetify0` skill already names it.
- `Button.Root` always sets `type="button"`. Form submit is a native `<button type="submit">`.
- CSS: BEM (`block`, `block__element`, `block--modifier`) with native nesting (`& .block__element`, `&.block__element--modifier`). Do not concatenate `&__` or `&--`: the browser drops those rules. A scoped child component is `&:deep(child)`, not a bare nested `:deep()`. No Sass, no tag selectors for component styles.
- Skeleton: static posts in `app/data/posts.ts`. Registration does not persist. There is no Postgres schema.
- Postgres language server: `postgres-language-server lsp-proxy`, config `postgres-language-server.jsonc`, connection disabled.
- Project skills: `.agents/skills/vuetify0`, `.agents/skills/supabase-postgres-best-practices`. Nuxt has no official skill — do not install third-party ones.
