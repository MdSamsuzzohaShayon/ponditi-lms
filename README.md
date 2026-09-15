# Ponditi

Ponditi is an online tuition management platform that connects learners with teachers and manages the complete tuition lifecycle — from teacher discovery and tuition requests to scheduling, real-time communication, class completion, payments, notifications, and reviews.

The project is built as a full-stack TypeScript/JavaScript application with a Next.js frontend and Node.js/Express backend.

## Features

### Learner

* Search and filter teachers
* Search by subject, class, medium, location, and tuition type
* View teacher profiles
* Send tuition requests
* Select available time slots
* View request history
* Communicate with teachers through real-time chat
* Receive notifications
* View scheduled classes
* Provide feedback and reviews
* Manage profile and educational information
* Update personal information
* Change password

### Teacher

* Create and manage teacher profiles
* Add educational qualifications
* Add teaching subjects and class types
* Configure hourly tuition rates
* Configure rates based on tuition type
* Set availability status
* Receive and manage tuition requests
* Accept or reject requests
* Start and finish scheduled classes
* Track class duration
* Mark tuition payments as received
* Communicate with learners through real-time chat
* Block users when necessary
* Receive notifications
* Manage profile information

### Admin

* Manage users
* Verify teacher profiles
* Approve or reject users
* Manage classes and subjects
* Search users by ID, name, and phone number
* View user counts
* Receive notifications for expired tasks
* Manage platform data
* Seed development data

### Real-Time Communication

* Socket.IO-based real-time chat
* Room-based communication
* User-to-user messaging
* Message notifications
* Chat availability based on tuition status
* Ability to initiate communication during the tuition workflow

### Tuition Management

The tuition workflow supports:

```text
Teacher Discovery
       ↓
Tuition Request
       ↓
Slot Selection
       ↓
Request Approval
       ↓
Scheduled Class
       ↓
Class Started
       ↓
Duration Tracking
       ↓
Class Completed
       ↓
Payment
       ↓
Review / Feedback
```

## Technology Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Redux Toolkit
* React Redux
* Axios
* Socket.IO Client
* Bootstrap
* Sass
* Google Maps API
* Geoapify Geocoder

### Backend

* Node.js
* Express 5
* JavaScript
* Sequelize ORM
* Socket.IO
* JWT authentication
* Cookie-based authentication
* Express Validator
* Nodemailer
* Swagger
* Multer
* Sharp

### Databases

The backend has supported multiple database configurations during development:

* SQLite — local development
* Microsoft SQL Server — previous deployment/development environment
* MySQL — supported through Sequelize

### Infrastructure

* Docker
* Docker Compose
* Nginx
* AWS S3
* GitHub Actions
* Cloud/server deployment

### Development Tools

* ESLint
* Prettier
* Jest / testing
* Sequelize CLI
* Nodemon
* Swagger

---

# Architecture

Ponditi follows a separated frontend/backend architecture.

```text
                    ┌──────────────────────┐
                    │       Client         │
                    │   Next.js + React    │
                    └──────────┬───────────┘
                               │
                         HTTP / WebSocket
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Server         │
                    │   Node.js + Express  │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
          Database         Socket.IO         AWS S3
          Sequelize        Real-time          Images
```

The frontend and backend are maintained as separate applications inside the repository.

---

# Repository Structure

```text
ponditi-lms/
├── client/
│   ├── public/
│   ├── src/
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── socket/
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── nginx/
├── secrets/
├── .github/
├── docker-compose.yml
├── docker-compose.dev.yml
├── deploy.sh
└── README.md
```

---

# Requirements

Before running the project locally, install:

* Node.js
* npm
* Git
* Docker and Docker Compose (optional)
* A supported database depending on the selected configuration

Check your versions:

```bash
node --version
npm --version
git --version
```

---

# Getting Started

## 1. Clone the repository

```bash
git clone <repository-url>
cd ponditi-lms
```

## 2. Install frontend dependencies

```bash
cd client
npm install
```

## 3. Install backend dependencies

```bash
cd ../server
npm install
```

## 4. Configure environment variables

Create a `.env` file inside the `server` directory:

```bash
cd server
cp .env.example .env
```

Configure the required environment variables according to your local environment.

Example:

```env
# Database
DB_USER=admin
DB_PASSWORD=local_dev_password
DB_NAME=ponditi
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite

# Authentication
JWT_SECRET=change-this-in-development

# Frontend
FRONTEND_URL=http://localhost:3000
```

> Never commit production credentials, JWT secrets, AWS credentials, email passwords, or other sensitive values to Git.

---

# Running the Application

The frontend and backend run independently.

## Start the backend

```bash
cd server
npm run dev
```

The backend will start using the development configuration.

## Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The Next.js development server will start locally.

---

# Backend Scripts

Available backend commands:

```bash
npm run dev
npm start
npm run migrate
npm run migrate:undo
npm run seeder
npm run swagger-autogen
npm run update
```

### Development

```bash
npm run dev
```

Starts the backend with Nodemon.

### Production

```bash
npm start
```

Starts the backend using the production environment.

### Database Migration

```bash
npm run migrate
```

### Undo Latest Migration

```bash
npm run migrate:undo
```

### Seed Database

```bash
npm run seeder
```

### Generate Swagger Documentation

```bash
npm run swagger-autogen
```

---

# Frontend Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
npm run update
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Production Server

```bash
npm start
```

### Lint

```bash
npm run lint
```

---

# Database

The backend uses Sequelize as its ORM.

Database-related code is organized into:

```text
server/
├── config/
├── database/
├── migrations/
├── models/
└── seeders/
```

## Migrations

Database schema changes should be handled through Sequelize migrations rather than manually modifying production databases.

Create a migration using Sequelize CLI:

```bash
npx sequelize-cli migration:generate --name migration-name
```

Run migrations:

```bash
npm run migrate
```

Undo the latest migration:

```bash
npm run migrate:undo
```

## Seeders

Development data can be generated using Sequelize seeders.

```bash
npm run seeder
```

---

# Authentication

The application uses token-based authentication with JWT.

Authentication is combined with HTTP cookies to maintain authenticated sessions between the frontend and backend.

The application distinguishes between different user roles, including:

* Learner
* Teacher
* Admin

Authorization is applied according to the user's role and permissions.

---

# Real-Time Communication

Ponditi uses Socket.IO for real-time communication.

The real-time layer is responsible for features such as:

* Chat rooms
* User-to-user messaging
* Message delivery
* Notifications
* Tuition-related communication
* Real-time state changes

The socket implementation is located under:

```text
server/socket/
```

---

# File and Image Management

User profile images and other uploaded files are handled through the backend.

The project uses:

* Multer for multipart file handling
* Sharp for image processing and optimization
* AWS S3 for object storage

Profile images should be compressed and optimized before being stored.

---

# API Documentation

The backend uses Swagger for API documentation.

Swagger configuration is located in:

```text
server/swagger.js
```

The generated API specification is maintained in:

```text
server/swagger-output.json
```

After modifying API documentation annotations, regenerate the Swagger specification:

```bash
npm run swagger-autogen
```

---

# Validation

Request validation is handled using `express-validator`.

Validation should be applied at API boundaries to ensure that:

* Required fields are present
* Input types are correct
* User-provided data follows expected formats
* Invalid requests are rejected consistently

---

# Testing

Testing is part of the project's development workflow.

The project should maintain tests for critical application behavior, particularly:

* Authentication
* User registration
* User verification
* Tuition requests
* Scheduling
* Tuition lifecycle
* Payments
* Notifications
* Chat
* Authorization
* Database operations

Tests should be added alongside new functionality rather than being postponed until the end of development.

---

# Code Quality

The project uses ESLint and Prettier to maintain consistent code quality and formatting.

Run the frontend linter:

```bash
cd client
npm run lint
```

Backend linting can be run using the project's ESLint configuration.

General development principles:

* Keep functions focused and small
* Validate external input
* Avoid duplicated business logic
* Keep controllers thin
* Keep database operations inside appropriate data-access/model layers
* Use meaningful names
* Handle errors consistently
* Avoid committing secrets
* Prefer migrations over manual production schema changes
* Add tests for critical business logic

---

# Docker

The repository includes Docker configuration for containerized deployment.

Available files:

```text
Dockerfile
Dockerfile.dev
docker-compose.yml
docker-compose.dev.yml
```

Docker Compose can be used to run the required services together.

Start the production-style stack:

```bash
docker compose up --build
```

For development:

```bash
docker compose -f docker-compose.dev.yml up --build
```

> The exact Docker configuration may depend on the selected database and deployment environment.

---

# Nginx

Nginx is included as a reverse proxy layer.

```text
nginx/
```

A typical production architecture is:

```text
                    Internet
                       │
                       ▼
                    Nginx
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
        Next.js               Express
        Frontend               Backend
                                  │
                        ┌─────────┴─────────┐
                        ▼                   ▼
                    Database              AWS S3
```

---

# Deployment

The project contains deployment-related scripts and configuration for server environments.

Relevant files include:

```text
deploy.sh
server/auto-deploy.sh
docker-compose.yml
nginx/
.github/
```

Production deployments should ensure that:

* Development/admin seed routes are disabled
* Production environment variables are configured securely
* Database migrations are executed safely
* Debug/development settings are disabled
* Nginx is configured as required
* HTTPS is enabled
* Sensitive files are excluded from version control
* Logs and application errors are monitored

---

# Security Considerations

Before deploying to production:

* Use strong JWT secrets
* Never expose database credentials
* Never commit `.env` files
* Never commit AWS credentials
* Use HTTPS
* Configure secure cookies
* Configure appropriate CORS policies
* Validate all external input
* Apply authorization checks to protected endpoints
* Rate-limit sensitive endpoints
* Restrict administrative functionality
* Keep dependencies updated
* Remove development-only routes and seed endpoints
* Store uploaded files securely

---

# Project Development History

The project has evolved through several development phases, including:

* User registration and verification
* Teacher and learner profiles
* Educational qualification management
* Teacher search
* Tuition requests
* Tuition scheduling
* Tuition location management
* Real-time chat
* Notifications
* Reviews and feedback
* Profile image management
* Google Maps / location integration
* AWS image storage
* Database migrations
* Dockerization
* Production deployment
* API documentation
* Validation
* Testing

Historical implementation notes and database experiments are intentionally kept out of the main README to keep the documentation focused and maintainable.

---

# Roadmap

Planned improvements include:

* [ ] Expand automated test coverage
* [ ] Improve frontend responsiveness
* [ ] Improve search and filtering
* [ ] Improve notification delivery
* [ ] Add browser/mobile push notifications
* [ ] Improve tuition payment workflow
* [ ] Improve real-time chat reliability
* [ ] Add stronger rate limiting
* [ ] Improve monitoring and logging
* [ ] Improve image optimization
* [ ] Improve database migration workflow
* [ ] Improve Docker development environment
* [ ] Improve CI/CD pipeline
* [ ] Add comprehensive API integration tests
* [ ] Evaluate service boundaries for future microservice extraction

---

# References

### Next.js

* [Next.js Documentation](https://nextjs.org/docs)

### TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Socket.IO

* [Socket.IO Documentation](https://socket.io/docs/v4/)

### Redux Toolkit

* [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

### Sequelize

* [Sequelize Documentation](https://sequelize.org/docs/v6/)

### ESLint

* [ESLint Documentation](https://eslint.org/docs/latest/)

### Next.js Image Optimization

* [Next.js Image Documentation](https://nextjs.org/docs/app/getting-started/images)

### Google Maps

* [Google Maps Platform Documentation](https://developers.google.com/maps)

### Docker

* [Docker Documentation](https://docs.docker.com/)

---

# Related Project

Ponditi is an online tuition platform focused on making teacher discovery, tuition management, communication, and scheduling easier for learners and teachers.

**Project:** Ponditi LMS
**Architecture:** Full-stack web application
**Frontend:** Next.js + React + TypeScript
**Backend:** Node.js + Express + Sequelize
**Real-time:** Socket.IO
**Storage:** AWS S3
**Deployment:** Docker / Nginx / Cloud infrastructure

---

## License

This project is currently maintained as a private/proprietary project.

Copyright © Ponditi. All rights reserved.
