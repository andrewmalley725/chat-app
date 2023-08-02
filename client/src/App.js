import { React, useEffect, useState } from 'react';
import './App.css';

const id = Math.random();

function App({ socket }) {
  const [msg, setMsg] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', data => {
      if (data.room === room) {
        setMessages([...messages, data]);
      }
    });
  }, [room, messages, socket]);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const changeRoom = (e) => {
    setRoom(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      data: msg,
      id: id,
      room: room
    }
    socket.emit('message', data);
    setMessages([...messages, data]);
  };

  const joinRoom = () => {
    socket.emit('join-room', room);
  };

  console.log(room, messages)
  return (
    <div>
      Messsage: <input type='text' onChange={handleChange}></input><br/>
      <button type='submit' onClick={handleSubmit}>Submit</button><br/><br/>
      Room: <input type='text' onChange={changeRoom}></input><br/>
      <button type='submit' onClick={joinRoom}>Join</button>

      <div>
        {
          messages.map((i,index) => {
            return(
              <p key={index}>{`${i.id} says: ${i.data}`}</p>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
