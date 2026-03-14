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

    await queryInterface.bulkInsert('Tuitionm', [

      { name: 'Online', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Offline', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Home Tutoring', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Group Tutoring', createdAt: new Date(), updatedAt: new Date() },
      { name: 'One-to-One Tutoring', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Recorded Lessons', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Weekend Classes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Crash Course', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Exam Preparation', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Skill Development', createdAt: new Date(), updatedAt: new Date() }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Tuitionm', null, {});
  }
};
