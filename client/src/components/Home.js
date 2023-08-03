import { React, useEffect, useState } from 'react';
import axios from 'axios';

function Home({socket}) {
    const api = 'api';
    const [rooms, setRooms] = useState([]);
    const [roomid, setRoomid] = useState(0);
    const [roomName, setName] = useState('');
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', data => {
        if (data.roomName === roomName) {
            setMessages([...messages, data]);
        }
        });
    }, [roomid, messages, socket, roomName]);

    useEffect(() => {
        if (roomName)
        socket.emit('join-room', roomName)
    }, [socket, roomName]);

    useEffect(() => {
        axios.get(`${api}/messages/${roomid}`).then(data => {
        setMessages(data.data.messages);
        });
    }, [roomid]);

    useEffect(() => {
        axios.get(`${api}/rooms`).then(data => {
        setRooms(data.data);
        })
    }, []);

    const handleChange = (e) => {
        setMsg(e.target.value);
    };


    const handleSubmit = () => {
        const data = {
            content: msg,
            roomid: parseInt(roomid),
            userid: localStorage.getItem('userId')
        }
        socket.emit('message', data, roomName);
    };

    const joinRoom = (e) => {
        if (roomName)
        socket.emit('leave-room', roomName);
        const selectedRoomId = parseInt(e.target.value);
        const selectedRoom = rooms.find((room) => room.roomid === selectedRoomId);
    
        if (selectedRoom) {
        setRoomid(selectedRoom.roomid);
        setName(selectedRoom.room_name);
        }
    };

    return (
        <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <div className="messages">
              { messages 
                ? messages.map((message, index) => (
                        <div key={index} className="message">
                            <p className="message-content">{`${message.user.username} says: ${message.content}`}</p>
                        </div>
                    )) 
                : null}
            </div>
            <div className="room-select">
              <label htmlFor="roomSelect">Room:</label>
              <select
                id="roomSelect"
                className="form-select"
                onChange={joinRoom}
              >
                <option value="">Select a room to join</option>
                {rooms
                  ? rooms.map((room) => (
                      <option key={room.roomid} value={room.roomid}>
                        {room.room_name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div>
              <input
                className="form-control message-input"
                type="text"
                onKeyUp={handleChange}
                placeholder="Message"
              />
            </div>
            <div>
              <button
                className="btn btn-primary mt-2"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;