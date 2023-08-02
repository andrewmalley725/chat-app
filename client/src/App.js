import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App({ socket }) {
  const api = 'http://localhost:8000/api';
  const [rooms, setRooms] = useState([]);
  const [roomid, setRoomid] = useState(0);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', data => {
      setMessages([...messages, data]);
    });
  }, [roomid, messages, socket]);

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
    socket.emit('message', data);
    // setMessages([...messages, data]);
  };

  const joinRoom = (e) => {
    //socket.emit('join-room', e.target.value);
    setRoomid(e.target.value);
  };

  console.log(messages);

  return (
    <div>
      Room: 
      <select onChange={joinRoom}>
        <option>Selesct a room to join</option>
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
              <p key={index}>{`${i.username} says: ${i.content}`}</p>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
