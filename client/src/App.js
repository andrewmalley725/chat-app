import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App({ socket }) {
  const api = 'http://localhost:8000/api';
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
      userid: 1 //replace
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
    <div>
      Room: 
      <select onChange={joinRoom}>
        <option>Select a room to join</option>
        {
          rooms ?
          rooms.map(i => {
            return(
              <option key={i.roomid} value={i.roomid}>{i.room_name}</option>
            )
          }) :
           null
        }
      </select>
      <br/><br/>
      Message: <input type='text' onKeyUp={handleChange}></input><br/><br/>
      <button type='submit' onClick={handleSubmit}>Submit</button>


      <div>
        {
          messages.map((i,index) => {
            return(
              <p key={index}>{`${i.user.username} says: ${i.content}`}</p>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
