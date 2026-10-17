const bcrypt = require('bcryptjs');
const db = require('../models');
const keys = require('../config/keys');

const { ADMIN } = keys.roles;
const { APPROVED } = keys.scheduledClassStatus;

const { Customer } = db;

/**
 * Ensure the configured admin exists at server startup.
 *
 * Reads credentials from environment variables (ADMIN_INIT_*) and, once the
 * database connection is ready:
 *  - creates the admin if no ADMIN user with the configured email exists
 *  - updates the existing admin when it does
 *
 * Idempotent across restarts (identity is the configured email + role).
 * Never logs the password or any other secret.
 */
const createAdmin = async () => {
  const email = process.env.ADMIN_INIT_EMAIL;
  const password = process.env.ADMIN_INIT_PASSWORD;

  // No-op when the bootstrap is not configured
  if (!email || !password) {
    console.log('Admin bootstrap skipped: ADMIN_INIT_EMAIL / ADMIN_INIT_PASSWORD not set');
    return;
  }

  // Make sure the database is ready before touching it
  await db.sequelize.authenticate();

  const data = {
    email,
    name: process.env.ADMIN_INIT_NAME || 'Admin',
    phone: process.env.ADMIN_INIT_PHONE || null,
    password: await bcrypt.hash(password, 10), // same hashing convention as addAdmin
    role: ADMIN,
    isActive: APPROVED, // same convention as addAdmin
    isVerified: true, // same convention as addAdmin
  };

  const admin = await Customer.findOne({ where: { email, role: ADMIN } });

  if (admin) {
    // Keep the identity field stable and only refresh the mutable fields
    delete data.email;
    await admin.update(data);
    console.log(`Admin bootstrap: updated existing admin (${email})`);
    return;
  }

  await Customer.create(data);
  console.log(`Admin bootstrap: created admin (${email})`);
};

module.exports = createAdmin;