# Client – reserver.ma

Application Next.js (App Router) servant de front-office public pour la plateforme de réservation.

## Commandes

- `npm run dev:client` – lance le serveur de développement Next.js.
- `npm run build -- --projects=client` – build de l&apos;app client via Nx.
- `npm run lint -- --projects=client` – lint via ESLint.
- `npm run test -- --projects=client` – tests Jest.

## Structure

- `app/` – routes App Router.
- `app/layout.tsx` – layout racine avec import Bootstrap.
- `app/page.tsx` – landing page MVP avec moteur de recherche et listes mockées.
- `app/globals.scss` – variables et styles globaux partagés.
