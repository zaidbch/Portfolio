# Profil professionnel — Zaid Bouchiar

Site personnel simple : informations, photo, CV et certificats.

## Lancer le site

```bash
npm install
npm run dev
```

## Mettre à jour sans tout reconstruire

| Élément | Fichier à remplacer / modifier |
|---|---|
| Photo | `public/images/profile.jpg` |
| CV | `public/documents/cv/cv-zaid-bouchiar.pdf` |
| Certificats | `public/documents/certificats/` |
| Textes (nom, email, formation, etc.) | `src/data/content.js` |

### Ajouter un certificat

1. Déposer le PDF ou l’image dans `public/documents/certificats/`.
2. Ajouter une entrée dans le tableau `certificates` de `src/data/content.js` :

```js
{
  id: "nouveau",
  name: "Nom du certificat",
  organization: "Organisme",
  date: "1 janvier 2026",
  domain: "Domaine",
  file: "/documents/certificats/fichier.pdf",
}
```
"# Portfolio_zaid" 
