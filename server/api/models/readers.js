const knex = require('./dbConnect');

async function getUserByUsername(username) {
    const res = await knex.select().from('person').where('username', username);
    return res[0];
}

async function getUserById(id) {
    const res = await knex.select().from('person').where('userid', id);
    return res[0];
}

async function getRoomById(id) {
    const res = await knex.select().from('room').where('roomid', id);
    return res[0];
}

function getAllRooms(res) {
    knex.select().from('room').then((response) => {
        res.json(response);
    });
}

async function getRoomByName(name) {
    const res = await knex.select().from('room').where('room_name', name);
    return res[0];
}

async function allUserRooms(id) {
    let rooms = [];
    const data = await knex.select().from('userRooms').where('userid', id);
    for (let i of data) {
        rooms.push({
            id: i.roomid,
            name: i.room_name
        });
    }
    return rooms;
}

allUserRooms(1);

module.exports = {
    getUserByUsername,
    getUserById,
    getRoomById,
    getAllRooms,
    allUserRooms,
    getRoomByName,
}