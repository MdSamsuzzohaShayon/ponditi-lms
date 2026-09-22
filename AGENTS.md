# AGENTS.md

Ponditi LMS is a tuition-management platform. Monorepo with **no workspace tooling**: `client/` and `server/` are separate npm projects with no shared root `package.json`. Install, run, and verify each from its own directory.

## Layout

- `client/` — Next.js 16 (App Router under `client/src/app`), TypeScript, Redux Toolkit, Bootstrap/Sass. Dev server on port 3000.
- `server/` — Express 5, **plain CommonJS JavaScript**, Sequelize 6, Socket.IO. Entry: `server/server.js`, mounts routers under `/api/*`, serves `uploads/` statically, default port 9000 (`PORT` env overrides). All endpoint code here is JS, not TS.
- Real-time chat lives in `server/socket/socketRoutes.js` (Socket.IO server shares the Express HTTP server).

## Commands

Client (`cd client`):
- `npm run dev` (`next dev`), `npm run build`, `npm run lint` (eslint flat config)
- No typecheck script — use `npx tsc --noEmit`
- Talks to the API via axios baseURL `${BACKEND_URL}/api` with credentials. `NEXT_PUBLIC_BACKEND_URL` must be in `client/.env.local` (gitignored, no committed example).

Server (`cd server`):
- `npm run dev` (nodemon, `NODE_ENV=development`), `npm start` (production)
- Loads env from `./.env` via dotenv (`.env` is gitignored; copy from `.env.example`)
- Runtime DB is always **SQLite** (`server/config/config.js` chooses per-`NODE_ENV`; files in `server/database/`, override storage with `DB_STORAGE`). The MySQL/MSSQL env vars in `.env.example` are unused at runtime.
- **`npm run migrate` and `npm run migrate:undo` are broken as-is**: `.sequelizerc` points sequelize-cli at `config/mssql-config.js`, which does not exist in the repo. Use `npx sequelize-cli db:migrate --config ./config/config.js` (mirrors the working `npm run seeder`, which passes `--config` explicitly).
- `npm run seeder` seeds dev data (classtype/subject/tuitionm/customer).
- `npm run swagger-autogen` regenerates the committed `server/swagger-output.json`, which is `require`d at server startup — run it after changing route annotations or the server will serve stale docs.
- **There is no test suite**: no test script, no Jest dependency, no `*.test.*`/`*.spec.*` files despite README claims. `npm test` doesn't exist in either package. There is also no server lint script (only `.eslintrc.js`, airbnb-base + prettier).

## Conventions

- Shared domain enums are duplicated: `server/config/keys.js` and `client/src/config/keys.ts` (roles ADMIN/TEACHER/STUDENT, tuition types TL/SL/ONLINE/ANY, class statuses). Keep both in sync when adding values.
- New models go in `server/models/` (auto-loaded by `models/index.js`; export `(sequelize, DataTypes) => model` and define `associate(db)`). Schema changes go through new migrations in `server/migrations/`.
- Auth is JWT in HTTP cookies; the client passes cookies cross-origin, so CORS origin must match `FRONTEND_URL`.
- `client/README.md` keeps a known tech-debt checklist (`@ts-ignore` cleanup, `<img>` → `next/image`); recurring `// temp` code in client.

## Deploy / CI — the README is stale, trust config over prose

- No working CI: `.github/workflows/deploy.yml` (push to `master`) and the typo'd `.github/wordflows/deploy.yml` define triggers but no real jobs.
- Real deployment is `server/auto-deploy.sh`, run on the server box: clones the repo, keeps only `server/`, installs with `--force`, runs via PM2.
- Root `deploy.sh` and `docker-compose.dev.yml` are committed but **empty**. `docker-compose.yml` is stale/broken: nginx `default.conf` refer to upstreams `client`/`server`/`api` while compose services are `frontend`/`backend`/`mysqldb`, plus it references env files (`./server/.env.local`, `./config/.env`) that don't exist in the repo. Do not follow README or compose instructions blindly.
- All `.env*` files are gitignored except `server/.env.mssql.local` (committed leftover of a previous DB setup; no longer used locally).