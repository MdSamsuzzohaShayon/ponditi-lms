# Ponditi LMS Backend

Welcome to the **Ponditi LMS Backend**! This project powers the learning management system with a **Sequelize + SQLite backend**, providing user management, subjects, classes, and more.

This guide will help you **set up, run, and deploy** the backend efficiently.

---

## 🔧 Things to Improve / To Do

* Use **Cloudflare** for image uploads to optimize performance.
* Update API documentation at [`http://localhost:9000/api/docs/`](http://localhost:9000/api/docs/)

  * Remove unnecessary endpoints from Swagger to keep docs clean.
* Set up **SMS services**; if unavailable, fallback to **Gmail**.
* Configure a reliable **email service** for notifications.

---

## ⚡ Usage

### 1. Running Migrations

Apply database migrations:

```bash
npx sequelize-cli db:migrate --config ./config/config.js
```

**Reference:** [Sequelize Migrations](https://sequelize.org/docs/v6/other-topics/migrations/#running-migrations)

---

### 2. Creating Seeders

Generate new seed files:

```bash
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli seed:generate --name subject
npx sequelize-cli seed:generate --name classtype
npx sequelize-cli seed:generate --name education
npx sequelize-cli seed:generate --name tuitionm
```

Seed the database:

```bash
npx sequelize-cli db:seed:all --config ./config/config.js
```

**Reference:** [Sequelize Seeders](https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-seed)

---

### 3. Inspecting the Database

Check table structure in SQLite:

```bash
sqlite3 ./database/ponditi-dev.sqlite
PRAGMA table_info(Customer);
```


### 4. Running the server

Check table structure in SQLite:

```bash
npm run dev
```

---

## 🚀 Deployment

* Update `.env` values based on `.env.example`.
* Use **PM2** for process management and continuous deployment.

Example PM2 commands:

```bash
pm2 start server.js --name ponditi-backend
pm2 restart ponditi-backend
pm2 logs ponditi-backend
```

---

## 🗂 Folder Structure

Here’s a quick overview of the backend project structure:

```
server/
├─ config/             # Database & environment configs
├─ controllers/        # API route controllers
├─ database/           # SQLite database files
├─ migrations/         # Sequelize migrations
├─ models/             # Sequelize models
├─ routes/             # API routes
├─ seeders/            # Database seeders
├─ socket/             # Socket.io events
├─ uploads/            # Uploaded files
├─ utils/              # Utility functions
├─ server.js           # Entry point
├─ swagger.js          # Swagger configuration
├─ .env                # Environment variables
├─ package.json
└─ README.md
```

Other notable files:

* `Dockerfile` / `Dockerfile.dev` – for containerization
* `.prettierrc`, `.eslintrc.js` – formatting & linting configs
* `Ponditi-nodejs-lms.postman_collection.json` – Postman API collection

---

## 📌 Notes

* Always run **migrations before seeding** to avoid errors.
* Check your `Customer` table for missing columns before seeding.
* Keep API docs updated whenever new endpoints are added.
