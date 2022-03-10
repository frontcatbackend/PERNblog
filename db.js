const { Sequelize } = require("sequelize"); // класс {Sequelize}

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  console.log(
    `"Data Base connected on host: ${process.env.DB_HOST}  ${process.env.DB_PORT}"`
  )
);
