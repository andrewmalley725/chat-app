const { db_password } = require('../../config/env');

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'sql9.freesqldatabase.com',
      port : 3306,
      user : 'sql9637396',
      password : db_password,
      database : 'sql9637396'
    }
});

module.exports = knex;