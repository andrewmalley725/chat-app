const knex = require('./dbConnect');
const { getUserByUsername, getRoomByName } = require('../models/readers');


function newUser(res, data) {
    knex('person')
        .insert(data)
        .then(async () => {
            res.json({
                response: 'Added!',
                record: await getUserByUsername(data.username)
            });
        });
}

function newRoom(res, data) {
    knex('room')
        .insert(data)
        .then(async () => {
            res.json({
                response: 'Added!',
                record: await getRoomByName(data.room_name)
            });
        });
}

function newUserRoom(res, data) {
    knex('user_rooms')
        .insert(data)
        .then(async () => {
            res.json({
                response: 'Added!',
            });
        });
}

async function newMessage(data) {
    let date = new Date();
    date = date.toISOString().slice(0, 19).replace('T', ' ');
    data['datesent'] = date;
    return await knex('message').insert(data); 
}

module.exports = {
    newUser,
    newRoom,
    newUserRoom,
    newMessage,
}