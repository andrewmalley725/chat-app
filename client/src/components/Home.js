import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Home({socket, api}) {
    const [rooms, setRooms] = useState([]);
    const [roomid, setRoomid] = useState(0);
    const [roomName, setName] = useState('');
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);

    const ref = useRef(null);

    useEffect(() => {
      if (messages.length) {
        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, [messages.length]);

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
    }, [roomid]);

    const handleChange = (e) => {
        setMsg(e.target.value);
    };


    const handleSubmit = (e) => {
      e.preventDefault();
        const data = {
            content: msg,
            roomid: parseInt(roomid),
            userid: localStorage.getItem('userId')
        }
        socket.emit('message', data, roomName);
        setMsg('');
    };

    const joinRoom = (room) => {
        if (roomName)
          socket.emit('leave-room', roomName);

        const selectedRoomId = parseInt(room);
        const selectedRoom = rooms.find((room) => room.roomid === selectedRoomId);
    
        if (selectedRoom) {
          setRoomid(selectedRoom.roomid);
          setName(selectedRoom.room_name);
        }
    };

    const addRoom = (e) => {
      e.preventDefault();

      const newRoom = prompt('Enter new room name: ');

      const body = {
        name: newRoom
      };

      axios.post(`${api}/addRoom`, body).then((response) => {
        if (roomName)
          socket.emit('leave-room', roomName);

        setRoomid(response.data.record.roomid);
        setName(response.data.record.room_name);
      });

    };
    console.log(roomName)
    return (
      <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="rooms-sidebar">
            {rooms && (
              <ul className="list-group">
                {rooms.map((room) => (
                  <li
                    key={room.roomid}
                    className="list-group-item room-item"
                    onClick={() => joinRoom(room.roomid)}
                  >
                    {room.room_name}
                  </li>
                ))}
                <li>
                  <a href='#' onClick={addRoom} className='new-room'>Add new room</a>
                </li>
              </ul>
            )}
          </div>
          <div className="chat-box">
            <div className="messages">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <div key={index} className="message">
                    <p className="message-content">{`${message.user.username} says: ${message.content}`}</p>
                  </div>
                ))
              ) : roomName === '' ? 
              (
                <p>Select a room</p>
              ) : messages.length === 0 ?
              (
                <p>No Messages to display</p>
              ) : 
              (
                <p>Loading messages...</p>
              )}
              
              <div ref={ref}></div>
              
            </div>

            <div className='input'>
            <div className="message-input-container">
                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control message-input"
                    type="text"
                    onChange={handleChange}
                    value={msg}
                    placeholder="Message"
                  />
                  <button
                    className="btn btn-primary mt-2"
                    type="submit"
                    disabled={roomName === '' ? true : false}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            

            
            
            
          </div>
        </div>
      </div>
    </div>    
    );
}

export default Home;