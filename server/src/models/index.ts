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
// fs.readdirSync(__dirname)
//   .filter(file => file !== basename && file.endsWith('.js') && !file.endsWith('.test.js'))
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

fs.readdirSync(__dirname)
  .filter(file =>
    file !== basename &&
    (file.endsWith('.js') || file.endsWith('.ts')) &&
    !file.endsWith('.d.ts') &&
    !file.endsWith('.test.js') &&
    !file.endsWith('.test.ts')
  )
  .forEach(file => {
    // Strip extension so require() works in BOTH dev (.ts via tsx) and prod (.js compiled)
    const baseName = file.replace(/\.(js|ts)$/, '');
    const model = require(path.join(__dirname, baseName))(sequelize, Sequelize.DataTypes);
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