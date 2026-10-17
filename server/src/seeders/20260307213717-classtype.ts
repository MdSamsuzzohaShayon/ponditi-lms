'use strict';


// npx sequelize-cli seed:generate --name classtype

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

    const [rows] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS count FROM ClassType;'
    );
    if (rows[0].count > 0) {
      console.log('ClassType already seeded — skipping.');
      return;
    }
    const now = new Date().toISOString();          // single timestamp



    await queryInterface.bulkInsert('ClassType', [

      { name: 'Class 1', createdAt: now, updatedAt: now, },
      { name: 'Class 2', createdAt: now, updatedAt: now, },
      { name: 'Class 3', createdAt: now, updatedAt: now, },
      { name: 'Class 4', createdAt: now, updatedAt: now, },
      { name: 'Class 5', createdAt: now, updatedAt: now, },
      { name: 'Class 6', createdAt: now, updatedAt: now, },
      { name: 'Class 7', createdAt: now, updatedAt: now, },
      { name: 'Class 8', createdAt: now, updatedAt: now, },
      { name: 'Class 9', createdAt: now, updatedAt: now, },
      { name: 'Class 10', createdAt: now, updatedAt: now, }

    ], {})

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('ClassType', null, {});
  }
};
