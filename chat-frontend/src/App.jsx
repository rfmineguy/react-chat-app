import { useEffect, useState, useRef, createElement } from 'react'
import { Chatbar } from './Chatbar.jsx'
import { Chatline } from './Chatline.jsx'
import { RoomViewer } from './RoomViewer.jsx'
import './App.css'
import { socket } from './SocketInstance.js'

const NewRoom = ({oncreateroom}) => {
  const inputref = useRef(null);
  const buttonref = useRef(null);
  useEffect(() => {
    buttonref.current.onclick = () => oncreateroom(inputref.current.value);
  }, []);
  return (
    <>
      <div class="room-entry">
        <input ref={inputref}></input>
        <button ref={buttonref}>Create</button>
      </div>
    </>
  );
};

function App() {
  const [rooms, setRooms] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatlines, setChatlines] = useState([]);

  const submit = (content) => {
    socket.emit('addchatline', content)
  };

  const onjoinroom = (room) => {
    socket.emit('joinroom', {'room-name': room});
  };

  const oncreateroom = (room) => {
    socket.emit('createroom', {'room-name': room});
  };

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onRooms(rooms_) {
      const rooms = rooms_.rooms.map(room => {
        return JSON.parse(room);
      });
      setRooms(rooms);
    }
    function onChatLines(chatlines) {
      setChatlines(chatlines.chatlines)
    }
    function onJoinRoom(room) {
      if (room.room_name == joinedRoom) return;
      setJoinedRoom(room.room_name);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('join-room', onJoinRoom);
    socket.on('send-rooms', onRooms);
    socket.on('update-chat', onChatLines);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('join-room', onJoinRoom);
      socket.off('send-rooms', onRooms);
      socket.off('update-chat', onChatLines);
    };
  }, []);

  return (
    <>
      <div class="main">
        <div class="header">Chat App</div>
        <div class="col-container">
          <div class="row-container">
            <RoomViewer onjoinroom={onjoinroom}></RoomViewer>
            <hr/>
            <div class="expand scrollable-div">
              <div class="chatlines">
                {chatlines.map((c, i) => (
                  <Chatline key={i} index={i} content={c.content}/>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Chatbar class="chatbar" onsubmit={submit}></Chatbar>
      </div>
    </>
  )
}

export default App
