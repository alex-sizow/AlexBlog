L'en-tête a un interrupteur pour le clair et le sombre. Le choix est dans un cookie nommé `theme`. Le clair est le départ. Le sombre est l'autre identifiant.

## Ce qui bouge

La page se peint avec des jetons. Le fond, la surface, le texte et la bordure changent. Le rose et le jaune restent. Les fichiers de couverture, non. Une image a les mêmes octets dans les deux thèmes.

Le canard de l'accueil ne change pas de maillage non plus. Seule la page autour change.

Une balise brute reste du texte : <script>alert(1)</script>

```ts
const themeIds = ['light', 'dark'] as const
```

Bascule l'interrupteur. Le cookie doit valoir `dark`. Rebascule. Il doit valoir `light`. Recharge. La page doit revenir dans le thème que tu as laissé.
