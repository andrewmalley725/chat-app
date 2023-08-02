const { db_password } = require('../../config/env');

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : db_password,
      database : 'chat_app'
    }
});

module.exports = knex;