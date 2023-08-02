const knex = require('./dbConnect');

function newUser(res, data) {
    knex('person')
        .insert(data)
        .then(() => {
            res.json({
                response: 'Added!',
                record: data
            });
        });
}

function newRoom(res, data) {
    knex('room')
        .insert(data)
        .then(() => {
            res.json({
                response: 'Added!',
                record: data
            });
        });
}

module.exports = {
    newUser,
    newRoom,
}