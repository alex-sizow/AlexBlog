Les deux notes au-dessus tiennent sur un écran. Celle-ci non. Elle est là pour que la barre, à côté du lien retour, ait une distance à parcourir.

L'ouvrir sans toucher la molette, et regarder la pilule. Une note longue montre la part déjà dans la fenêtre. Elle n'est ni vide, ni pleine. Une courte bande veut dire que la plus grande part de la boîte est encore sous la fenêtre.

## Ce qu'elle mesure

Le mètre regarde la boîte de l'article, pas les mots. Titres, listes, blocs de code et couverture ajoutent de la hauteur. Une ligne vide aussi. Le remplissage ne sait pas quel paragraphe est à l'écran. Il sait quelle part de la boîte est entrée dans la fenêtre, du haut de la boîte au bas de la fenêtre.

Une note qui tient déjà dans la fenêtre est pleine. On l'a vue en entier. Elle ne reste pas à moitié parce qu'elle occupe la moitié de la fenêtre.

Quand l'article est plus haut, la valeur part de cette part. Elle atteint 100 quand le bas de la boîte atteint le bas de la fenêtre. Remonter en haut la ramène à la part encore dans la fenêtre. Elle se vide seulement quand la boîte est entièrement sous la fenêtre.

```ts
const seen = Math.min(Math.max(viewHeight - top, 0), height)
const read = height > 0 ? seen / height : 0
```

L'en-tête est collé, et la barre de lecture se colle dessous. La formule utilise toute la fenêtre, donc une ligne qui a passé le haut compte encore. Pour une barre, proche suffit.

## Avant de défiler

La couverture est dans la boîte de l'article, donc elle compte. Le titre et l'extrait comptent. Si le premier titre est à l'écran et le dernier non, c'est le début. La partie pâle de la pilule devrait encore occuper la plus grande part de la piste.

Une balise brute reste du texte, comme dans l'autre note : <script>alert(1)</script>. Cette ligne est courte. Elle ne fera pas bouger la barre à elle seule. Les paragraphes en dessous, oui.

Le code en ligne ressemble à `read.value`. Il change peu la hauteur. Un bloc clôturé, oui. Le bloc au-dessus est plus haut qu'une phrase, et le mètre traite cette hauteur comme n'importe quelle autre.

## Le premier bout

Un petit défilement. Le tampon rose du retour doit rester en place, sous l'en-tête du site, pas par-dessus. L'article doit glisser en dessous. Si le tampon saute en haut de la fenêtre et couvre la marque, le décalage collé est trop court.

La bande doit grandir d'un petit pas, pas sauter à la fin. Si elle saute, la fenêtre est assez haute pour que cette note soit déjà dedans. Une fenêtre plus basse, puis un nouvel essai. Une fenêtre courte teste mieux qu'une note longue sur un écran de cinéma.

Le pointeur reste hors de la pilule. Ce n'est pas un contrôle. Le lien à côté l'est, et il va à la liste, pas dans l'historique. Une visite directe n'a pas d'historique à remonter.

## Les listes ajoutent de la hauteur

Le mètre ne saute pas les listes. Chaque item est une ligne. Un item long passe à la ligne et en ajoute une autre.

- La couverture est dans la boîte mesurée.
- La bannière d'article manquant ne l'est pas. Pas d'article, pas de pilule.
- Un corps français peut être plus haut ou plus court que celui-ci. Le remplissage doit suivre la boîte, pas le nombre anglais.
- Un bloc de code est un seul bloc, même s'il tient plusieurs lignes.
- Un titre est plus lourd qu'un paragraphe, et reste seulement de la hauteur.

Aucun de ces items n'est un jalon. Pas de marque à 25, 50 ou 75. La piste a un seul segment. Des crans, c'est un autre widget.

## À peu près au milieu

Si ce titre est près du milieu de la fenêtre, la bande devrait être près du milieu de la pilule. Pas exact. La couverture est déjà passée. L'en-tête a mangé une bande de fenêtre que la formule compte encore comme de la place de lecture. C'est proche quand le capuchon pâle et le remplissage violet ont à peu près la même longueur.

La barre de défilement de la page n'est pas un meilleur témoin. Elle inclut l'en-tête, la barre de lecture et le pied. Le mètre les ignore. Il peut être à 40 pendant que le curseur de la barre semble plus loin, ou l'inverse. Cet écart est le sens de mesurer la boîte de l'article.

Ici, redimensionner la fenêtre. Fenêtre plus haute, la bande avance d'un coup. Fenêtre plus basse, elle recule. Le remplissage suit la boîte. Pas de rechargement.

## Images et hauteur tardive

L'image de couverture peut arriver après le premier rendu. Si elle change la boîte, le remplissage doit rattraper sans un autre défilement.

Une image cassée occupe encore le cadre de la couverture. La plaque est un carré dans l'en-tête de l'article. Des octets manquants ne doivent pas réduire la boîte à zéro, ni envoyer la valeur à 100 par erreur.

## Langue

Changer la langue. Cette note a un corps français, pas un repli vers l'anglais. Les mots n'ont pas la même longueur. Un titre peut passer à la ligne d'un côté et pas de l'autre. La boîte change. Le remplissage doit être recalculé sur la nouvelle boîte.

Si la page française montre l'avis de corps vide, le fichier `scroll.fr.md` n'a pas été pris. La clé du catalogue ne suffit pas. Le corps est un fichier à part, un par langue, et un fichier manquant est une note manquante.

Retour à l'anglais. La boîte anglaise revient. La valeur doit bouger encore, même sans défilement. Un changement de taille du texte est un changement de taille de la boîte.

## Un passage plus lent

Lire ce passage sans regarder la pilule. Puis lever les yeux. La bande devrait avoir avancé d'à peu près le texte qui a quitté la fenêtre. Si elle n'a pas bougé du tout, la boîte mesurée n'est pas celle de l'article. Vide veut dire que la boîte est entièrement sous la fenêtre. Pleine veut dire que le bas a atteint le bas de la fenêtre, ou que toute la boîte tient déjà dedans.

Le lien retour doit encore marcher d'ici. Il n'a pas besoin de l'article. La liste est le parent. Ouvrir cette note dans un nouvel onglet et presser le lien doit quand même atterrir sur la page des articles.

Recharger sur cette section. La page revient en haut, et la valeur doit revenir avec elle. Un rechargement qui garde une pilule pleine alors que le premier titre est à l'écran est un nombre périmé, ou une boîte qui tient dans la fenêtre après tout.

## Près de la fin

Il reste quelques sections. Le remplissage violet devrait tenir la plus grande part de la piste. Un capuchon pâle devrait encore se voir, sauf si la fenêtre est assez haute pour montrer déjà la dernière ligne. Voir la dernière ligne et le début de la note en même temps, c'est de nouveau le cas de la page courte. La valeur doit être à 100. Une fenêtre plus basse sert à voir le dernier pas.

Le pied est hors de la boîte de l'article. L'atteindre n'est pas requis pour une pilule pleine. La valeur pleine arrive quand le bas de la note rencontre le bas de la fenêtre, un peu avant le pied, ou pendant qu'il entre. Les deux vont. Le pied ne fait pas partie du test.

## La dernière ligne

Ceci est le dernier paragraphe. Quand il est au bas de la fenêtre, la pilule doit être pleine. Remonter jusqu'à la couverture. La bande doit rétrécir jusqu'à la part encore dans la fenêtre. Elle ne doit pas se vider tant que le haut de la note est à l'écran.

C'est le test. Une note longue, une barre qui bouge, un lien qui sort. Les notes courtes restent courtes exprès.
