# Alexblog

Blog skeleton on Nuxt 4 and [Vuetify0](https://0.vuetifyjs.com/).

The interface is skinned with [Laton A](https://www.figma.com/community/file/1155215157941297900/laton-a-cartoon-style-ui-kit): those colors live in the Vuetify0 theme, and `Switch`, `Form`, `Input`, and `Alert` stay headless.

Requires Node 26 and pnpm 12.

```bash
fnm use
pnpm install
pnpm dev
```

Vapor is on (`vue.vapor`). Pages that use i18n stay on the Virtual DOM.

Languages are `en` and `fr` only. The URL does not change: `/posts` stays `/posts`.

Page changes fade out, then the next page fades in.

- `/` — home opens with the name, a theme plate, then three post cards. The WebGPU duck is not shown for now.
- `/posts` — post list, square cards with a picture
- `/about` — about this site
- `/posts/:slug` — post page, cover beside the title
- `/register` — registration form; it does not submit anywhere

No database, sessions, or publishing. The Postgres language server is wired, with the connection disabled.
