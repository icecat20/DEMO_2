"use strict";
const path = require("path");
require("dotenv").config();
const BASE_PATH = path.join(__dirname, "app", "db");
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
