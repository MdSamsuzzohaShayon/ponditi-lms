Error:

```
"Cannot read properties of undefined (reading 'findOne')"

```

Login controller:

```

/**
 * @login admin
 */
const loginAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: JSON.stringify(errors.array()) });
  }

  // const { email, password } = req.body;

  try {
    let userExist = null;
    if (req.body.email) {
      userExist = await Customer.findOne({ where: { email: req.body.email } });
    } else if (req.body.phone) {
      userExist = await Customer.findOne({ where: { phone: req.body.phone } });
    } else {
      return res.status(406).json({ msg: 'Email and phone both can not be empty' });
    }

    if (!userExist) return res.status(404).json({ msg: "User doesn't exist" });

    if (userExist.dataValues.role !== ADMIN) {
      return res.status(406).json({ msg: 'You are not teacher or admin' });
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, userExist.dataValues.password);
    if (!isPasswordCorrect) {
      return res.status(406).json({ msg: 'Invalid credentials' });
    }

    const userDetailResponse = {
      email: userExist.dataValues.email,
      id: userExist.dataValues.id,
      role: userExist.dataValues.role,
    };
    const token = jwt.sign(userDetailResponse, process.env.JWT_SECRET, {
      expiresIn: '90d',
    });

    res.cookie('token', token, cookieOptions);
    // @ts-ignore
    userDetailResponse.name = userExist.dataValues.name;
    return res.status(200).json({ msg: 'Logged in successfully', user: userDetailResponse });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Something went wrong', err });
  }
};

```


models/index.ts file:

```
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config');

const db = {};

// Choose config based on NODE_ENV
let dbConfig = config.development;
if (process.env.NODE_ENV === 'production') dbConfig = config.production;
else if (process.env.NODE_ENV === 'test') dbConfig = config.test;

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
  logging: dbConfig.logging,
});

// Test DB connection
const testDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};
testDatabase();

// Import models
fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js') && !file.endsWith('.test.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Run associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

// @ts-ignore
db.sequelize = sequelize;
// @ts-ignore
db.Sequelize = Sequelize;

module.exports = db;

```


models/Customer.ts file:

```
const { Model } = require('sequelize');
const {
 types, scheduledClassStatus, tuitionmedums, gender 
} = require('../config/keys');

const { ONLINE } = types;
const { PENDING } = scheduledClassStatus;
const { BANGLA } = tuitionmedums;

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      /**
       * ===========================================================================================
       * MANY-TO-MANY RELATIONSHIP
       * This will create an extra table it self and hold user id and another table id that user is going to make relation with
       */
      Customer.belongsToMany(models.ClassType, { through: 'CustomerToClasstype' });
      Customer.belongsToMany(models.Subject, { through: 'CustomerToSubject' });
      Customer.belongsToMany(models.Tuitionm, { through: 'UniqueCustomerTuitionm' });

      /**
       * ===========================================================================================
       * ONE-TO-MANY RELATIONSHIP - MULTIPLE TIMES
       * CustomerId as senderId (since we are making multiple relation between same two table) will be added as foreign key in ScheduledClass as Sender
       */
      Customer.hasMany(models.ScheduledClass, {
        foreignKey: 'senderId',
        as: 'Sender',
      });
      // CustomerId as receverId (since we are making multiple relation between same two table) will be added as foreign key in ScheduledClass as Recever
      Customer.hasMany(models.ScheduledClass, {
        foreignKey: 'receverId',
        as: 'Recever',
      });
      // CustomerId as reviewerId (since we are making multiple relation between same two table) will be added as foreign key in Review as Reviewer
      Customer.hasMany(models.Review, {
        foreignKey: 'reviewerId',
        as: 'Reviewer',
      });
      // CustomerId as reviewtakerId (since we are making multiple relation between same two table) will be added as foreign key in Review as Reviewtaker
      Customer.hasMany(models.Review, {
        foreignKey: 'reviewtakerId',
        as: 'Reviewtaker',
      });
      // Customer id as notroominvitorId will be added as foreign key in Notroom as Notroominvitor
      Customer.hasMany(models.Notroom, {
        foreignKey: 'notroominvitorId',
        as: 'Notroominvitor',
      });
      // Customer id as invitereceiverId will be added as foreign key in Notroom as Invitereceiver
      Customer.hasMany(models.Notroom, {
        foreignKey: 'invitereceiverId',
        as: 'Invitereceiver',
      });

      // // CustomerId as invitorId (since we are making multiple relation between same two table) will be added as foreign key in Chat as Chatinvitor
      // Customer.hasMany(models.Chat, {
      //   foreignKey: 'invitorId',
      //   as: 'Chatinvitor',
      // });
      // // CustomerId as invitereceverId (since we are making multiple relation between same two table) will be added as foreign key in Chat as Inviterecever
      // Customer.hasMany(models.Chat, {
      //   foreignKey: 'invitereceverId',
      //   as: 'Inviterecever',
      // });
      // // CustomerId as messagesenderId (since we are making multiple relation between same two table) will be added as foreign key in Message as Messagesender
      // Customer.hasMany(models.Message, {
      //   foreignKey: 'messagesenderId',
      //   as: 'Messagesender',
      // });
      // // CustomerId as messagereceverId (since we are making multiple relation between same two table) will be added as foreign key in Message as Messagerecever
      // Customer.hasMany(models.Message, {
      //   foreignKey: 'messagereceverId',
      //   as: 'Messagerecever',
      // });

      /**
       * ===========================================================================================
       * ONE-TO-MANY RELATIONSHIP - SINGLE TIMES
       * CustomerId will be added as foreign key in Notification
       */
      Customer.hasMany(models.Notification);
      // CustomerId will be added as foreign key in Education
      Customer.hasMany(models.Education);
    }
  }

  Customer.init(
    {
      /**
       * @info personal
       * */
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(100),
      },
      password: {
        type: new DataTypes.STRING(255),
      },
      phone: {
        type: new DataTypes.STRING(100),
        // unique: true,
      },
      image: {
        type: new DataTypes.STRING(255),
      },
      // cc = country code
      cc: {
        type: new DataTypes.STRING(100),
      },
      email: {
        type: new DataTypes.STRING(255),
        // unique: true,
      },
      district: {
        type: new DataTypes.STRING(255),
      },
      presentaddress: {
        type: new DataTypes.STRING(255),
      },
      role: {
        type: new DataTypes.STRING(100),
      },

      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: new DataTypes.STRING(15),
        allowNull: false,
        defaultValue: gender.MALE,
      },
      id_proof: {
        type: new DataTypes.STRING(100),
      },

      /**
       * @profession for teachers or students
       */
      profession: {
        type: new DataTypes.STRING(100),
      },
      institution: {
        type: new DataTypes.STRING(225),
      },
      experience: {
        type: new DataTypes.STRING(100),
      },
      /**
       * @auth data fields
       */
      otp: {
        type: new DataTypes.STRING(100),
      },
      isActive: {
        // by admin
        type: new DataTypes.STRING(50),
        defaultValue: PENDING,
        allowNull: false,
      },
      isVerified: {
        // once they verify
        type: new DataTypes.BOOLEAN(),
        defaultValue: false,
        allowNull: false,
      },

      /**
       * @additional
       * Added later on
       */
      tutionplace: {
        type: new DataTypes.STRING(70),
        defaultValue: ONLINE,
      },
      tuitionmedium: {
        type: new DataTypes.STRING(70),
        defaultValue: BANGLA,
      },
      // isAvailable: true / false
      isAvailable: {
        type: new DataTypes.BOOLEAN(),
        defaultValue: true,
      },
      // Different rates for differet tuition styles
      tl_rate: {
        type: DataTypes.INTEGER,
      },
      sl_rate: {
        type: DataTypes.INTEGER,
      },
      ol_rate: {
        type: DataTypes.INTEGER,
      },
      totalHours: {
        type: DataTypes.INTEGER,
      },
      ref: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Customer',
    }
  );

  return Customer;
};


```

models files:

```
shayon@shayon-B560M-H-V2:~/Documents/web/ponditi-lms/server$
$ ls -la src/models/
total 60
drwxrwxr-x  2 shayon shayon 4096 Oct 17 16:28 .
drwxrwxr-x 13 shayon shayon 4096 Oct 17 16:55 ..
-rw-rw-r--  1 shayon shayon  860 Sep 15 12:13 ClassType.ts
-rw-rw-r--  1 shayon shayon 6745 Sep 15 12:13 Customer.ts
-rw-rw-r--  1 shayon shayon 1122 Sep 15 12:13 Education.ts
-rw-rw-r--  1 shayon shayon 1271 Sep 15 12:13 Message.ts
-rw-rw-r--  1 shayon shayon 1100 Sep 15 12:13 Notification.ts
-rw-rw-r--  1 shayon shayon 1233 Sep 15 12:13 Notroom.ts
-rw-rw-r--  1 shayon shayon 1198 Sep 15 12:13 Review.ts
-rw-rw-r--  1 shayon shayon 1239 Sep 15 12:13 Room.ts
-rw-rw-r--  1 shayon shayon 2632 Sep 15 12:13 ScheduledClass.ts
-rw-rw-r--  1 shayon shayon  926 Sep 15 12:13 Subject.ts
-rw-rw-r--  1 shayon shayon  843 Sep 15 12:13 Tuitionm.ts
-rw-rw-r--  1 shayon shayon 1357 Oct 17 16:42 index.ts

```


Server.ts file:

```
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });    // ✅

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


Follow this latest official docs https://sequelize.org/docs/v6/other-topics/typescript/



Help me fix this issue