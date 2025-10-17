# API – reserver.ma

Backend NestJS jouant le rôle de BFF/REST pour les applications client, extranet et admin.

## Commandes

- `npm run dev:api` – serveur avec rechargement via Nx.
- `npm run build -- --projects=api` – build de production.
- `npm run lint -- --projects=api` – lint.
- `npm run test -- --projects=api` – tests unitaires.

## Endpoints inclus

- `GET /api/v1/health` – santé du service.
- `GET /api/v1/hotels` – recherche mockée avec filtres destination/étoiles.

## Prisma

Le schéma Prisma est défini dans `apps/api/prisma/schema.prisma`. Lancer `npx prisma generate` (une fois les
packages installés) pour générer le client.
