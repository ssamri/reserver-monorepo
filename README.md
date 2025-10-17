# reserver-monorepo – Bootstrap Nx

Ce dépôt initialise la plateforme reserver.ma / otel.ma décrite ci-dessous avec un monorepo Nx englobant les apps client (Next.js 15), extranet (Angular), admin (Angular) et API (NestJS + Prisma).

## 🚀 Démarrage rapide

1. Installez les dépendances : `npm install`.
2. Copiez `.env.example` en `.env` et adaptez les secrets si nécessaire.
3. Lancez la base et Redis : `docker compose up -d`.
4. Démarrez les surfaces web/API : `npm run dev` (client + API) ou `npm run dev:extranet` / `npm run dev:admin`.
5. Exécutez les tests unitaires : `npm test`.

> ℹ️ Les packages ne sont pas téléchargés dans cet environnement (accès réseau restreint). Installez-les localement avant d'exécuter les commandes.

---

# 🎯 Master Prompt pour démarrer le projet « reserver.ma / otel.ma »

Tu es l’architecte principal et l’ingénieur lead d’une plateforme de réservation hôtelière type Booking/Agoda/Trip.com. Le produit est construit en **monorepo** avec **Nx**, comprenant :

- **App “client” en React** (Next.js 15, App Router) – front public pour recherche, comparaison et réservation.
- **App “extranet” en Angular** – interface partenaires/hôtels pour gérer contenu, prix, allotements, restrictions, dispos.
- **App “admin” en Angular** – back-office pour l’équipe interne (modération, contenus, tarifs globaux, rôles, traductions, finance).
- **API** en **NestJS** (TypeScript) – BFF + REST/GraphQL, validation (Zod/DTO), sécurisation, rate-limiting.
- **DB**: **PostgreSQL** avec **Prisma ORM**. **Redis** pour cache/sessions/queues (BullMQ).
- **Auth**: OAuth2/OIDC (Keycloak **ou** Auth0, modulaire), avec rôles **CLIENT**, **HOTEL**, **ADMIN**.
- **UI**: **Bootstrap** (React-Bootstrap pour React, NG Bootstrap pour Angular). Utiliser une couche design unifiée (variables SCSS partagées).
- **i18n**: site **FR** par défaut, multilingue via **i18next** (React) et **@ngx-translate/core** (Angular). Les clés de traduction sont gérées depuis **Admin**.
- **Paiements** (stub pour MVP) : préparer intégration **Stripe**/**PayPal**/**CMI** (Maroc) – pas nécessairement actif dans le tout premier sprint.
- **Observabilité & qualité**: ESLint, Prettier, Husky + lint-staged, Jest, Playwright (e2e), OpenTelemetry (optionnel), Sentry (optionnel).
- **CI/CD**: GitHub Actions (build, test, lint) + Docker (docker-compose pour dev).

Livrables attendus à chaque étape : code propre, tapé, testé, documenté (README par app + Storybook facultatif), seeds de données de démo, scripts npm **make-like**.

---

## 🧭 Vision & rôles

- **Client** (visiteur/utilisateur) : recherche par destination/date, filtres (prix, étoiles, équipements), page hôtel, panier/checkout, compte & réservations.
- **Hôtel (Extranet)** : fiches, photos, chambres, plans tarifaires, allotements, restrictions, calendrier, politique d’annulation, fermetures, promos.
- **Admin** : validation hôtels, modération médias/textes, gestion des traductions, rapports, gestions des rôles, tarification globale, intégrations (channels GDS/OTA, à venir).

---

## ✅ MVP – Périmètre initial

1) **Client/React**
- Page d’accueil (search box destination + dates, suggestions, autocomplétion)
- Résultats avec filtres (prix, étoiles, équipements), tri (prix, popularité, note)
- Page hôtel : photos, description, carte, types de chambres (prix/dispo), CTA réserver
- Auth client (email/mot de passe + OAuth), compte & historique réservations
- Checkout simple (sans paiement pour MVP), génération d’une réservation « confirmée »

2) **Extranet/Angular**
- Onboarding hôtel (profil, coordonnées, politique, taxes locales)
- Gestion chambres/types & inventaire (prix de base, capacité, équipements)
- Calendrier prix/dispos (day picker + bulk edit)
- Upload photos, gestion textes (FR) + clés i18n (préparation multilingue)

3) **Admin/Angular**
- Tableau de bord
- Validation/activation d’hôtels
- Gestion traductions clés (key/value) exposées aux apps
- Rôles & permissions (CRUD utilisateurs/partenaires)

4) **API NestJS**
- Auth & sessions (JWT access/refresh, RBAC)
- CRUD de base: Hotel, RoomType, RatePlan, Inventory, Booking, User
- Endpoints de recherche (query hôtels/chambres dispo sur dates)
- Seed & fixtures (10 hôtels, 3 villes, 50 types de chambre)

---

## 📁 Structure monorepo (Nx)

```
reserver-monorepo/
  apps/
    client/           # React (Next.js)
    extranet/         # Angular
    admin/            # Angular
    api/              # NestJS
  libs/
    ui/               # composants UI partagés (SCSS variables, icônes)
    models/           # schémas/Types TS communs
    utils/            # helpers communs
    i18n/             # utilitaires i18n + fichiers clés
  tools/
  .github/workflows/
  docker/
  package.json
  nx.json
  tsconfig.base.json
  README.md
```

---

## 🧱 Modèle de données (MVP – Prisma)

```prisma
model User {
  id        String  @id @default(cuid())
  email     String  @unique
  password  String
  role      Role
  createdAt DateTime @default(now())
  bookings  Booking[]
  hotels    Hotel[]   @relation("HotelOwners")
}

enum Role { CLIENT HOTEL ADMIN }

model Hotel {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  city        String
  address     String
  description String
  stars       Int
  owner       User?    @relation("HotelOwners", fields: [ownerId], references: [id])
  ownerId     String?
  roomTypes   RoomType[]
  photos      Photo[]
  isActive    Boolean  @default(false)
}

model RoomType {
  id        String  @id @default(cuid())
  hotel     Hotel   @relation(fields: [hotelId], references: [id])
  hotelId   String
  name      String
  capacity  Int
  amenities String[]
  ratePlans RatePlan[]
}

model RatePlan {
  id         String  @id @default(cuid())
  roomType   RoomType @relation(fields: [roomTypeId], references: [id])
  roomTypeId String
  name       String
  currency   String
  basePrice  Int      // en centimes
  refundable Boolean  @default(true)
}

model Inventory {
  id         String   @id @default(cuid())
  roomType   RoomType @relation(fields: [roomTypeId], references: [id])
  roomTypeId String
  date       DateTime
  allotment  Int
  price      Int      // override en centimes (optionnel)
}

model Booking {
  id         String  @id @default(cuid())
  user       User    @relation(fields: [userId], references: [id])
  userId     String
  hotel      Hotel   @relation(fields: [hotelId], references: [id])
  hotelId    String
  roomTypeId String
  checkIn    DateTime
  checkOut   DateTime
  totalCents Int
  status     BookingStatus @default(CONFIRMED)
}

enum BookingStatus { PENDING CONFIRMED CANCELLED }

model Photo {
  id      String @id @default(cuid())
  hotel   Hotel  @relation(fields: [hotelId], references: [id])
  hotelId String
  url     String
  alt     String
}
```

---

## 🔌 Endpoints API (échantillon – REST)

```
GET    /api/hotels?city=...&checkIn=...&checkOut=...&guests=...
GET    /api/hotels/:slug
POST   /api/bookings  { userId, hotelId, roomTypeId, checkIn, checkOut }
GET    /api/bookings/:id

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh

# Extranet (HOTEL)
GET    /api/extranet/me/hotel
PUT    /api/extranet/hotel
POST   /api/extranet/room-types
POST   /api/extranet/inventory/bulk

# Admin
GET    /api/admin/hotels?status=pending
POST   /api/admin/hotels/:id/activate
GET    /api/admin/i18n/keys
POST   /api/admin/i18n/keys
```

---

## 🌍 i18n – clés & back-office
- **Langue par défaut**: FR. 
- Les clés sont versionnées dans `libs/i18n` et synchronisées dans **Admin**.
- Les apps chargent dynamiquement les JSON de langue. 
- Exemple de clé : `hotel.details.amenities.pool` → « Piscine ».

---

## 🧰 Commandes & scaffolding (Nx)

```bash
# 1) Créer le monorepo
npx create-nx-workspace@latest reserver-monorepo --preset=ts
cd reserver-monorepo

# 2) Ajouter Next.js (client)
nx g @nx/next:app client --style=scss --routing=true

# 3) Ajouter Angular (extranet & admin)
nx g @nx/angular:app extranet --style=scss --routing=true
nx g @nx/angular:app admin --style=scss --routing=true

# 4) Ajouter NestJS (api)
nx g @nx/nest:app api

# 5) Librairies partagées
nx g @nx/js:lib ui --directory=libs
nx g @nx/js:lib models --directory=libs
nx g @nx/js:lib i18n --directory=libs

# 6) Dépendances principales
npm i -w api @nestjs/config @nestjs/passport passport passport-jwt bcrypt prisma @prisma/client zod
npm i -w client next-i18next i18next react-i18next react-bootstrap bootstrap
npm i -w extranet @ngx-translate/core @ngx-translate/http-loader @ng-bootstrap/ng-bootstrap
npm i -w admin @ngx-translate/core @ngx-translate/http-loader @ng-bootstrap/ng-bootstrap

# 7) Dev tools
npm i -D -w . eslint prettier husky lint-staged @types/bcrypt

# 8) Prisma init
npx prisma init --schema=apps/api/prisma/schema.prisma
```

> Ajouter **Bootstrap** dans `client/app/layout.tsx` et dans `extranet`/`admin` via styles globaux Angular.

---

## 🧪 Qualité & CI (extraits)
- **Husky**: pre-commit → `lint-staged` (eslint + prettier)
- **GitHub Actions**: build + test + prisma generate
- **Seeds**: script `npm run seed:dev` dans `api`.

---

## 🔐 Auth & RBAC (MVP)
- JWT (access + refresh), cookies httpOnly côté Next.js.
- Guards NestJS par rôle (CLIENT/HOTEL/ADMIN).
- Endpoints séparés par préfixe (`/api/extranet`, `/api/admin`).

---

## 🗺️ Roadmap Sprints (6–8 semaines)

**S1**: Scaffolding monorepo, CI, Prisma schema, auth basique, seeds.

**S2**: Recherche hôtel (API + React), listing & filtres, page détail.

**S3**: Extranet – CRUD hôtel, chambres, calendrier prix/dispos.

**S4**: Admin – validation hôtels, i18n clés, rôles.

**S5**: Checkout MVP (sans paiement), compte client, réservations.

**S6**: Optimisations, cache Redis, tests e2e, Sentry/OTel (optionnel).

---

## 📝 Issue 0 – à créer dans GitHub

**Titre**: Bootstrap du monorepo Nx (React + Angular + NestJS + Prisma)

**Description (copier-coller)**:
- Créer monorepo Nx `reserver-monorepo` 
- Générer apps : `client` (Next.js), `extranet` (Angular), `admin` (Angular), `api` (NestJS)
- Ajouter libs partagées `ui`, `models`, `i18n`
- Configurer ESLint/Prettier/Husky
- Initialiser Prisma + schema de base (voir doc)
- Ajouter Docker Compose (Postgres + Redis)
- Ajouter workflows GitHub Actions (build + test)
- Produire READMEs par app et un README racine

**Definition of Done**:
- `npm run dev` lance API + client + extranet + admin
- DB Postgres up via docker-compose, Prisma migrate OK
- Page d’accueil client rendue, route `/extranet` et `/admin` accessibles (squelettes)
- Lint/format passent en CI

---

## 🔧 Fichiers init essentiels

### `.env.example`
```
# API
PORT=3333
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/reserver
JWT_SECRET=change_me
REDIS_URL=redis://localhost:6379

# NEXT/CLIENT
NEXT_PUBLIC_API_URL=http://localhost:3333
DEFAULT_LOCALE=fr
SUPPORTED_LOCALES=fr,en,es,ar
```

### `docker-compose.yml` (extrait)
```yaml
version: '3.9'
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: reserver
    ports: ["5432:5432"]
    volumes: [db_data:/var/lib/postgresql/data]
  redis:
    image: redis:7
    ports: ["6379:6379"]
volumes:
  db_data: {}
```

---

## 🗣️ Prompt d’itération pour Copilot/ChatGPT

> **Contexte**: Nous construisons « reserver.ma », plateforme FR multilingue (gérable depuis l’Admin), avec trois surfaces : Client (React/Next.js), Extranet (Angular), Admin (Angular), API NestJS + Postgres/Prisma + Redis. UI Bootstrap. Rôles CLIENT/HOTEL/ADMIN. 
>
> **Tâche**: Écris le code minimal pour **[fonction à préciser]** en respectant l’architecture Nx, le typage strict, l’i18n, et le RBAC. Ajoute tests unitaires et un exemple de données (seed). Explique brièvement où coller les fichiers et comment lancer.
>
> **Contraintes**: accessibilité (ARIA), SEO (Next), sécurité (validation DTO/Zod, guards), code commenté et découpé.

**Exemples de tâches** :
- *Client*: page `/search` avec barre de recherche (destination/date), résultats mockés, filtres prix/étoiles.
- *API*: endpoint `GET /api/hotels` avec pagination & filtres, Prisma query.
- *Extranet*: composant Angular pour calendrier de prix/dispos + service HTTP.
- *Admin*: page de gestion de clés i18n (CRUD simple) avec table, modale, pagination.

---

## 🚀 Prochaines étapes
1) Créer le repo GitHub vide et coller ce document dans le README (ou utiliser le fichier téléchargé).
2) Ouvrir un Codespace, exécuter les commandes Nx ci‑dessus.
3) Créer **Issue 0** + **projet GitHub** (kanban) avec S1…S6.
4) Demander à Copilot/ChatGPT d’implémenter chaque tâche, une par une, en suivant ce Master Prompt.

*Objectif: une base solide, modulable et prête à scaler. On avance par sprints, proprement, en pensant déjà à la version 1.0 publique.* 💪🇲🇦
