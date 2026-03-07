const path = require('path');

const { DB_STORAGE } = process.env;


module.exports = {
  development: {
    dialect: 'sqlite',
    storage: DB_STORAGE || path.join(__dirname, '../database/ponditi-dev.sqlite'),
    logging: console.log, // logs all SQL queries
  },
  test: {
    dialect: 'sqlite',
    storage: DB_STORAGE || path.join(__dirname, '../database/ponditi-test.sqlite'),
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: DB_STORAGE || path.join(__dirname, '../database/ponditi-prod.sqlite'),
    logging: false,
  },
};