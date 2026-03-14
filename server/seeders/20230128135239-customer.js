'use strict';


const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const { roles } = require('../config/keys');


const { ADMIN, STUDENT, SUPER, TEACHER } = roles;

async function createCustomer(role, passwordHash) {
  return {
    name: faker.person.fullName(),
    password: passwordHash,
    phone: faker.phone.number("01#########"),
    image: faker.image.avatar(),
    cc: "+880",
    email: faker.internet.email(),
    district: faker.location.city(),
    presentaddress: faker.location.streetAddress(),
    role: role,

    age: faker.number.int({ min: 18, max: 45 }),
    gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),

    id_proof: faker.string.uuid(),

    profession: faker.person.jobTitle(),
    institution: faker.company.name(),
    experience: faker.number.int({ min: 0, max: 10 }).toString(),

    otp: faker.number.int({ min: 1000, max: 9999 }).toString(),

    isActive: true,
    isVerified: true,

    tutionplace: faker.helpers.arrayElement(["ONLINE", "OFFLINE"]),
    tuitionmedium: faker.helpers.arrayElement(["BANGLA", "ENGLISH"]),

    isAvailable: faker.datatype.boolean(),

    tl_rate: faker.number.int({ min: 500, max: 2000 }),
    sl_rate: faker.number.int({ min: 500, max: 2000 }),
    ol_rate: faker.number.int({ min: 500, max: 2000 }),

    totalHours: faker.number.int({ min: 0, max: 200 }),

    ref: faker.number.int({ min: 1, max: 10 }),

    createdAt: new Date(),
    updatedAt: new Date(),
  };
}


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
    const passwordHash = await bcrypt.hash("Test1234", 10);

    const customers = await Promise.all([
      createCustomer(SUPER, passwordHash),
      createCustomer(ADMIN, passwordHash),
      createCustomer(ADMIN, passwordHash),
      createCustomer(TEACHER, passwordHash),
      createCustomer(TEACHER, passwordHash),
      createCustomer(TEACHER, passwordHash),
      createCustomer(STUDENT, passwordHash),
      createCustomer(STUDENT, passwordHash),
      createCustomer(STUDENT, passwordHash),
      createCustomer(STUDENT, passwordHash),
    ]);

    await queryInterface.bulkInsert('Customer', customers);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Customer', null, {});
  }
};


// npx sequelize-cli db:seed:allnpx sequelize-cli db:seed:all
// npx sequelize-cli db:seed:undo
