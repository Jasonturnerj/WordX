"use strict";

/** Shared config for application; can be required many places. */
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = parseInt(process.env.PORT) || 3000;

// Use dev database, testing database, or via env var, production database
const databaseUri = process.env.DATABASE_URL || 'postgresql://test:pass@localhost/jasonwordx';


// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  databaseUri,
};
