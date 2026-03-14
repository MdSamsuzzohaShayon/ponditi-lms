'use strict';

// npx sequelize-cli seed:generate --name classtype

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('ClassType', [

      { name: 'Class 1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Class 2', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Class 3', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Class 4', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Class 5', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Class 6', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Class 7', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Class 8', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Class 9', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Class 10', createdAt: new Date(), updatedAt: new Date() }

    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('ClassType', null, {});
  }
};
