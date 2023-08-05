require('dotenv').config();

const connections = {
  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : process.env.DEV_PASSWORD,
      database : 'chat_app'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host : 'sql9.freesqldatabase.com',
      port : 3306,
      user : 'sql9637396',
      password : process.env.PROD_PASSWORD,
      database : 'sql9637396'
    }
  }
}

function getDbConnection() {
  const env = process.env.ENVIRONMENT;
  return connections[env];
}

const knex = require('knex')(getDbConnection());

module.exports = knex;