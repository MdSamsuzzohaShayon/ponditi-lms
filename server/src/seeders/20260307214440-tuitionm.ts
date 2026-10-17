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
    // Idempotency guard: skip if already seeded
    const [rows] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS count FROM Tuitionm;'
    );
    if (rows[0].count > 0) {
      console.log('Tuitionm already seeded — skipping.');
      return;
    }


    const now = new Date().toISOString();          // single timestamp

    await queryInterface.bulkInsert('Tuitionm', [

      { name: 'Online', createdAt: now, updatedAt: now },
      { name: 'Offline', createdAt: now, updatedAt: now },
      { name: 'Home Tutoring', createdAt: now, updatedAt: now },
      { name: 'Group Tutoring', createdAt: now, updatedAt: now },
      { name: 'One-to-One Tutoring', createdAt: now, updatedAt: now },
      { name: 'Recorded Lessons', createdAt: now, updatedAt: now },
      { name: 'Weekend Classes', createdAt: now, updatedAt: now },
      { name: 'Crash Course', createdAt: now, updatedAt: now },
      { name: 'Exam Preparation', createdAt: now, updatedAt: now },
      { name: 'Skill Development', createdAt: now, updatedAt: now }

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
