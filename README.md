# Alexblog

Blog skeleton on Nuxt 4 and [Vuetify0](https://0.vuetifyjs.com/).

Requires Node 26 and pnpm 12.

```bash
fnm use
pnpm install
pnpm dev
```

Vapor is on (`vue.vapor`). Pages that use i18n stay on the Virtual DOM.

Languages are `en` and `fr` only. The URL does not change: `/posts` stays `/posts`.

- `/` — home
- `/posts` — post list
- `/posts/:slug` — post page
- `/register` — registration form; it does not submit anywhere

No database, sessions, or publishing. The Postgres language server is wired, with the connection disabled.
