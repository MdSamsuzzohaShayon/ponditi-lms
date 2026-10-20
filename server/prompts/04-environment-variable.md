Not getting environment variable properly my server.ts file inside src and .env file inside root


and here is my server.ts file:

```
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

// dotenv.config({ path: './.env' });
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
// const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const outputFile = require('./swagger-output.json');
const userRoutes = require('./routes/userRouter');
const searchRoutes = require('./routes/searchRouter');
const adminRoutes = require('./routes/adminRouter');
const classtypeRoutes = require('./routes/classtypeRouter');
const subjectRoutes = require('./routes/subjectRouter');
const scheduledclassRoutes = require('./routes/scheduledclassRouter');
const reviewRoutes = require('./routes/reviewRouter');
const tuitionmRoutes = require('./routes/tuitionmRouter');
const messageRoutes = require('./routes/messageRouter');
// eslint-disable-next-line no-unused-vars
const db = require('./models');
const createAdmin = require('./bootstrap/createAdmin');
const socketRoutes = require('./socket/socketRoutes');

const app = express();
/**
 * @server create socket server for continuous connections
 * ===================================================================
 */
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [process.env.FRONTEND_URL],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});



app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

app.use((req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', `${req.method} - ${req.url}`);
  next();
});




/**
 * @api endpoints for restAPI
 * ===================================================================
*/
app.get('/api', (req, res) => {
  res.send('Hello World');
  // res.status(200).json({ msg: 'Server is working', env: process.env });
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(outputFile));
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/tuitionm', tuitionmRoutes);
app.use('/api/classtype', classtypeRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/scheduledclass', scheduledclassRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/message', messageRoutes);

/**
 * @api for socket io
 * ===================================================================
 */
io.on('connection', socketRoutes);

const PORT = process.env.PORT || 9000;

// Ensure the configured admin exists before the server starts accepting traffic
createAdmin()
  .catch((err) => {
    console.error('Admin bootstrap failed:', err && err.message ? err.message : err);
  })
  .finally(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  });

/*
if (process.env.FORCE_DB_SYNC === 'true') {
  console.log('⚠️ Running force DB sync...');
  db.sequelize.sync({ alter: true, force: true }).then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on ${PORT} with FORCE_DB_SYNC`);
    });
  });
} else {
  httpServer.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}
*/

```

My project structure:

```
shayon@shayon-B560M-H-V2:~/Documents/web/ponditi-lms/server$
$ ls -la
total 708
drwxrwxr-x   7 shayon shayon   4096 Oct 17 16:55 .
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
drwxrwxr-x   2 shayon shayon   4096 Oct 17 16:55 database
-rw-r--r--   1 shayon shayon 126976 Oct 17 16:47 database.sqlite
drwxrwxr-x  13 shayon shayon   4096 Oct 17 17:01 dist
drwxrwxr-x 563 shayon shayon  20480 Oct 17 16:17 node_modules
-rw-rw-r--   1 shayon shayon 457040 Oct 17 16:17 package-lock.json
-rw-rw-r--   1 shayon shayon   1871 Oct 17 16:47 package.json
drwxrwxr-x   2 shayon shayon   4096 Oct 17 17:07 prompts
drwxrwxr-x  13 shayon shayon   4096 Oct 17 16:55 src
-rw-rw-r--   1 shayon shayon   1287 Oct 17 16:21 tsconfig.json
shayon@shayon-B560M-H-V2:~/Documents/web/ponditi-lms/server$
$ ls -la src/
total 92
drwxrwxr-x 13 shayon shayon  4096 Oct 17 16:55 .
drwxrwxr-x  7 shayon shayon  4096 Oct 17 16:55 ..
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:31 bootstrap
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:30 config
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:30 controllers
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:28 middleware
drwxrwxr-x  2 shayon shayon  4096 Sep 15 12:13 migrations
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:28 models
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:27 routes
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:24 seeders
-rw-rw-r--  1 shayon shayon  3417 Oct 17 17:07 server.ts
drwxrwxr-x  3 shayon shayon  4096 Oct 17 16:23 socket
-rw-rw-r--  1 shayon shayon 28696 Sep 15 12:13 swagger-output.json
-rw-rw-r--  1 shayon shayon   519 Oct 17 16:35 swagger.ts
drwxrwxr-x  3 shayon shayon  4096 Sep 15 12:13 uploads
drwxrwxr-x  2 shayon shayon  4096 Oct 17 16:23 utils


```