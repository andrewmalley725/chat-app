const { getUserByUsername, getAllRooms, getUserById, getRoomById, allUserRooms, getMessagesByRoomId, getAllUsers } = require('../models/readers');
const { hashPass } = require('../functions/hash');
const { newUser, newRoom, newUserRoom, newMessage } = require('../models/create');

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

async function addUserRoom(req, res) {
    const data = {
        userid: req.body.userid,
        roomid: req.body.roomid
    };
    newUserRoom(res, data);
}

async function userAuth(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const user = await getUserByUsername(username);

    if (user) {
        if (hashPass(password) === user.password) {
            res.json({
                status: 'success',
                record: user
            });
        } else {
            res.json({status: 'invalid password'});
        }

    } else {
        res.json({status: 'invalid username'});
    }
}

function getRooms(req, res) {
    getAllRooms(res);
}

async function getUserRooms(req, res) {
    const uid = req.params.uid;
    const user = await getUserById(uid);
    const rooms = await allUserRooms(uid);
    res.json({
        user: user,
        rooms: rooms
    });
}

async function getMessages(req, res) {
    const roomid = req.params.roomid;
    const data = await getMessagesByRoomId(roomid);
    res.json({
        room: await getRoomById(roomid),
        messages: data
    });
}

function getUsers(req, res) {
    getAllUsers(res);
}

module.exports = {
    addUser,
    addRoom,
    userAuth,
    getRooms,
    getUserRooms,
    addUserRoom,
    getMessages,
    getUsers,
}