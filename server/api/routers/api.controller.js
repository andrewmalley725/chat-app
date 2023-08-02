const { getUserByUsername, getPasswordByUsername, getAllRooms } = require('../models/readers');
const { hashPass } = require('../functions/hash');
const { newUser, newRoom } = require('../models/create');

function addUser(req, res) {
    const data = {
        username: req.body.userName,
        firstname: req.body.first,
        lastname: req.body.last,
        password: hashPass(req.body.pass),
        email: req.body.email
    };

    newUser(res, data);
}

function addRoom(req, res) {
    const data = {
        room_name: req.body.name
    };
    
    newRoom(res, data);
}

async function userAuth(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const query = await getUserByUsername(username);
    if (query) {
        const user = {
            username: query,
            password: await getPasswordByUsername(username),
        };

        if (hashPass(password) === user.password) {
            res.send('success')
        } else {
            res.send('invalid password')
        }

    } else {
        res.send('invalid username')
    }
}

function getRooms(req, res) {
    getAllRooms(res);
}

module.exports = {
    addUser,
    addRoom,
    userAuth,
    getRooms,
}