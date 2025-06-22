"use strict";
const { Pool } = require("pg");
const { databaseUri } = require("./config");

const db = new Pool({
  connectionString: databaseUri,
  ssl: {
    rejectUnauthorized: false, // required for self-signed SSL like Render's
  },
});

module.exports = { db };
