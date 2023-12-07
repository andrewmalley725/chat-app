require('dotenv').config();
require('@planetscale/database');

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
      host : process.env.PROD_URL,
      port : 3306,
      user : process.env.PROD_USER,
      password : process.env.PROD_PASSWORD,
      database : 'chat-app',
      ssl: {"rejectUnauthorized":false}
    }
  }
}

function getDbConnection() {
  const env = process.env.ENVIRONMENT;
  return connections[env];
}

const knex = require('knex')(getDbConnection());

module.exports = knex;