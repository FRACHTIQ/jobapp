# GetInJob (Milestone 1)

Monorepo with:

- `apps/mobile`: Expo app for Expo Go testing
- `apps/api`: Fastify API for Railway + Postgres

## Stack

- Mobile: Expo + Expo Router + React Native
- API: Fastify + Prisma + JWT
- Database: PostgreSQL
- Deploy: Railway (API service)

## 1) Setup

```powershell
npm install
```

Create a `.env` in root (see `.env.example`).

## 2) Database (local or Railway Postgres)

```powershell
npm run db:generate
npm run db:migrate
npm run db:seed
```

## 3) Run API (local)

```powershell
npm run dev:api
```

Health endpoint:

- `GET http://localhost:4000/health`

## 4) Run Mobile (Expo Go)

```powershell
npm run dev:mobile
```

Set API URL via env:

- `EXPO_PUBLIC_API_URL=http://<your-local-ip>:4000`

Note: for physical device testing with Expo Go, use your machine LAN IP (not `localhost`).

## 5) Railway deploy (API)

Repository: [https://github.com/FRACHTIQ/jobapp.git](https://github.com/FRACHTIQ/jobapp.git)

Recommended Railway service settings:

- Root Directory: `/` (keep monorepo root)
- Build Command: `npm run build --workspace api`
- Start Command: `npm run start --workspace api`

Environment variables on Railway:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT` (Railway usually injects this automatically)

## API Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /jobs`
- `GET /jobs/:id`
- `POST /jobs/:id/save` (auth)
- `DELETE /jobs/:id/save` (auth)
- `POST /jobs/:id/apply` (auth)
