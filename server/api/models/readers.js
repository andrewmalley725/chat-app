const knex = require('./dbConnect');

async function getUserByUsername(username) {
    const res = await knex.select('username').from('person').where('username', username).pluck('username');
    return res[0];
}

async function getPasswordByUsername(username) {
    const res = await knex.select('password').from('person').where('username', username).pluck('password');
    return res[0];
}

function getAllRooms(res) {
    knex.select().from('room').then((response) => {
        res.json(response);
    });
}

module.exports = {
    getUserByUsername,
    getPasswordByUsername,
    getAllRooms,
}