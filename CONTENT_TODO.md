# Contenus à obtenir de Clickers Community

Claude Code met cette liste à jour à chaque texte ou image provisoire ajouté.

## Textes
- [x] Mission, vision, valeurs, contexte, philosophie, atouts, méthode, projets, marchés, perspectives : repris du document de présentation
- [ ] Services : listes « Ce que nous faisons » / « Ce que vous obtenez » proposées par l'agence dans `src/content/services/{fr,en}/` (`placeholder: true`), à valider
- [ ] Traductions anglaises (rédigées par l'agence) à relire
- [ ] FAQ (`faq.*` dans `src/i18n/*.json`) : 8 questions-réponses à valider
- [ ] Formulaire de devis : tranches de budget en USD à valider
- [ ] Projets : accord pour nommer le Ministère de l'Agriculture et de l'Environnement (anonymisé pour l'instant), dates, captures d'écran

## Visuels
- [ ] Logo officiel en SVG ou PNG transparent haute résolution (l'image extraite du PDF fait 451 × 227 px)
- [ ] Validation de l'emblème redessiné en SVG (`src/components/ui/LogoMark.astro`, favicon)
- [ ] Captures d'écran ou visuels des projets (facultatif)

## Informations
- [x] E-mail : communityclickers50@gmail.com
- [x] Téléphone / WhatsApp : +509 4689-4829
- [x] Facebook : https://www.facebook.com/profile.php?id=61552959704472
- [ ] LinkedIn, Instagram, TikTok, YouTube (emplacements « bientôt » dans `src/config/site.ts`)
- [x] Cal.com : lien de l'agence (Gedeon), validé par le client
- [ ] Nom de domaine (provisoire : clickerscommunity.com dans `astro.config.mjs`, `public/robots.txt`)
- [ ] Mentions légales : forme juridique, adresse, enregistrement, responsable de publication, hébergeur (`src/content/legal/`)
- [ ] Confidentialité : durée de conservation des données et outil d'automatisation (n8n ou Make)

## Technique (agence)
- [ ] Webhook n8n / Make pour les formulaires, puis `PUBLIC_FORM_ENDPOINT` (en attendant, les formulaires renvoient vers l'e-mail)
- [ ] Activer GitHub Pages (Settings > Pages > Source : GitHub Actions) pour la préversion

## Ajouts inspirés de ddghaiti.com (24/11/2026)
- [ ] Blog : 3 articles de départ rédigés par l'agence dans `src/content/blog/{fr,en}/` (`placeholder: true`), à valider ou remplacer
- [ ] « Ils nous font confiance » : noms et logos des partenaires qui acceptent d'être cités (`partners` dans `src/config/site.ts`, logos dans `public/partenaires/`)
- [ ] Avis clients : publier uniquement les avis réels reçus avec l'autorisation cochée (un fichier par avis dans `src/content/reviews/`)
- [ ] Newsletter : choisir l'outil d'envoi (Brevo, Mailchimp…) et le brancher au webhook (`type: "newsletter"`)
