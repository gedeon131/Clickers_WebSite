# Clickers Community — site web

Site vitrine bilingue (FR / EN) de **Clickers Community**, firme numérique haïtienne :
*Innover ensemble, bâtir le futur.*

- Astro 7 + îlots React, Tailwind CSS v4, TypeScript strict
- Contenus en Markdown : `src/content/services`, `src/content/projects`, `src/content/legal`
- Textes d'interface : `src/i18n/fr.json` et `src/i18n/en.json`
- Coordonnées et liens : `src/config/site.ts`

## Commandes

| Commande | Action |
| :-- | :-- |
| `pnpm install` | Installer les dépendances |
| `pnpm dev` | Serveur de développement sur `localhost:4321` |
| `pnpm build` | Build de production dans `dist/` |
| `pnpm preview` | Prévisualiser le build |
| `pnpm astro check` | Vérifier les types |
| `node scripts/generate-icons.mjs` | Régénérer favicon, icônes et image de partage |

## Variables d'environnement

Voir `.env.example` (webhook des formulaires, WhatsApp, lien Cal.com).

## Déploiement

Le workflow `.github/workflows/deploy-pages.yml` publie une préversion sur GitHub Pages à chaque push sur `main`
(https://gedeon131.github.io/Clickers_WebSite/), une fois Pages activé avec la source « GitHub Actions ».
