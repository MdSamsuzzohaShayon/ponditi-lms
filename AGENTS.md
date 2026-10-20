# AGENTS.md

Ponditi LMS is a split monorepo: `client/` and `server/` are separate npm projects with **no workspace tooling**. Work in each directory independently.

## Quick start

```bash
# Client
cd client && npm install
cp .env.local.example .env.local 2>/dev/null || true  # create if needed; see Env

# Server
cd ../server && npm install
cp .env.example .env
```

Run in two terminals:
- `cd server && npm run dev` (port 9000 default; `PORT` overrides)
- `cd client && npm run dev` (port 3000)

## Layout

- **client/** — Next.js 16 (App Router under `client/src/app`), TypeScript, Redux Toolkit, Bootstrap/Sass. Port 3000.
- **server/** — Express 5, **CommonJS (plain JS)**, Sequelize 6, Socket.IO. Entry: `server/server.js`. Mounts `/api/*`, serves `uploads/` statically. Port 9000. All route/controller code is JS (not TS).
- **Real-time**: `server/socket/socketRoutes.js` (Socket.IO shares the Express HTTP server).

## Commands

### Client (`cd client`)

- `npm run dev` — Next.js dev server
- `npm run build` — production build
- `npm run lint` — ESLint (flat config)
- `npx tsc --noEmit` — typecheck (no `npm run typecheck` script)
- API base: axios uses `${BACKEND_URL}/api` with credentials. Set `NEXT_PUBLIC_BACKEND_URL` in `client/.env.local`.

### Server (`cd server`)

- `npm run dev` — nodemon (NODE_ENV=development)
- `npm start` — production
- `npm run seeder` — seed dev data (classtype/subject/tuitionm/customer). Uses `--config ./config/config.js`.
- `npm run swagger-autogen` — regenerate committed `server/swagger-output.json` (required at startup). Run after changing route annotations.
- **Migrations**: `npm run migrate` / `npm run migrate:undo` are **broken as-is**. `.sequelizerc` points to `config/mssql-config.js` which does not exist. Use:
  - `npx sequelize-cli db:migrate --config ./config/config.js`
  - `npx sequelize-cli db:migrate:undo --config ./config/config.js`
- **No test suite**: no `npm test`, no Jest, no `*.test.*`/`*.spec.*` files. README's test claims are stale.
- **No server lint script**: only `.eslintrc.js` (airbnb-base + prettier). If you need to lint server, run `npx eslint .` from `server/`.

## Environment

- **Server** loads env from `server/.env` via dotenv (`.env` gitignored; copy from `.env.example`). Runtime DB is **SQLite only** (`server/config/config.js` selects by `NODE_ENV`; files under `server/database/`, override with `DB_STORAGE`). MySQL/MSSQL vars in `.env.example` are unused at runtime.
- **Client** reads `client/.env.local` (gitignored). Required: `NEXT_PUBLIC_BACKEND_URL` (e.g. `http://localhost:9000`).
- Auth uses JWT in HTTP cookies; CORS origin must match `FRONTEND_URL`.
- `.env*` files are gitignored except `server/.env.mssql.local` (leftover, unused locally).

## Architecture & Conventions

- **Models**: add to `server/models/`. Auto-loaded by `models/index.js`. Export `(sequelize, DataTypes) => model` and implement `associate(db)`. Schema changes require new migrations in `server/migrations/`.
- **Routers/controllers**: CommonJS under `server/routes/`, `server/controllers/`. API mounted at `/api/*`.
- **Socket**: real-time chat in `server/socket/socketRoutes.js`.
- **Duplicate enums**: `server/config/keys.js` and `client/src/config/keys.ts` define roles (ADMIN/TEACHER/STUDENT), tuition types (TL/SL/ONLINE/ANY), class statuses. **Keep them in sync** when adding values.
- **Swagger**: `server/swagger.js` + committed `server/swagger-output.json` (required on startup). Regenerate with `npm run swagger-autogen` after changing route annotations.

## Verification (minimal)

- Client: `cd client && npm run lint && npx tsc --noEmit`
- Server: `cd server && node -e "require('./server')"` will fail fast on import errors (if you want a quick smoke check), but expect the HTTP server to start; prefer reading changed files and running affected flows. No automated tests exist.

## Important gotchas (trust config over prose)

- **Migrate scripts broken**: use explicit `--config ./config/config.js` (see Commands).
- **SQLite at runtime**: config ignores MySQL/MSSQL env despite README/Docker mentions. Do not assume another DB locally.
- **No tests**: roadmap mentions tests but they don't exist in repo. Don't waste time looking for test commands/files.
- **Deploy/Docker stale**: `deploy.sh` and `docker-compose.dev.yml` are empty. `docker-compose.yml` references non-existent env files and mismatched service names vs nginx upstreams (`frontend/backend` vs `client/server/api`). Real deploy is `server/auto-deploy.sh` on the server (PM2). Treat README/docker-compose as historical, not instructions.
- **CI incomplete**: `.github/workflows/deploy.yml` and the typo'd `.github/wordflows/deploy.yml` exist but have no real jobs.
- **Stale docs**: README contains historical/aspirational content. Prefer this AGENTS.md and executable configs (`package.json`, `.sequelizerc`, `server/config/*`, `client/next.config.ts`, `client/eslint.config.mjs`).
- **Client tech-debt**: see `client/README.md` for known items (`@ts-ignore`, `<img>` → `next/image`), recurring `// temp` markers.
- **No server lint command**: use `npx eslint .` if needed.

## Where to look first

When unfamiliar, read in this order: `README.md`, `AGENTS.md`, `client/package.json`, `server/package.json`, `server/.sequelizerc`, `server/config/config.js`, `server/config/keys.js`, `client/src/config/keys.ts`, `client/next.config.ts`, `server/server.js`, `server/routes/index.js`. This will reveal the real wiring faster than browsing randomly.

## Writing guidance for changes

- Keep changes consistent with surrounding code style and CommonJS (server) / TS (client).
- Investigate unfamiliar files before overwriting/deleting (treat as possible user work).
- For targeted edits, use the edit tool with sufficient surrounding context (unique `oldString`) or `replaceAll` only when intentional.
- Reference exact file paths when communicating findings.