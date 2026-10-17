This is a classic migration issue: **`tsc` only compiles `.ts` files — it does not copy non-TypeScript assets like `.json` files into `dist/`**.

Your `src/swagger-output.json` exists, but `dist/swagger-output.json` does not, so the compiled `dist/server.js` fails when it does `require('./swagger-output.json')`.

Let me verify by looking at what's likely in `dist/`:

```bash
ls -la dist/
```

You'll see `dist/server.js` but **no** `dist/swagger-output.json`.

---

## ✅ The Fix — Choose One

### Option 1: Copy assets as part of the build (recommended)

Add a copy step to your `build` script. No extra dependencies needed on Linux/macOS:

```json
{
  "scripts": {
    "build": "tsc && npm run copy:assets",
    "copy:assets": "cp src/swagger-output.json dist/",
    "start": "node dist/server.js"
  }
}
```

If you want a cross-platform solution (works on Windows too), install `copyfiles`:

```bash
npm install --save-dev copyfiles
```

```json
{
  "scripts": {
    "build": "tsc && copyfiles -u 1 \"src/**/*.json\" dist",
    "start": "node dist/server.js"
  }
}
```

`-u 1` strips the leading `src/` segment so files land directly in `dist/`.

---

### Option 2: Generate `swagger-output.json` at build time

Since you already have `src/swagger.ts`, you're likely generating the Swagger spec via `swagger-autogen`. Make it write directly into `dist/` (or both locations) as part of the build:

```json
{
  "scripts": {
    "build": "tsc && node dist/swagger.js",
    "start": "node dist/server.js"
  }
}
```

Then in `src/swagger.ts`, point the output path to `dist/`:

```ts
import swaggerAutogen from 'swagger-autogen';

const outputFile = './dist/swagger-output.json';
const endpointsFiles = ['./dist/routes/**/*.js'];

swaggerAutogen()(outputFile, endpointsFiles);
```

Or, even better, **generate it at runtime** so you never have to worry about the build pipeline copying it — remove the `require('./swagger-output.json')` and instead load it from a path that exists in both `src` (dev) and `dist` (prod), e.g., `process.cwd()`:

```ts
// src/server.ts
import path from 'path';
import fs from 'fs';

const swaggerPath = path.join(process.cwd(), 'src', 'swagger-output.json');
// or resolve dynamically:
// const swaggerPath = path.join(__dirname, 'swagger-output.json');
```

---

### Option 3: Move it out of the compile path

If the JSON is purely runtime config, some teams move it to the project root (`./swagger-output.json`) and reference it as:

```ts
require('../swagger-output.json')
```

Then it's never expected inside `dist/`. Combined with `resolveJsonModule: true` in `tsconfig.json`, you can even do:

```ts
import swaggerDoc from '../swagger-output.json';
```

---

## 🔍 Also check `tsconfig.json`

If you haven't already, add `"resolveJsonModule": true` — otherwise a `import ... from './swagger-output.json'` in TS source will fail to compile:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

---

## Why this happened

Your previous JS project probably had `server.js` and `swagger-output.json` sitting **side-by-side in the same folder**, so `require('./swagger-output.json')` resolved fine. After migration, the source layout became `src/server.ts` + `src/swagger-output.json`, but the **build output** only contains `dist/server.js` — the JSON never got copied. Node then looks for `dist/swagger-output.json` and fails.

---

## Recommended quick fix

Run this once to confirm:

```bash
cp src/swagger-output.json dist/ && npm run start
```

If it starts, adopt **Option 1** (add `copy:assets` to `build`) so it's automatic going forward. For long-term cleanliness, I'd also make `swagger.ts` write the file into `dist/` during `build` (Option 2 combined with Option 1).