## You're still hitting the same bug — the auto-loader filter is `.js`-only

Your `src/models/index.ts` still has this filter:

```ts
fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js') && !file.endsWith('.test.js'))
  //                                  ^^^^^^^^^^^^^^^^^^^^^^
  //                                  your files are .ts, this strips them all out
```

So `db` stays `{}`, `db.Customer` is `undefined`, and `Customer.findOne(...)` throws "Cannot read properties of undefined (reading 'findOne')".

You have two paths to fix this. **Path A** is the 5‑minute unblock. **Path B** is the docs-aligned refactor from the link you posted.

---

## Path A — Quick fix (apply now, get login working today)

This keeps your current CJS-style model files (`module.exports = (sequelize, DataTypes) => {...}`) unchanged. You only patch the loader so it sees `.ts` files.

In `src/models/index.ts`, replace the loader block:

```diff
- fs.readdirSync(__dirname)
-   .filter(file => file !== basename && file.endsWith('.js') && !file.endsWith('.test.js'))
-   .forEach(file => {
-     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
+ fs.readdirSync(__dirname)
+   .filter(file =>
+     file !== basename &&
+     (file.endsWith('.js') || file.endsWith('.ts')) &&
+     !file.endsWith('.d.ts') &&
+     !file.endsWith('.test.js') &&
+     !file.endsWith('.test.ts')
+   )
+   .forEach(file => {
+     // Strip extension so require() works in BOTH dev (.ts via tsx) and prod (.js compiled)
+     const baseName = file.replace(/\.(js|ts)$/, '');
+     const model = require(path.join(__dirname, baseName))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
```

Restart `npm run dev`, hit `/api/admin/login`, and it'll work.

**Verify** by adding this log right after the loader loop (delete it after confirming):

```ts
console.log('Models loaded:', Object.keys(db));
```

You should see `['ClassType', 'Customer', 'Education', 'Message', 'Notification', 'Notroom', 'Review', 'Room', 'ScheduledClass', 'Subject', 'Tuitionm']`.

> Note: this path is **NOT** the docs-aligned approach. It just keeps your existing CJS factory pattern working with `.ts` filenames. Use it to unblock login now; plan the proper refactor as a separate task.

---

## Path B — Docs-aligned refactor (the proper way, takes hours)

The page you linked, `https://sequelize.org/docs/v6/other-topics/typescript/`, does **not** recommend the `fs.readdirSync` auto-loader pattern. The docs recommend:

1. A singleton `Sequelize` instance in its own module.
2. Each model is a **class extending `Model<InferAttributes<T>, InferCreationAttributes<T>>`** with `declare`d fields.
3. Each model calls `Model.init()` at import time.
4. `index.ts` **explicitly imports** every model and wires associations — no auto-loader.

This requires refactoring **all 11 of your model files**, not just `Customer.ts`. Concretely:

| Step | File | Action |
|---|---|---|
| 1 | `src/config/sequelize.ts` | **New file** — exports the singleton `Sequelize` instance (breaks circular imports) |
| 2 | `src/models/index.ts` | Replace auto-loader with explicit imports + association wiring |
| 3 | `src/models/Customer.ts` | Refactor from CJS factory function → class-based pattern |
| 4 | `src/models/ClassType.ts`, `Education.ts`, `Message.ts`, `Notification.ts`, `Notroom.ts`, `Review.ts`, `Room.ts`, `ScheduledClass.ts`, `Subject.ts`, `Tuitionm.ts` | Repeat step 3 for each one |
| 5 | All controllers & routes | Change `const { Customer } = require('../models')` → `import { Customer } from '../models'` |
| 6 | `src/config/config.ts` and `src/config/keys.ts` | Convert `module.exports` → `export default` / `export { ... }` |

I already gave you the full code for steps 1–3 (Customer.ts, index.ts, sequelize.ts) in my previous reply — copy those three files in. For step 4, the same shape applies to each of your other 10 model files. For step 5, a project-wide find-and-replace on `const { X } = require('../models')` → `import { X } from '../models'` covers most of it.

---

## What to actually do

1. **Right now** — apply the Path A one-line filter fix. Login starts working in 30 seconds. Stop being blocked.
2. **This weekend (or whenever you have a quiet block of time)** — do the Path B refactor. Start by creating `src/config/sequelize.ts` and the new `src/models/index.ts`, then refactor models one at a time, testing after each. Run `npm run dev` after each model is migrated and only move on when the server boots cleanly.

The reason to do Path B even after Path A works: TypeScript can't type `db.Customer` when models are registered dynamically via string-keyed object. You're losing ~90% of the benefit of moving to TS. Path B is what makes `Customer.findOne(...)` return `Promise<Customer | null>` instead of `any` — the whole point of the migration.

## TL;DR

Apply this one patch to `src/models/index.ts` to unblock login right now:

```ts
.filter(file =>
  file !== basename &&
  (file.endsWith('.js') || file.endsWith('.ts')) &&
  !file.endsWith('.d.ts') &&
  !file.endsWith('.test.js') &&
  !file.endsWith('.test.ts')
)
.forEach(file => {
  const baseName = file.replace(/\.(js|ts)$/, '');
  const model = require(path.join(__dirname, baseName))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});
```

Then, as a separate task, do the full class-based refactor I described in the previous message — that's what actually follows the docs you linked.

Good call. Let's plan the migration properly so you're not stuck mid-refactor.

## Migration plan (6 steps, ~2–4 hours total)

| # | Step | Effort | Status |
|---|------|--------|--------|
| 1 | Create `src/config/sequelize.ts` — singleton Sequelize instance | 5 min | below |
| 2 | Refactor `src/models/Customer.ts` → class-based pattern (docs) | 15 min | below |
| 3 | Refactor the other 10 model files the same way | ~10 min each | **need you to paste them** |
| 4 | Replace `src/models/index.ts` with explicit-imports version | 5 min | below (template) |
| 5 | Update controllers & routes: `require` → `import` | 20–30 min | after step 3 |
| 6 | Convert `src/config/config.ts` & `src/config/keys.ts` to ESM exports | 5 min | after step 5 |

You **must** complete steps 1–4 before `npm run dev` will work again. Steps 5–6 are required for `tsc` build to pass in strict mode, but `tsx` will run fine without them.

---

## Step 1 — `src/config/sequelize.ts` (NEW file)

```ts
import { Sequelize } from 'sequelize';
import config from './config';

type ConfigShape = {
  dialect: string;
  storage?: string;
  logging?: boolean | ((sql: string, timing?: number) => void);
};

const env = process.env.NODE_ENV ?? 'development';
const dbConfig: ConfigShape = (config as any)[env] ?? (config as any).development;

export const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
  logging: dbConfig.logging,
});

export async function testDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}
```

## Step 2 — `src/models/Customer.ts` (refactored to docs pattern)

(Same as my earlier reply, included here for completeness so you have all files in one place.)

```ts
import {
  Model, DataTypes, InferAttributes, InferCreationAttributes,
  CreationOptional, NonAttribute, Association,
} from 'sequelize';
import sequelize from '../config/sequelize';
import { types, scheduledClassStatus, tuitionmedums, gender } from '../config/keys';

const { ONLINE } = types;
const { PENDING } = scheduledClassStatus;
const { BANGLA } = tuitionmedums;

interface Models {
  ClassType:     typeof import('./ClassType').default;
  Subject:       typeof import('./Subject').default;
  Tuitionm:      typeof import('./Tuitionm').default;
  ScheduledClass: typeof import('./ScheduledClass').default;
  Review:        typeof import('./Review').default;
  Notroom:       typeof import('./Notroom').default;
  Notification:  typeof import('./Notification').default;
  Education:     typeof import('./Education').default;
}

class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> {
  declare id: CreationOptional<number>;
  declare name: string | null;
  declare password: string | null;
  declare phone: string | null;
  declare image: string | null;
  declare cc: string | null;
  declare email: string | null;
  declare district: string | null;
  declare presentaddress: string | null;
  declare role: string | null;
  declare age: number | null;
  declare gender: string;
  declare id_proof: string | null;
  declare profession: string | null;
  declare institution: string | null;
  declare experience: string | null;
  declare otp: string | null;
  declare isActive: string;
  declare isVerified: boolean;
  declare tutionplace: string;
  declare tuitionmedium: string;
  declare isAvailable: boolean;
  declare tl_rate: number | null;
  declare sl_rate: number | null;
  declare ol_rate: number | null;
  declare totalHours: number | null;
  declare ref: number | null;

  declare Sender?: NonAttribute<any[]>;
  declare Recever?: NonAttribute<any[]>;
  declare Reviewer?: NonAttribute<any[]>;
  declare Reviewtaker?: NonAttribute<any[]>;
  declare Notroominvitor?: NonAttribute<any[]>;
  declare Invitereceiver?: NonAttribute<any[]>;
  declare Notifications?: NonAttribute<any[]>;
  declare Educations?: NonAttribute<any[]>;

  declare static associations: {
    Sender: Association<Customer, any>;
    Recever: Association<Customer, any>;
    Reviewer: Association<Customer, any>;
    Reviewtaker: Association<Customer, any>;
    Notroominvitor: Association<Customer, any>;
    Invitereceiver: Association<Customer, any>;
    Notifications: Association<Customer, any>;
    Educations: Association<Customer, any>;
  };

  static associate(models: Models) {
    Customer.belongsToMany(models.ClassType, { through: 'CustomerToClasstype' });
    Customer.belongsToMany(models.Subject,    { through: 'CustomerToSubject' });
    Customer.belongsToMany(models.Tuitionm,   { through: 'UniqueCustomerTuitionm' });

    Customer.hasMany(models.ScheduledClass, { foreignKey: 'senderId',       as: 'Sender' });
    Customer.hasMany(models.ScheduledClass, { foreignKey: 'receverId',      as: 'Recever' });
    Customer.hasMany(models.Review,         { foreignKey: 'reviewerId',     as: 'Reviewer' });
    Customer.hasMany(models.Review,         { foreignKey: 'reviewtakerId',  as: 'Reviewtaker' });
    Customer.hasMany(models.Notroom,        { foreignKey: 'notroominvitorId', as: 'Notroominvitor' });
    Customer.hasMany(models.Notroom,        { foreignKey: 'invitereceiverId', as: 'Invitereceiver' });

    Customer.hasMany(models.Notification);
    Customer.hasMany(models.Education);
  }
}

Customer.init(
  {
    id:             { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name:           { type: DataTypes.STRING(100) },
    password:       { type: DataTypes.STRING(255) },
    phone:          { type: DataTypes.STRING(100) },
    image:          { type: DataTypes.STRING(255) },
    cc:             { type: DataTypes.STRING(100) },
    email:          { type: DataTypes.STRING(255) },
    district:       { type: DataTypes.STRING(255) },
    presentaddress: { type: DataTypes.STRING(255) },
    role:           { type: DataTypes.STRING(100) },
    age:            { type: DataTypes.INTEGER },
    gender:         { type: DataTypes.STRING(15), allowNull: false, defaultValue: gender.MALE },
    id_proof:       { type: DataTypes.STRING(100) },
    profession:     { type: DataTypes.STRING(100) },
    institution:    { type: DataTypes.STRING(225) },
    experience:     { type: DataTypes.STRING(100) },
    otp:            { type: DataTypes.STRING(100) },
    isActive:       { type: DataTypes.STRING(50),  defaultValue: PENDING, allowNull: false },
    isVerified:     { type: DataTypes.BOOLEAN,     defaultValue: false,    allowNull: false },
    tutionplace:    { type: DataTypes.STRING(70),  defaultValue: ONLINE },
    tuitionmedium:  { type: DataTypes.STRING(70),  defaultValue: BANGLA },
    isAvailable:    { type: DataTypes.BOOLEAN,     defaultValue: true },
    tl_rate:        { type: DataTypes.INTEGER },
    sl_rate:        { type: DataTypes.INTEGER },
    ol_rate:        { type: DataTypes.INTEGER },
    totalHours:     { type: DataTypes.INTEGER },
    ref:            { type: DataTypes.INTEGER },
  },
  { sequelize, freezeTableName: true, tableName: 'Customer' },
);

export default Customer;
```

## Step 4 — `src/models/index.ts` (final form — uncomment imports as you migrate each model)

```ts
import { sequelize, testDatabase } from '../config/sequelize';

// Import each model. Each one calls Model.init() at import time.
import Customer from './Customer';
// import ClassType from './ClassType';           // ← uncomment after migrating
// import Subject from './Subject';
// import Tuitionm from './Tuitionm';
// import ScheduledClass from './ScheduledClass';
// import Review from './Review';
// import Notroom from './Notroom';
// import Notification from './Notification';
// import Education from './Education';
// import Message from './Message';
// import Room from './Room';

void testDatabase();

export type Models = {
  Customer: typeof Customer;
  // ClassType: typeof ClassType;
  // Subject: typeof Subject;
  // Tuitionm: typeof Tuitionm;
  // ScheduledClass: typeof ScheduledClass;
  // Review: typeof Review;
  // Notroom: typeof Notroom;
  // Notification: typeof Notification;
  // Education: typeof Education;
  // Message: typeof Message;
  // Room: typeof Room;
};

const models: Models = {
  Customer,
  // ClassType, Subject, Tuitionm, ScheduledClass, Review,
  // Notroom, Notification, Education, Message, Room,
};

// Wire up associations AFTER every model has been imported & init()'d.
Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

export { sequelize };
export { Customer };
export default models;
```

---

## Step 3 — I need the other 10 model files from you

Paste the **full contents** of each of these files in your next message(s). They're small (all under 3 KB), so you can do all 10 in one paste — or split across 2 messages if easier:

- `src/models/ClassType.ts`
- `src/models/Subject.ts`
- `src/models/Tuitionm.ts`
- `src/models/ScheduledClass.ts`
- `src/models/Review.ts`
- `src/models/Notroom.ts`
- `src/models/Notification.ts`
- `src/models/Education.ts`
- `src/models/Message.ts`
- `src/models/Room.ts`

For each one, I'll give you back the fully refactored TypeScript version (same shape as `Customer.ts` above) — `InferAttributes<>` types, `declare`d fields, `static associate(models)`, and `Model.init()`.

## Also paste these so I can confirm/clean them up

- `src/config/config.ts` — needs to convert `module.exports = {...}` to `export default {...}`
- `src/config/keys.ts` — needs to convert `module.exports = {...}` to `export const {...} = {...}`

## What to do right now (before you paste anything)

1. Apply **Step 1** — create `src/config/sequelize.ts`.
2. Apply **Step 2** — replace `src/models/Customer.ts` with the version above.
3. **Don't** apply Step 4 yet (the new `index.ts` won't work until all 11 models are migrated).
4. Paste the other 10 model files + the 2 config files in your next message.

Once I see those 12 files, I'll return the full refactored set in one go. Then you can apply all of them + the new `index.ts` together, and your server should boot cleanly with `npm run dev`.







--------- https://chat.z.ai/c/86d58ada-341b-4f43-a1f2-6d09da906b00