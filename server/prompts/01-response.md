## What the error means

`TS18003: No inputs were found` is TypeScript's way of saying:

> "I looked inside the `include` patterns you gave me (`src/**/*`) and found **zero** files I'm allowed to compile. Nothing to do — aborting."

It is **not** a syntax error in your code. It is a **file‑discovery** error. TypeScript is looking in `./src/` and finding nothing (or nothing it considers compilable).

## Why it's happening to you

Your `tsconfig.json` says:

```json
"rootDir": "./src",
"outDir": "./dist",
"include": ["src/**/*"],
"allowJs": true
```

But based on what you pasted, your `server.ts` is almost certainly **not** inside a `src/` folder — it's sitting at the project root (`/home/shayon/Documents/web/ponditi-lms/server/server.ts`), alongside the old JS files like `swagger.js`, `routes/userRouter.js`, etc.

So when `tsc` runs, it looks in `src/`, finds it empty (or non‑existent), and bails out.

## Quick diagnosis (run these)

From your project root:

```bash
# 1. Does src/ even exist?
ls -la src 2>/dev/null || echo "src/ does not exist"

# 2. Where are your .ts files actually living?
find . -name "*.ts" -not -path "./node_modules/*" -not -path "./dist/*"
```

If `find` shows your `.ts` files at the root and `src/` doesn't exist → that's the bug.

## Fix — pick ONE of these three

### Option A (recommended): move your code into `src/`

Create the structure your `tsconfig` already expects:

```bash
mkdir -p src
# Move all your app code (not config files like swagger.js, .sequelizerc, config/)
mv server.ts src/
mv routes/ models/ controllers/ middleware/ bootstrap/ socket/ utils/ services/ src/ 2>/dev/null
```

Then update all the relative `require('./routes/userRouter')` paths inside `server.ts` — they'll still work because they're relative to `src/server.ts`. But you'll also need to move `swagger-output.json` into `src/` (or fix its path), and the `./.env` path will resolve from the **CWD you run `node` from**, not from the file's location — so start the server from the project root: `node dist/server.js`.

### Option B: change `tsconfig` to match your current layout

If you'd rather keep files at the root, change:

```json
"rootDir": ".",
"include": ["**/*.ts", "**/*.js"],
"exclude": ["node_modules", "dist", "swagger.js", "config", "build"]
```

…and rename `server.ts` → keep as is. This is messier because `tsc` will try to compile `swagger.js`, `sequelize`'s `config/config.js`, migration files, etc. You'd need a longer `exclude` list. Option A is cleaner.

### Option C: you literally don't have a `server.ts` yet

If you "converted to TypeScript" only by editing `package.json` and `tsconfig.json` but never renamed/created `server.ts`, then there are no `.ts` files anywhere. Rename your `server.js` → `server.ts`, then apply Option A or B.

## While you're fixing it — three more problems you'll hit next

1. **`server.ts` is still 100% CommonJS** (`require('dotenv')`, `require('express')`, etc.). With `"verbatimModuleSyntax": true` and `"module": "nodenext"`, you'll want ESM imports:
   ```ts
   import dotenv from 'dotenv';
   dotenv.config({ path: './.env' });
   import express from 'express';
   import cookieParser from 'cookie-parser';
   // etc.
   ```
   Otherwise TypeScript compiles fine but you lose 90% of the benefit of moving to TS, and type‑checking of imported modules will be weak.

2. **`process.env.FRONTEND_URL`** — with `"noUncheckedIndexedAccess": true`, TS will complain that `process.env.FRONTEND_URL` is `string | undefined`. You'll need:
   ```ts
   const FRONTEND_URL = process.env.FRONTEND_URL ?? '';
   ```
   …or install `@types/node` (currently your `types: []` blocks it) and add `"types": ["node"]`.

3. **`@types/node` is installed but ignored** — your tsconfig has `"types": []`, which disables auto‑inclusion of `@types/*`. Either remove that line or set `"types": ["node"]`. Without it, `process`, `__dirname`, `Buffer`, etc. won't be typed.

## TL;DR

`TS18003` = "no `.ts` files inside `src/`". Create `src/`, move `server.ts` (and the rest of your app code) into it, then run `npm run build` again. After that you'll start seeing real type errors — fix those by converting `require(...)` → `import ...` and enabling `"types": ["node"]`.