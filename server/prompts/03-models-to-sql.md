Here are all of my database models

class type:

```
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ClassType extends Model {
    static associate(models) {
      ClassType.belongsToMany(models.Tuitionm, {
        through: 'TuitionmToClasstype',
      });
      ClassType.belongsToMany(models.Subject, {
        through: 'SubjectToClasstype',
      });
      ClassType.belongsToMany(models.Customer, { through: 'CustomerToClasstype' });
      ClassType.hasMany(models.ScheduledClass);
    }
  }

  ClassType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'ClassType',
    },
  );

  return ClassType;
};


```


Customer:

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


Education:

```
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Education.belongsTo(models.Customer); // This will create a CustomerId column in Education table
    }
  }
  Education.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      level: {
        // Exam title
        type: DataTypes.STRING,
        allowNull: false,
      },
      major: {
        type: DataTypes.STRING,
      },
      institution: {
        type: DataTypes.STRING,
      },
      passing_year: {
        type: DataTypes.INTEGER,
      },
      running_study: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'Education',
      freezeTableName: true,
    }
  );
  return Education;
};


```


Message.ts file:

```
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   has many Scheduled Class
      // has many users
      Message.belongsTo(models.Customer, {
        foreignKey: 'messagesenderId',
        as: 'Messagesender',
      });
      Message.belongsTo(models.Customer, {
        foreignKey: 'messagereceverId',
        as: 'Messagerecever',
      });
      Message.belongsTo(models.Room);
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      // need to check review completed or not
      publish: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // Make a serial number to serielize message
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'Message',
    }
  );
  return Message;
};


```


Notification:

```
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.Customer);
      // Notification.belongsTo(models.ScheduledClass); // will have one review
    }
  }
  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: new DataTypes.STRING(),
        allowNull: false, // new request /
      },
      comment: {
        type: DataTypes.STRING,
      },
      // need to check review completed or not
      viewed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Notification',
    }
  );
  return Notification;
};


```


Notroom:

```
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   has many Scheduled Class
      // has many users
      Notroom.belongsTo(models.Customer, {
        foreignKey: 'notroominvitorId',
        as: 'Notroominvitor',
      });
      Notroom.belongsTo(models.Customer, {
        foreignKey: 'invitereceiverId',
        as: 'Invitereceiver',
      });
    }
  }
  Notroom.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      // Initialized / running /closed
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'RUNNING',
      },
      // Make a serial number to serielize message
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'Notroom',
    },
  );
  return Notroom;
};


```


Review:

```
// If everything is okay move this to scheduled class

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      //   has many Scheduled Class
      // has many users
      Review.belongsTo(models.Customer, {
        foreignKey: 'reviewerId',
        as: 'Reviewer',
      });
      Review.belongsTo(models.Customer, {
        foreignKey: 'reviewtakerId',
        as: 'Reviewtaker',
      });
      Review.belongsTo(models.ScheduledClass); // will have one review
    }
  }

  Review.init(
    {
      /**
       * @info personal
       * */
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: new DataTypes.TEXT(),
        allowNull: false,
      },
      // need to check review completed or not
      publish: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Review',
    },
  );

  return Review;
};


```


Room:

```
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   has many Scheduled Class
      // has many users
      Room.belongsTo(models.Customer, {
        foreignKey: 'invitorId',
        as: 'Roominvitor',
      });
      Room.belongsTo(models.Customer, {
        foreignKey: 'invitereceverId',
        as: 'Inviterecever',
      });
      Room.hasMany(models.Message);
    }
  }
  Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      // Initialized / running /closed
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'RUNNING',
      },
      // Make a serial number to serielize message
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'Room',
    },
  );
  return Room;
};


```

Scheduled class:

```
// If everything is okay move this to scheduled class

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // student(one) - one to many
  // teacher(one) - one to many
  // sender - student/teacher - one to many
  // recever - student/teacher - one to many

  // ClassType (one) - one to many
  // Subject (one) - one to many
  // class time
  // types - online / offline / more
  // Status - accepted/pending
  class ScheduledClass extends Model {
    static associate(models) {
      // ScheduledClass.belongsTo(models.ClassType);
      ScheduledClass.belongsTo(models.Customer, {
        foreignKey: 'senderId',
        as: 'Sender',
      }); // one sender
      ScheduledClass.belongsTo(models.Customer, {
        foreignKey: 'receverId',
        as: 'Recever',
      }); // one reciver

      ScheduledClass.belongsTo(models.ClassType); // one class type
      ScheduledClass.belongsTo(models.Subject); // one subject

      ScheduledClass.hasMany(models.Review); // will have two review, one for teacher and one for student
    }
  }

  ScheduledClass.init(
    {
      /**
       * @info personal
       * */
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      desc: {
        type: new DataTypes.TEXT(),
      },
      types: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        /**
         * @process step by step
         * 1. PENDING - initialize class
         * 2. RUNNIN / REJECT - when teacher accept or reject the request
         * 3. WAITING - IF time is up and teacher await for completation and reviews
         * 4. COMPLETED - Student mark as completed and send a review
        */
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      // scheduled slot
      start: {
        type: new DataTypes.DATE(),
      },
      // class started at
      startedat: {
        type: new DataTypes.DATE(),
      },
      meetlink: {
        type: new DataTypes.STRING(255),
      },
      terminatedat: {
        // class started at
        type: new DataTypes.DATE(),
      },
      tuitionlocation: {
        // class started at
        type: new DataTypes.STRING(255),
      },
      // not necessary
      perHourRate: {
        type: DataTypes.INTEGER,
      },
      // hours
      // hours: {
      //   type: new DataTypes.INTEGER(10),
      // },
      // bill
      // total hours
      // reviews
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'ScheduledClass',
    }
  );

  return ScheduledClass;
};


```


Subject:

```
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      // Subject.belongsTo(models.ClassType);
      Subject.belongsToMany(models.ClassType, {
        through: 'SubjectToClasstype',
      });
      // Subject.belongsTo(models.Customer);
      // Subject.hasOne(models.Customer);
      Subject.belongsToMany(models.Customer, { through: 'CustomerToSubject' });
      Subject.hasMany(models.ScheduledClass);
    }
  }

  Subject.init(
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
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Subject',
    },
  );

  return Subject;
};


```


Tuitionm:

```
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Tuitionm => Tuition m => tuition medium 
  class Tuitionm extends Model {
    static associate(models) {
      Tuitionm.belongsToMany(models.ClassType, {
        through: 'TuitionmToClasstype',
      });
      Tuitionm.belongsToMany(models.Customer, { through: 'CustomerToTuitionm' });
      // Tuitionm.belongsToMany(models.Customer, { through: 'UniqueCustomerTuitionm' });
    }
  }

  Tuitionm.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Tuitionm',
    }
  );

  return Tuitionm;
};


```


Now, you need to do:
1. Create a sql file to create all those tables with all colmuns properly
2. Do not change any data types or anything
3. Try not to make any errors
4. Make relationship properly
5. Create table only if table does not exist
6. If I run that sql query, it must create all tables with all columns with proper data type
7. It must be compatiable with postgresql and sqlite both