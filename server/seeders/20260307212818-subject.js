'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Subject', [

      { name: 'Mathematics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Physics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chemistry', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Biology', createdAt: new Date(), updatedAt: new Date() },
      { name: 'English', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bangla', createdAt: new Date(), updatedAt: new Date() },
      { name: 'ICT', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Accounting', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Economics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'General Science', createdAt: new Date(), updatedAt: new Date() }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Subject', null, {});
  }
};
