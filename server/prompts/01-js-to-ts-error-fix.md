I had a backend project with node.js javascript, and sequalize. 
I have converted it to typescript. 

Here is my new package.json file:

```
{
  "name": "ponditi-backend-api",
  "version": "1.0.0",
  "description": "node express crud api with sequelize",
  "main": "server.js",
  "scripts": {
    "build": "tsc",
    "dev": "env NODE_ENV=development tsx watch src/server.ts",
    "start": "env NODE_ENV=production node dist/server.js",
    "swagger-autogen": "node swagger.js",
    "migrate": "npx sequelize-cli db:migrate",
    "migrate:undo": "npx sequelize-cli db:migrate:undo",
    "seed": "npx sequelize-cli db:seed:all --config ./config/config.js",
    "update": "npx npm-check-updates -u"
  },
  "keywords": [
    "node",
    "express",
    "mysql"
  ],
  "author": "shayon",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^26.6.5",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-config-node": "^4.1.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-import": "^2.32.0",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^5.5.6",
    "nodemon": "^3.1.14",
    "prettier": "^3.9.6",
    "sequelize-cli": "^6.6.5",
    "typescript": "^7.0.2"
  },
  "dependencies": {
    "@faker-js/faker": "^10.6.0",
    "aws-sdk": "^2.1693.0",
    "bcryptjs": "^3.0.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "express-validator": "^7.3.2",
    "jsonwebtoken": "^9.0.3",
    "mssql": "^12.7.2",
    "multer": "^2.4.0",
    "multer-s3": "^3.0.1",
    "mysql2": "^3.24.4",
    "node-fetch": "^3.3.2",
    "nodemailer": "^10.0.10",
    "otp-generator": "^4.0.1",
    "sequelize": "^6.37.8",
    "sharp": "^0.35.4",
    "socket.io": "^4.8.3",
    "sqlite3": "^6.0.1",
    "swagger-autogen": "^2.23.7",
    "swagger-jsdoc": "^6.3.0",
    "swagger-ui-express": "^5.0.1",
    "tedious": "^20.0.0",
    "unirest": "^0.6.0"
  }
}


```


Here is my ts config file:

```
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",
    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node
    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,
    // Recommended Options
    "allowJs": true,
    "checkJs": false,
    "strict": false, // Start with false, enable later
    "jsx": "react-jsx",
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "esModuleInterop": true,
    "skipLibCheck": true,
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

```


Here is my server.ts file:

```
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

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


Error:

```
shayon@shayon-B560M-H-V2:~/Documents/web/ponditi-lms/server$
$ npm run build

> ponditi-backend-api@1.0.0 build
> tsc

error TS18003: No inputs were found in config file '/home/shayon/Documents/web/ponditi-lms/server/tsconfig.json'. Specified 'include' paths were '["src/**/*"]' and 'exclude' paths were '["node_modules","dist"]'.

Found 1 error.

```