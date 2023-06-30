const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'postgres3.csxvhl1yvnqc.eu-west-3.rds.amazonaws.com',
    port: 5432,
    dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });
  module.exports = sequelize;