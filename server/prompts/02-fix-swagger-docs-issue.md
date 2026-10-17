Error:

```
shayon@shayon-B560M-H-V2:~/Documents/web/ponditi-lms/server$
$ npm run start

> ponditi-backend-api@1.0.0 start
> env NODE_ENV=production node dist/server.js

◇ injected env (23) from .env // tip: ⌁ auth for agents [www.vestauth.com]
node:internal/modules/cjs/loader:1459
  throw err;
  ^

Error: Cannot find module './swagger-output.json'
Require stack:
- /home/shayon/Documents/web/ponditi-lms/server/dist/server.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1456:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1066:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1071:22)
    at Module._load (node:internal/modules/cjs/loader:1242:25)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.require (node:internal/modules/cjs/loader:1556:12)
    at require (node:internal/modules/helpers:152:16)
    at Object.<anonymous> (/home/shayon/Documents/web/ponditi-lms/server/dist/server.js:13:20)
    at Module._compile (node:internal/modules/cjs/loader:1812:14)
    at Object..js (node:internal/modules/cjs/loader:1943:10) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ '/home/shayon/Documents/web/ponditi-lms/server/dist/server.js' ]
}

Node.js v24.14.1


```


Project structure:

```
shayon@shayon-B560M-H-V2:~/Documents/web/ponditi-lms/server$
$ ls -la
total 704
drwxrwxr-x   6 shayon shayon   4096 Oct 17 16:44 .
drwxrwxr-x   9 shayon shayon   4096 Sep 22 20:48 ..
-rw-rw-r--   1 shayon shayon    101 Sep 15 12:13 .dockerignore
-rw-rw-r--   1 shayon shayon    919 Sep 22 21:13 .env
-rw-rw-r--   1 shayon shayon    600 Sep 22 21:12 .env.example
-rw-rw-r--   1 shayon shayon    568 Sep 15 12:13 .env.mssql.local
-rw-rw-r--   1 shayon shayon    342 Sep 15 12:13 .eslintrc.js
-rw-rw-r--   1 shayon shayon     46 Sep 15 12:13 .gitignore
-rw-rw-r--   1 shayon shayon     75 Sep 15 12:13 .prettierrc
-rw-rw-r--   1 shayon shayon    121 Sep 15 12:13 .sequelizerc
-rw-rw-r--   1 shayon shayon    101 Sep 15 12:13 Dockerfile
-rw-rw-r--   1 shayon shayon     99 Sep 15 12:13 Dockerfile.dev
-rw-rw-r--   1 shayon shayon  26538 Sep 15 12:13 Ponditi-nodejs-lms.postman_collection.json
-rw-rw-r--   1 shayon shayon   3275 Sep 15 13:09 README.md
-rw-rw-r--   1 shayon shayon   3983 Sep 15 12:13 auto-deploy.sh
-rw-r--r--   1 shayon shayon 126976 Sep 29 15:56 database.sqlite
drwxrwxr-x  12 shayon shayon   4096 Oct 17 16:38 dist
drwxrwxr-x 563 shayon shayon  20480 Oct 17 16:17 node_modules
-rw-rw-r--   1 shayon shayon 457040 Oct 17 16:17 package-lock.json
-rw-rw-r--   1 shayon shayon   1793 Oct 17 16:32 package.json
drwxrwxr-x   2 shayon shayon   4096 Oct 17 16:44 prompts
drwxrwxr-x  14 shayon shayon   4096 Oct 17 16:44 src
-rw-rw-r--   1 shayon shayon   1287 Oct 17 16:21 tsconfig.json
shayon@shayon-B560M-H-V2:~/Documents/web/ponditi-lms/server$
$ ls -la src/
total 96
drwxrwxr-x 14 shayon shayon  4096 Oct 17 16:44 .
drwxrwxr-x  6 shayon shayon  4096 Oct 17 16:44 ..
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:31 bootstrap
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:30 config
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:30 controllers
drwxrwxr-x  2 shayon shayon  4096 Sep 29 15:56 database
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:28 middleware
drwxrwxr-x  2 shayon shayon  4096 Sep 15 12:13 migrations
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:28 models
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:27 routes
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:24 seeders
-rw-rw-r--  1 shayon shayon  3414 Sep 29 15:57 server.ts
drwxrwxr-x  3 shayon shayon  4096 Oct 17 16:23 socket
-rw-rw-r--  1 shayon shayon 28696 Sep 15 12:13 swagger-output.json
-rw-rw-r--  1 shayon shayon   519 Oct 17 16:35 swagger.ts
drwxrwxr-x  3 shayon shayon  4096 Sep 15 12:13 uploads
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:23 utils


```