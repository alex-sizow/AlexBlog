The header has a tumbler for light and dark. The choice sits in a cookie named `theme`. Light is the start. Dark is the other id.

## What moves

The page paints from tokens. Canvas, surface, text, and the border swap. Pink and yellow stay. The cover files do not. A picture is the same bytes in both themes.

The duck on the home page does not change mesh either. Only the page around it does.

A raw tag stays text: <script>alert(1)</script>

```ts
const themeIds = ['light', 'dark'] as const
```

Flip the tumbler. The cookie should read `dark`. Flip it back. It should read `light`. Reload. The page should come back in the theme you left.
