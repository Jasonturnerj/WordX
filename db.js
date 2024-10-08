"use strict";
const { Pool } = require("pg");
const { databaseUri } = require("./config");

const db = new Pool({
  connectionString: databaseUri,
});

module.exports = { db };