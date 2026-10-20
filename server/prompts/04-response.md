## Your project structure is now correct — only one line needs fixing

Everything is in the right place:

- ✅ `.env` at root
- ✅ `src/server.ts`
- ✅ `src/routes/`, `src/models/`, `src/bootstrap/`, `src/socket/`, `src/swagger-output.json`

The only bug is this single line:

```ts
dotenv.config({ path: '../.env' });   // ❌ goes one level ABOVE project root
```

Change it to:

```ts
dotenv.config({ path: './.env' });    // ✅
```

…or simply:

```ts
dotenv.config();                       // ✅ defaults to './.env' anyway
```

## Why `../.env` is wrong

`dotenv.config({ path: '...' })` resolves the path **relative to the Current Working Directory (CWD)** — not relative to where `server.ts` lives.

When you run `npm run dev` (which executes `tsx watch src/server.ts`), your shell is in:

```
/home/shayon/Documents/web/ponditi-lms/server/   ← CWD
```

So the path you pass resolves like this:

| Path you wrote | Resolves to | Exists? |
|---|---|---|
| `'./.env'`  | `ponditi-lms/server/.env` | ✅ Yes — your file is here |
| `'../.env'` | `ponditi-lms/.env` | ❌ No — this is the **parent** folder |

`'../.env'` was telling dotenv to look in `/home/shayon/Documents/web/ponditi-lms/.env` (one folder up from your project). That path doesn't exist, so dotenv silently fails and `process.env.*` stays `undefined`.

## Verify it actually loaded

Add this temporary debug right after the `dotenv.config()` call:

```ts
const result = dotenv.config({ path: './.env' });
if (result.error) {
  console.error('❌ dotenv failed:', result.error.message);
} else {
  console.log('✅ dotenv loaded keys:', Object.keys(result.parsed || {}));
}
console.log('CWD           =', process.cwd());
console.log('PORT          =', process.env.PORT);
console.log('FRONTEND_URL  =', process.env.FRONTEND_URL);
```

Run `npm run dev` and you should see the actual values from `.env` printed. Once confirmed, delete the debug lines.

## Good news about your `require()` calls

All of these are **module-resolution paths** (resolved relative to the importing file, not CWD), and your structure now supports them perfectly:

```ts
require('./swagger-output.json')      // → src/swagger-output.json       ✅
require('./routes/userRouter')        // → src/routes/userRouter          ✅
require('./routes/searchRouter')      // → src/routes/searchRouter        ✅
require('./routes/adminRouter')       // → src/routes/adminRouter        ✅
require('./routes/classtypeRouter')   // → src/routes/classtypeRouter    ✅
require('./routes/subjectRouter')     // → src/routes/subjectRouter      ✅
require('./routes/scheduledclassRouter') // → src/routes/scheduledclassRouter ✅
require('./routes/reviewRouter')      // → src/routes/reviewRouter        ✅
require('./routes/tuitionmRouter')    // → src/routes/tuitionmRouter     ✅
require('./routes/messageRouter')     // → src/routes/messageRouter      ✅
require('./models')                   // → src/models                    ✅
require('./bootstrap/createAdmin')    // → src/bootstrap/createAdmin    ✅
require('./socket/socketRoutes')      // → src/socket/socketRoutes       ✅
```

These work because `src/server.ts` and `src/routes/`, `src/models/`, etc. all live side-by-side under `src/`. The `./` correctly points to siblings.

The only thing that's CWD-relative (not file-relative) in your `server.ts` is `dotenv.config({ path: '...' })` and `express.static('uploads')`:

```ts
app.use(express.static('uploads'));   // looks for CWD/uploads → ponditi-lms/server/uploads
```

Wait — `uploads/` is inside `src/`, not at root. So this line will also break. Either:

1. Move `uploads/` to the project root (recommended — uploaded user files shouldn't be inside `src/` since `src/` gets compiled and `uploads/` is runtime data):
   ```bash
   mv src/uploads ./uploads
   ```

2. Or change the static path:
   ```ts
   app.use(express.static(path.join(__dirname, 'uploads')));
   ```
   (you'll need `const path = require('path');` at the top, and after build this becomes `dist/uploads/` which is also wrong — so option 1 is cleaner.)

## TL;DR — one-line fix

```diff
- dotenv.config({ path: '../.env' });
+ dotenv.config({ path: './.env' });
```

That's it. Your env vars will start loading. Then optionally move `uploads/` out of `src/` to the project root so `express.static('uploads')` keeps working after `tsc` builds.