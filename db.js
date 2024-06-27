"use strict";
/** Database setup for jobly. */
const { Pool } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Pool({
    connectionString: getDatabaseUri(),
  });
} else {
  db = new Pool({
    connectionString: getDatabaseUri()
  });
}

db.connect();

module.exports = db;