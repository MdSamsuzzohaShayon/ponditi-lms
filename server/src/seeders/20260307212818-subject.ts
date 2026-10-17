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
      'SELECT COUNT(*) AS count FROM Subject;'
    );
    if (rows[0].count > 0) {
      console.log('Subject table already seeded — skipping.');
      return;
    }


    const now = new Date().toISOString();          // single timestamp

    await queryInterface.bulkInsert('Subject', [

      { name: 'Mathematics', createdAt: now, updatedAt: now },
      { name: 'Physics', createdAt: now, updatedAt: now },
      { name: 'Chemistry', createdAt: now, updatedAt: now },
      { name: 'Biology', createdAt: now, updatedAt: now },
      { name: 'English', createdAt: now, updatedAt: now },
      { name: 'Bangla', createdAt: now, updatedAt: now },
      { name: 'ICT', createdAt: now, updatedAt: now },
      { name: 'Accounting', createdAt: now, updatedAt: now },
      { name: 'Economics', createdAt: now, updatedAt: now },
      { name: 'General Science', createdAt: now, updatedAt: now }

    ], {})
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
